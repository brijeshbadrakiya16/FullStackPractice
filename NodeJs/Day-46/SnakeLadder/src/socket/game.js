const { Server } = require("socket.io");
const crypto = require('crypto');

const { playerAuth } = require("../middlewares/auth");
const { connectRedis } = require("../database/redis");

const twoPlayerWinMoney = [150, 0];
const threePlayerWinMoney = [150, 50, 0];
const fourPlayerWinMoney = [150, 100, 50, 0];

const snakes = new Map([[14, 4], [28, 10], [43, 1], [47, 18], [51, 31], [63, 39], [68, 33], [77, 26], [83, 58], [90, 70], [93, 66], [95, 53], [99, 80]]);
const ladders = new Map([[2, 21], [8, 30], [16, 37], [27, 69], [41, 62], [45, 55], [65, 97], [73, 94]]);


const initiateGame = async (server) => {
    const io = new Server(server);
    let reddisClient;
    try {
        reddisClient = await connectRedis();
    } catch (err) {
        console.log(err);
    }

    io.of("/game/join").use(async (socket, next) => {
        try {
            await playerAuth(socket.handshake.headers.cookie, socket);
            next();
        } catch (err) {
            next(err);
        }
    })

    // win conditions->
    //      closest to the 100 will considered first and then others are onwards
    //      if game is in matchmaking condition then available will be true or the winArr = [] so no player will win or loose so money not deducted from any of the players
    //      from whenever the game will start and if any one single person will play his move and other will leave then the same conditions of closer one's follow as it is, as exited player  will lose thier coins
    //      if suppose two players are playing the game and one is at 10 and other is at 50 then if the any one player will exist from the room then by default the remained player will win no matter where it is in terms of closness from the 100
    //      if the the game has started so available will be false and if no one have made any move then it will be as no coins deducted from any player 

    io.of("/game/join").on("connection", async (socket) => {
        await reddisClient.sAdd("currentPlayers", socket.data.player.playerName);

        const clientData = await reddisClient.hGetAll(socket.data.player.playerName);
        if (clientData?.room !== undefined) {
            await reddisClient.json.set(clientData.room, `$.${clientData.playerNumber}.socketId`, socket.id);
            socket.join(clientData.room);

            // emit some to notify the game play on client side
        }


        socket.on("disconnect", () => {
            reddisClient.sRem("currentPlayers", socket.data.player.playerName);

            // for win
            // (const clientData = await reddisClient.hGetAll(socket.id);
            // let roomData = await reddisClient.json.get(clientData.room, { path: "$" });

            // if (roomData.available) {
            //     if (roomData.winArr.length !== 0){

            //     }else{
            //         // nothing game hasn't started so not deducting coins from player's money
            //     }
            // })

        })


        // on joingame get the gametype for 2player 3player 4player as 2,3,4
        socket.on('joinGame', async (gametype) => {
            const isAlreadyInRoom = await reddisClient.hGetAll(socket.data.player.playerName);

            if ([2, 3, 4].includes(parseInt(gametype?.gametype)) && isAlreadyInRoom?.room === undefined) {

                const rooms = await reddisClient.sMembers('rooms');
                // Object.is(Object.getPrototypeOf(rooms), null)
                if (rooms.length === 0) {
                    await joinRoom(socket, gametype.gametype);
                } else {
                    let refSetPlayerData = [['p1', 'red'], ['p2', 'blue'], ['p3', 'green'], ['p4', 'yellow']];
                    let playerHaveJoined = false;

                    // let matchedTypedRooms = new Map();
                    for (const room of rooms) {
                        let roomData = await reddisClient.json.get(room, { path: "$" });
                        roomData = roomData[0];
                        // console.log("Going in for final condition", roomData, gametype.gametype);
                        if (roomData.type == gametype.gametype) {
                            // console.log("Temporary");
                            if (roomData.available == true) {
                                for (let i = 0; i < refSetPlayerData.length; i++) {
                                    if (roomData[refSetPlayerData[i][0]].socketId == undefined) {
                                        roomData[refSetPlayerData[i][0]] = {
                                            dice: -1,
                                            socketId: socket.id,
                                            playerName: socket.data.player.playerName,
                                            color: refSetPlayerData[i][1],
                                            position: 0,
                                            offlineChance: 3,
                                            rollsOfSix: 0
                                        }
                                        if (roomData.p1.socketId == socket.id) {
                                            roomData.turn = socket.data.player.playerName
                                        }

                                        // console.log("I :", i + 1, "gametype.gametype :", gametype.gametype, "Condition :", (i + 1) == gametype.gametype);
                                        if ((i + 1) == gametype.gametype) {
                                            roomData.available = false;
                                            roomData.timeout = Date.now() + 1800000;
                                            roomData.wait = false;
                                        }
                                        // console.log(roomData.available);

                                        await reddisClient.json.set(room, "$", roomData);

                                        await socket.join(room);

                                        let sendingData = {
                                            timeout: roomData.timeout,
                                            turn: roomData.p1.playerName,
                                        }

                                        for (let j = 0; j < refSetPlayerData.length; j++) {
                                            if (roomData[refSetPlayerData[i][0]]?.socketId !== undefined) {
                                                sendingData['p' + (j + 1)] = roomData['p' + (j + 1)];
                                            }
                                        }
                                        //have to do hit some events on client side to notify all the users of that room to start the game
                                        // console.log(roomData);

                                        // console.log(io.of('/game/join').adapter.rooms);
                                        if (!roomData.available) {
                                            // console.log(room);
                                            io.of('/game/join').to(room).emit("startGame", sendingData);
                                        }


                                        socket.data.player.coins -= 100;

                                        await reddisClient.hSet(socket.data.player.playerName, { _id: String(socket.data.player._id), room: room, playerNumber: ('p' + (i + 1)) });

                                        playerHaveJoined = true;
                                        break;
                                    }
                                }
                            }

                            // matchedTypedRooms.set(room, roomData);
                        }
                    }

                    if (!playerHaveJoined) {
                        await joinRoom(socket, gametype.gametype);
                    }

                    // console.log("This is else condition", rooms);
                }
            } else {
                io.of('/game/join').to(socket.id).emit('joiningError', "You are already joined in room, or Invalid Game type.");
            }
        });

        const joinRoom = async (socket, gametype) => {

            // console.log("Going in this");
            const roomId = await crypto.randomBytes(5).toString('hex');
            await reddisClient.json.set(("Room:" + roomId), "$", {
                type: parseInt(gametype) ?? 4,
                p1: {
                    dice: -1,
                    socketId: socket.id,
                    playerName: socket.data.player.playerName,
                    color: "red",
                    position: 0,
                    offlineChance: 3,
                    rollsOfSix: 0
                },
                p2: {

                },
                p3: {

                },
                p4: {

                },
                steps: 0, // this will help to check if some player is stuck on his play if the --player.postion and turn to next player
                available: true, //check for any other joining player to as if available to join
                wait: true, //wait if game hasn't started or another player's round is due
                turn: socket.data.player.playerName,
                winArr: [],
                timeout: Date.now(),
            });

            await reddisClient.sAdd("rooms", "Room:" + roomId);
            socket.data.player.coins -= 100;

            socket.join("Room:" + roomId);
            await reddisClient.hSet(socket.data.player.playerName, { _id: String(socket.data.player._id), room: "Room:" + roomId, playerNumber: 'p1' });
            // console.log("reached this.");

            joiningTimeout(60000, "Room:" + roomId);
        }

        const joiningTimeout = (timeout, roomId) => {
            setTimeout(async () => {
                let result = await reddisClient.json.get(roomId, { path: "$" });
                result = result[0];
                if (result.available == true && (Date.now() - result.timeout >= 60000)) {
                    const sockets = await io.in(roomId).fetchSockets();
                    for (const socket of sockets) {
                        socket.leave(roomId);
                    }

                    await reddisClient.json.del(roomId);

                    io.of('/game/join').to(roomId).emit('joiningError', "Players not found, please retry.");
                } else {
                    joiningTimeout(60000 - result.timeout, roomId);
                }
            }, timeout);
        }



        socket.on('playGame', async () => {

            // if player rolls out 6 then he get second chance to roll the dice if the move is valid(100-key postion>=6) and if not (like key is on 98) then he won't get.
            // add another field on reddis json as rollsOfSix = 0, increase it if the 6 is rolled check if it is 3 then do not move key and if another number rolled out then change to rollsOfSix=0
            // hit win when position == 100 or setTimeout to play in 30 seconds for next player 
            // have to add a field called remaining player as if any players 3 timeout chance finished then it will be removed from it
            // so we can check the gameplay to be finished if remainingPlayers array .length is 0 then finish.

            const playerRoomData = await reddisClient.hGetAll(socket.data.player.playerName);
            console.log(playerRoomData);
            if (playerRoomData.room !== undefined) {
                let roomData = await reddisClient.json.get(playerRoomData.room, { path: "$" });
                roomData = roomData[0];
                // console.log("Playing roomData:", roomData);
                if (roomData.available == false && roomData.wait == false && roomData.turn == socket.data.player.playerName && roomData[playerRoomData.playerNumber].socketId == socket.id) {
                    // console.log("going in condition")
                    await reddisClient.json.set(playerRoomData.room, "$.wait", true);

                    const multiplyer = await crypto.randomInt(1, 6);
                    const d2 = await crypto.randomInt(1, 36);
                    const d3 = await crypto.randomInt(1, 36);

                    const finalDiceValue = Math.floor(((d2 * d3 * (multiplyer / 100)) % 6) + 1)

                    console.log("DiceValue: ", finalDiceValue);
                    socket.emit('diceValue', { diceValue: finalDiceValue });

                    // setting dice value
                    roomData[playerRoomData.playerNumber].dice = finalDiceValue;

                    // checking for dice value and setting position and then turn for next player
                    // rollsOfSix
                    let changePosition = true;
                    if (finalDiceValue == 6) {
                        roomData[playerRoomData.playerNumber].rollsOfSix += 1
                        if (roomData[playerRoomData.playerNumber].rollsOfSix == 3) {
                            changePosition = false;
                            roomData[playerRoomData.playerNumber].rollsOfSix = 0;
                        }
                    } else {
                        roomData[playerRoomData.playerNumber].rollsOfSix = 0;
                    }
                    // turn
                    if (!(finalDiceValue == 6 && changePosition)) {
                        let i = parseInt(playerRoomData.playerNumber.trim().split('')[1])
                        i = (i % roomData.type) + 1;
                        roomData.turn = roomData['p' + i].playerName
                    }
                    // position
                    if (changePosition) {
                        let pos = roomData[playerRoomData.playerNumber].position;
                        if (100 - pos >= finalDiceValue) {
                            pos += finalDiceValue;
                            if (snakes.has(pos)) {
                                pos = snakes.get(pos);
                            }
                            if (ladders.has(pos)) {
                                pos = ladders.get(pos);
                            }

                            roomData[playerRoomData.playerNumber].position = pos;
                        }
                    }

                    if (roomData[playerRoomData.playerNumber].position == 100) {

                        // ending the game logic


                        // winning game logic call

                    }

                    roomData.steps++;

                    if (roomData.winArr.length == 0) {
                        for (let i = 1; i <= roomData.type; i++) {
                            roomData.winArr.push(
                                { playerName: roomData['p' + i].playerName, position: roomData['p' + i].position }
                            )
                        }
                    } else {
                        roomData.winArr = roomData.winArr.map(player => {
                            if (player.playerName == socket.data.player.playerName) {
                                player.position = roomData[playerRoomData.playerNumber].position;
                                return player;
                            } else {
                                return player;
                            }
                        }).sort((playerA, playerB) => playerB.position - playerA.position);
                    }

                    // setting roomData to redis room
                    console.log("reaching to set");
                    await reddisClient.json.del(playerRoomData.room);
                    await reddisClient.json.set(playerRoomData.room, "$", roomData);
                    console.log("data set done.");
                    // getting data to send to all sockets of this room
                    let forSendingData = await reddisClient.json.get(playerRoomData.room, { path: "$" });
                    forSendingData = forSendingData[0];
                    let sendingData = {
                        timeout: forSendingData.timeout,
                        turn: forSendingData.turn,
                    }
                    for (let j = 1; j <= forSendingData.type; j++) {
                        sendingData[('p' + j)] = forSendingData[('p' + j)];
                    }

                    // sending data to this room
                    io.of('/game/join').to(playerRoomData.room).emit('gamePlay', sendingData);

                    // making timeout for the next move by
                    turnTimeout(playerRoomData, forSendingData);

                } else {
                    socket.emit('joiningError', "Wait!! This is NOT YOUR turn.");
                }
            } else {
                socket.emit('joiningError', "You haven't joined any room so you can't play.");
            }

        });

        const turnTimeout = async (playerRoomData, previousTurnData) => {
            setTimeout(async () => {
                let roomLatestData = await reddisClient.json.get(playerRoomData.room, { path: "$" });
                roomLatestData = roomLatestData[0];
                if (roomLatestData.steps == previousTurnData.steps && roomLatestData.turn == previousTurnData.turn) {
                    let i = parseInt(playerRoomData.playerNumber.trim().split('')[1])
                    i = (i % roomLatestData.type) + 1;
                    roomLatestData.turn = roomLatestData['p' + i].playerName;

                    await reddisClient.json.set(playerRoomData.room, "$", roomLatestData);

                    // fire event to notify next turn for all room connections
                    let forSendingData = await reddisClient.json.get(playerRoomData.room, { path: "$" });
                    forSendingData = forSendingData[0];
                    let sendingData = {
                        timeout: forSendingData.timeout,
                        turn: forSendingData.turn,
                    }
                    for (let j = 1; j <= forSendingData.type; j++) {
                        sendingData[('p' + j)] = forSendingData[('p' + j)];
                    }

                    const recursionData1 = await reddisClient.hGetAll(roomLatestData.turn);
                    let recursionData2 = await reddisClient.json.get(recursionData1.room, { path: "$" });
                    recursionData2 = recursionData2[0];

                    turnTimeout(recursionData1, recursionData2);
                }

            }, 30000);
        }

    });

}

module.exports = { initiateGame };