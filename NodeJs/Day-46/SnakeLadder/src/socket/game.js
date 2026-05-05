const { Server } = require("socket.io");
const { randomBytes } = require('crypto');

const { playerAuth } = require("../middlewares/auth");
const { connectRedis } = require("../database/redis");


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

    io.of("/game/join").on("connection", (socket) => {
        reddisClient.sAdd("currentPlayers", socket.data.player.playerName);

        socket.on("disconnect", () => {
            reddisClient.sRem("currentPlayers", socket.data.player.playerName);
        })


        // on joingame get the gametype as for 2player 3player 4player as 2,3,4
        socket.on('joinGame', async (gametype) => {
            const rooms = await reddisClient.sMembers('rooms');
            // Object.is(Object.getPrototypeOf(rooms), null)
            if (rooms.length === 0) {
                await joinRoom(socket, gametype.gametype);
            } else {
                let refSetPlayerData = [['p1', 'red'], ['p2', 'blue'], ['p3', 'green'], ['p4', 'yellow']]
                let playerHaveJoined = false;

                // let matchedTypedRooms = new Map();
                for (const room of rooms) {
                    let roomData = await reddisClient.json.get(room, "$");
                    console.log("Going in for final condition", roomData, gametype.gametype);
                    if (roomData.type == gametype.gametype) {
                        if (roomData.available == true) {
                            for (let i = 0; i < refSetPlayerData.length; i++) {
                                if (roomData[refSetPlayerData[i][0]].socketId === undefined) {
                                    roomData[refSetPlayerData[i][0]] = {
                                        dice: -1,
                                        socketId: socket.id,
                                        playerName: socket.data.player.playerName,
                                        color: refSetPlayerData[i][1],
                                        position: 0,
                                        offlineChance: 3
                                    }
                                    if (i == gametype.gametype) {
                                        roomData.available = false;
                                        timeout = Date.now() + 1800000;
                                    }

                                    await reddisClient.json.set(room, "$", roomData);

                                    socket.join(room);

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

                                    if (roomData.available == false) {
                                        io.to(room).emit("startGame", sendingData);
                                    }


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

                console.log("This is else condition", rooms);
            }
        })

        const joinRoom = async (socket, gametype) => {
            const roomId = await randomBytes(5).toString('hex');
            await reddisClient.json.set("Room:" + roomId, "$", {
                type: parseInt(gametype) ?? 4,
                p1: {
                    dice: -1,
                    socketId: socket.id,
                    playerName: socket.data.player.playerName,
                    color: "red",
                    position: 0,
                    offlineChance: 3
                },
                p2: {

                },
                p3: {

                },
                p4: {

                },
                available: true, //check for any other joining player to as if available to join
                wait: true, //wait if game hasn't started or another player's round is due
                turn: socket.id,
                winArr: [],
                timeout: Date.now(),
            });

            await reddisClient.sAdd("rooms", "Room:" + roomId);

            socket.join("Room:" + roomId);

            settingTimeout(60000, "Room:" + roomId);
        }
        const settingTimeout = (timeout, roomId) => {
            setTimeout(async () => {
                const result = await reddisClient.json.get(roomId);
                if (result.available == true && (Date.now() - result.timeout >= 60000)) {
                    const sockets = await io.in(roomId).fetchSockets();
                    for (const socket of sockets) {
                        socket.leave(roomId);
                    }

                    await reddisClient.json.del(roomId);

                    io.to(roomId).emit('joiningError', "Players not found, please retry.");
                } else {
                    settingTimeout(60000 - result.timeout, roomId);
                }
            }, timeout);
        }
    });

}

module.exports = { initiateGame };