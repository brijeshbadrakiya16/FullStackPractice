// Day-44

// todo : for condition on when only two left and one refresh page then what happen on disconnect, do room timeout with joining the same room feature and on exit to new random room

// flow : first decide how to store current rooms and it's users, for detecting same user i have to use some login like feature (temporary prompt the user from frontend to enter id, then on emitting any event provide that id), intialize mongodb to store message or use redis to store it, decide logics and implement all functionalities

// Date: 01/05/2026
// Task: Read all tutorials of socket.io docs and read example and emit cheatsheet also, as learned about auto reconnecting to global room and sending over all the messages which was not received during down time, also worked on my topic so i implemented and improved pervious code to connect any person to room on join and handled single person room isuue when n-1 users diconnects and i'd made server to work on any of same connected wifi by accessing from any connection. 


// ________________________________________________________


// Socket IO Docs

const expr = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const crypto = require("crypto");
const { Socket } = require("node:dgram");
const { hostname } = require("node:os");

const app = expr();
const server = createServer(app);
const io = new Server(server);

const roomAndPlayer

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on("connection", (socket) => {
    // console.log(socket);
    // console.log("user connected", socket.id);
    socket.on("disconnect", async () => {
        console.log("user Disconnected.");

        const emptyRooms = [];

        for (x of io.sockets.adapter.rooms.entries()) {
            if (!io.sockets.adapter.sids.has(x[0])) {
                if (x[1].size < 2) {
                    emptyRooms.push(x[0]);
                }

            }
        }

        if (emptyRooms.length > 1) {
            let i = 0, j = 1;
            while (j < emptyRooms.length) {
                const clients = await io.in(emptyRooms[i]).fetchSockets();
                for (client of clients) {

                    if (io.sockets.adapter.rooms.get(emptyRooms[j]).size < 2) {
                        client.leave(emptyRooms[i]);
                        client.join(emptyRooms[j]);
                        i += 2;
                        j += 2;
                    } else {
                        emptyRooms.splice(j, 1);
                        break;
                    }
                }
            }
        }
        console.log("Final room list after disconnect :", io.sockets.adapter.rooms);
    });

    // socket.on('chat message', (msg) => {
    //     console.log('message: ' + msg);
    // });

    // socket.on('chat message', (msg) => {
    //     io.emit('chat message', msg);
    // });
    console.log("Size : ", io.sockets.adapter.rooms.size);

    socket.on("send message", (obj) => {
        let messageSent = false;
        if (obj.room) {
            for (x of io.sockets.adapter.rooms.entries()) {
                if ((!io.sockets.adapter.sids.has(x[0])) && (x[1].has(socket.id))) {
                    data = {
                        from: socket.handshake.address,
                        message: obj.message,
                        id: socket.id,
                    };
                    io.to(x[0]).emit("getMessage", data);
                    messageSent = true;
                    break;
                }
            }
        }
        if (!messageSent) {
            data = {
                message: `You are not in any room so self message, \n \t ${obj.message}`,
                id: socket.id,
            };
            socket.emit("getMessage", data)
        }
    })

    socket.on("getIP", (callback) => {
        callback(socket.id);
    })

    let noRoomAvailable = true; //

    for (x of io.sockets.adapter.rooms.keys()) {
        // console.log(x);
        if (io.sockets.adapter.sids.has(x)) {
            continue;
        }
        console.log(io.sockets.adapter.rooms.get(x).size);
        if (io.sockets.adapter.rooms.get(x).size < 2) {
            socket.join(x);
            console.log(`User ${socket.id} joined room :`, x);
            noRoomAvailable = false;
            break;
        }
    }

    if (noRoomAvailable) {
        console.log("The last condition");
        const roomId = crypto.randomBytes(10).toString("hex");
        console.log(`User ${socket.id} joined room :`, roomId);
        socket.join(roomId);
        setTimeout(() => {
            io.sockets.adapter.rooms.delete(roomId);
            console.log("After closing room:", io.sockets.adapter.rooms);
        }, 10000);
    }
    // }

    console.log(io.sockets.adapter.rooms);

})

server.listen(3000, "0.0.0.0", () => {
    console.log("server running at http://192.168.20.117:3000", server.address());
    console.log();
});