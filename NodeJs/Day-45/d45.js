// Day-45

// todo : winning condition on both server and html side , gameplay completed notification to refresh the page and wait while any player joins the game

// todo : diagonal and all condition win check, if all the array is fulled then draw and ask for restart the game, on rejoin on frontend side refresh the grid, if there is some error then solve, same id on different socketid

// Date: 02/05/2026
// Task: Completed reading docs of socket.io as learned about it's event's methods and adapter and working with middlewares, started creating multiplayer tic tac toe game on server side and with minimal frontend, as created cutom user prompting login id and providing that to serve the server and created server as to maintain the last state of the user who have joined room like on which room he has been or how much game completed, and created gameplay events with validations.

// ________________________________________________________

// to generate or give a client custom id use below

// io.engine.generateId = (req) => {
//     return "random id";
// }

// or can set intial headers also
// io.engine.on("initial_headers", (headers, req) => {
//     headers["test"] = "123";
//     headers["set-cookie"] = "mycookie=456";
// });


// to print connection error

// io.engine.on("connection_error", (err) => {
//     console.log(err.req);      // the request object
//     console.log(err.code);     // the error code, for example 1
//     console.log(err.message);  // the error message, for example "Session ID unknown"
//     console.log(err.context);  // some additional error context
// });

// List of errors and codes

// 0	"Transport unknown"
// 1	"Session ID unknown"
// 2	"Bad handshake method"
// 3	"Bad request"
// 4	"Forbidden"
// 5	"Unsupported protocol version"

const expr = require('express');
const { createServer } = require("node:http");
const crypto = require("crypto");
const { Server } = require('socket.io');
const { join } = require('path');
const { type } = require('node:os');

const app = expr();
const server = createServer(app);
const io = new Server(server);

const currentRooms = new Map();


io.use((socket, next) => {
    socket.data.id = socket.handshake.auth.id;
    next();
})

