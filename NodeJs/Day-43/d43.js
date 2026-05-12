// Day-43

// Date: 30/04/2026
// Task: Read and did some tutorials from the socket.io docs, also when i learned about how to connect any user socket to a room i have idea, so i build the full code which servers as room joiner with limit, like if any person visits site then server checks for any room left with less then 2 users then forward that user to that room or creates new room and add the user, and on same room users can communicate with each other with simple messages. Also did multiple Games/Design-projects entry to Yudiz portfolio as Hiten Sir asked.

// _______________________________________________________

// Socket IO

// To broadcast send data

// From Client to Server
// client => socket.emit("hello","world");
// server => io.on("connection",(arg)=>{console.log(arg)});


// _______________________________________________________

const expr = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const crypto = require("crypto");
const { Socket } = require("node:dgram");

const app = expr();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on("connection", (socket) => {
    // console.log(socket);
    // console.log("user connected", socket.id);
    socket.on("disconnect", () => {
        console.log("user Disconnected.");
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
                    io.to(x[0]).emit("getMessage", obj.message);
                    messageSent = true;
                    break;
                }
            }
        }
        if (!messageSent) {
            socket.emit("getMessage", `You are not in any room so self message, \n \t ${message}`)
        }
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
    }
    // }

    console.log(io.sockets.adapter.rooms);

})


server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
    console.log();
});