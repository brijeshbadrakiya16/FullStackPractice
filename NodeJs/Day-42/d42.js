// Day-42

// Date: 29/04/2026
// Task: Started reading docs of socket.io, as learned about what it is and what's difference from websockets, sockets, webtransports, and aslo read some docs from ws, uWebsocket.js libraries. As understand reconnecting and long polling theoratically, also added so many games to Yudiz portfolio as Hiten sir asked.

// ______________________________________________________

// robust-websocket

// robust-websocket is a wrapper around the standard WebSocket class that implements the same interface, but can reconnect when disconnected or the user's computer comes back online.

// ## Socket io provides convenient way to send an event or receive a response.

// Sender

// socket.emit("hello","world",(response)=>{
//     console.log(response);  // "got it"
// })

// socket.on("hello",(arg,callback)=>{
//     console.log(arg);   // "world"
//     callback("got it");
// })

// socket.timeout(5000).emit("hello","world",(err,response)=>{
//     if(err){
//         // the other side did not acknowledge the event in given delay
//     }else{
//         console.log(response);
//     }
// })

// ####  BroadCasting

// to all connected clients
// io.emit("hello");

// to all connected clients in the "news" room
// io.to("news").emit("hello");


// Multiplexing
// Namespaces allow you to split the logic of your application over a single shared connection. This can be useful for example if you want to create an "admin" channel that only authorized users can join.

// io.on("connection", (socket) => {
//   // classic users
// });

// io.of("/admin").on("connection", (socket) => {
//   // admin users
// });

//---------------------------------------------------------
// Why WebSocket is not used instead of socket io?

// The WebSocket interface is stable and has good browser and server support. However it doesn't support backpressure. As a result, when messages arrive faster than the application can process them it will either fill up the device's memory by buffering those messages, become unresponsive due to 100% CPU usage, or both.



// -------------------------------------------------------

// Connection state Recovery

// const io = new Server(httpServer, {
//     connectionStateRecovery: {
//         // the backup duration of the sessions and the packets
//         maxDisconnectionDuration: 2 * 60 * 1000,
//         // whether to skip middlewares upon successful recovery
//         skipMiddlewares: true,
//     }
// });