io.on("connection", (socket) => {

    const joinRoom = () => {
        let isJoined = false;
        if (currentRooms.size > 0) {
            for (let room of currentRooms.entries()) {
                if (socket.data.id === room[1].X || socket.data.id === room[1].O) {
                    socket.join(room[0]);
                    socket.emit("updateTable", room[1].grid)
                    isJoined = true;
                    break;
                }
            }
        }
        if (!isJoined) {
            let nowJoined = false;
            for (let room of io.sockets.adapter.rooms) {
                if (!io.sockets.adapter.sids.has(room[0]) && room[1].size < 2) {
                    socket.join(room[0]);
                    let data = currentRooms.get(room[0])
                    if (data.X === undefined) {
                        data.X = socket.data.id;
                    } else {
                        data.O = socket.data.id;
                    }
                    nowJoined = true;
                    break;
                }
            }
            if (!nowJoined) {
                const roomId = crypto.randomBytes(5).toString('hex');
                socket.join("Room:" + roomId);
                currentRooms.set("Room:" + roomId, { X: socket.data.id });
            }
        }
        console.log(io.sockets.adapter.rooms);
        console.log(currentRooms);
    }
    joinRoom();
    socket.on("ping", () => {
        console.log("Pong from :", socket.id);
    })


    socket.on("gameplay", (data) => {
        // data => {grid:0}
        let resolved = false;
        for (room of currentRooms.entries()) {
            if (socket.data.id === room[1].X || socket.data.id === room[1].O) {
                let turn = room[1].turn ?? room[1].X;
                // checking if grid id on which sign have been received is empty or not
                // if not then emit event to show invalid move
                if (room[1].grid !== undefined && room[1].grid[data.grid] !== undefined) {
                    console.log("rejecting from input")
                    socket.emit("someInvalid", "Invalid Move/Sign"); //to make on client side
                } else if (turn !== socket.data.id) {
                    console.log("rejecting from turn", turn, socket.data.id);
                    socket.emit("someInvalid", "Invalid Move/Sign");
                } else {
                    let newData = room[1];
                    newData.grid = newData.grid ?? [];
                    newData.grid[data.grid] = newData.X === socket.data.id ? "X" : "O";
                    if (newData.grid[data.grid] === "X") {
                        newData.turn = newData.O;
                    } else {
                        newData.turn = newData.X;
                    }
                    currentRooms.set(room[0], newData);

                    io.to(room[0]).emit("updateTable", newData.grid);

                    checkWin(room[0], socket, newData.grid, newData.grid[data.grid], data.grid);
                }
                resolved = true;
                break;
            }
        }
        console.log("From Gameplay :", currentRooms, "\n From Socket :", socket.data.id);
        if (!resolved) {
            socket.emit("someInvalid", "You haven't joined any room please refresh the page.");
        }
    })

    const checkWin = async (room, socket, grid, value, index) => {
        index = parseInt(index);

        let win = false;

        // console.log("Room :",room,"Grid :",grid,"Value :",value,"Index :",index);

        if (!win) {
            let start = index % 3; // 0 or 1 or 2
            let count = 0;

            // check for verticles

            let dummy = [];

            for (let i = start; i < 9; i += 3) {
                if (grid[i] === value) {
                    count++;
                    dummy.push(i);
                }
            }

            if (count === 3) {
                // emit event to notify all users of that room to show which person hasbeen won

                io.to(room).emit("gameEnd", `The player ${socket.data.id} has Won The Game.`, dummy)

                // do remove that romove from currentRooms map and end that room

                await endRoom(room);

                win = true;
            }
        }

        if (!win) {
            let start;

            if ([0, 1, 2].includes(index)) {
                start = 0;
            } else if ([3, 4, 5].includes(index)) {
                start = 3;
            } else {
                start = 6;
            }
            let count = 0;

            // check for horizontal 

            let dummy = [];

            let str = "";

            for (let i = start; i < (start + 3); i++) {
                if (grid[i] === value) {
                    count++;
                    dummy.push(i);
                }
            }

            // console.log("Room :", room, "Grid :", grid, "Value :", value, "Index :", index, "Count :", count, "Dummy :", dummy, "Start : ", start);

            if (count === 3) {

                console.log("Room :", room, "Grid :", grid, "Value :", value, "Index :", index);

                // emit event to notify all users of that room to show which person hasbeen won

                io.to(room).emit("gameEnd", `The player ${socket.data.id} has Won The Game.`, dummy);

                await endRoom(room);

                win = true;
            }
        }

        if (!win) {
            if ([0, 6].includes(index)) {

                // check for forward diagonal
                let count = 0;

                let dummy = [];

                if (index == 0) {
                    for (let i = index; i < 9; i += 4) {
                        if (grid[i] === value) {
                            count++;
                            dummy.push(i);
                        }
                    }

                    if (count === 3) {
                        // emit event to notify all users of that room to show which person hasbeen won

                        io.to(room).emit("gameEnd", `The player ${socket.data.id} has Won The Game.`, dummy);

                        await endRoom(room);

                        win = true;
                    }
                } else {
                    dummy = [];
                    for (let i = index; i > 1; i -= 2) {
                        if (grid[i] === value) {
                            count++;
                            dummy.push(i);
                        }
                    }

                    if (count === 3) {
                        // emit event to notify all users of that room to show which person hasbeen won

                        io.to(room).emit("gameEnd", `The player ${socket.data.id} has Won The Game.`, dummy);

                        await endRoom(room);

                        win = true;
                    }
                }

            }
            if ([2, 8].includes(index)) {

                // check for backward diagonal
                let count = 0;
                let dummy = [];

                if (index === 2) {
                    for (let i = index; i < 7; i += 2) {
                        if (grid[i] === value) {
                            count++;
                            dummy.push(i);
                        }
                    }

                    if (count === 3) {
                        // emit event to notify all users of that room to show which person hasbeen won

                        io.to(room).emit("gameEnd", `The player ${socket.data.id} has Won The Game.`, dummy);

                        await endRoom(room);

                        win = true;
                    }
                } else {
                    dummy = [];
                    for (let i = index; i > -1; i -= 4) {
                        if (grid[i] === value) {
                            count++;
                            dummy.push(i);
                        }
                    }

                    if (count === 3) {
                        // emit event to notify all users of that room to show which person hasbeen won

                        io.to(room).emit("gameEnd", `The player ${socket.data.id} has Won The Game.`, dummy);

                        await endRoom(room);

                        win = true;
                    }
                }

            }
        }

        if (!win) {
            if (index === 4) {
                let count = 0;
                let dummy = [];

                for (let i = 0; i < 9; i += 4) {
                    if (grid[i] === value) {
                        count++;
                        dummy.push(i);
                    }
                }

                if (count === 3) {
                    // emit event to notify all users of that room to show which person hasbeen won

                    io.to(room).emit("gameEnd", `The player ${socket.data.id} has Won The Game.`, dummy);

                    await endRoom(room);

                    win = true;
                }

                count = 0;
                dummy = [];

                if (!win) {
                    for (let i = 6; i > 1; i -= 2) {
                        if (grid[i] === value) {
                            count++;
                            dummy.push(i);
                        }
                    }

                    if (count === 3) {
                        // emit event to notify all users of that room to show which person hasbeen won

                        io.to(room).emit("gameEnd", `The player ${socket.data.id} has Won The Game.`, dummy);

                        await endRoom(room);

                        win = true;
                    }
                }
            }
        }

        if (!win && grid.length === 9) {
            let count = 0;

            for (let i = 0; i < 9; i++) {
                if (grid[i] == "X" || grid[i] == "O") {
                    count++;
                }
            }
            if (count === 9) {
                io.to(room).emit("gameEnd", `The Match has been Draw.`, []);

                await endRoom(room);
            }
        }
    }

    const endRoom = async (room) => {
        let roomDetails = currentRooms.get(room);
        currentRooms.delete(room);

        const sockets = await io.in(room).fetchSockets();

        for (sock of sockets) {
            sock.leave(room);
            sock.on("rejoin", () => {
                joinRoom();
            })
        }
    }

    setInterval(() => {
        for (key of currentRooms.keys()) {
            if (!io.sockets.adapter.rooms.has(key)) {
                currentRooms.delete(key);
                console.log(currentRooms);
            }
        }
    }, 2000);
});

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

server.listen("2026", "0.0.0.0", () => {
    console.log(`Server is listening on \n\t http://192.168.20.95:2026`, server.address());
})