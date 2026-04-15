// Day-27


// _____________________________________________________

// nodejs.org

// Internationalization
// OS
// Path
// Performance Hooks
// Process
// Query strings
// Event Emitter
// Streams
//


// const os = require("os");
// const { pid } = require("process");

// console.log(os.EOL); // prints \r\n
// console.log(os.availableParallelism());//thread/cores count
// console.log(os.arch());//x64
// // console.log(os.constants); // big object
// // console.log(os.cpus()); //print array of objects containing data about each logical CPU core
// console.log(os.devNull); //prints \\.\nul in windows or /dev/null on posix
// console.log(os.endianness()); //LE for little or BE for big
// console.log(os.freemem()); //return bytes in integer format
// // console.log(os.getPriority(pid));
// console.log(os.homedir()); // C:\Users\brijesh
// console.log(os.hostname()); // LAPTOP-3P9PUCCJ
// console.log(os.loadavg()); // on windows always [ 0, 0, 0 ]
// console.log(os.machine()); // x86_64
// // console.log(os.networkInterfaces()); // object containing networkinterface
// console.log(os.platform()); //win32
// console.log(os.release()); //10.0.26200
// // console.log(os.setPriority(1))
// console.log(os.tmpdir()); //C:\Users\brijesh\AppData\Local\Temp
// console.log(os.totalmem()); //8301043712
// console.log(os.uptime()); //uptime in seconds
// console.log(os.userInfo()); //object
// console.log(os.version()); //Windows 11 Home Single Language


// const http = require("http");
// const fs = require("fs");
// const morgan = require("morgan");
// const { pipeline } = require("stream");

// morgan("dev");

// const server = http.createServer((req, res) => {

//     // for download
//     // res.writeHead(200, { "Content-Type": "text/plain", "Content-Length": fs.statSync('./temp.txt').size, "Content-Disposition": 'attachment; filename="temp.txt"' });
//     //for serving text as in html pre element so transfer time is faster and faster loading on browser side
//     res.writeHead(200, { "Content-Type": "text/html" });
//     const readableStream = fs.createReadStream('./temp.txt', { highWaterMark: 64 * 1024 });
//     res.write("<html><body><pre>")
//     let str = process.pid.toString()
//     console.time(str);



//     pipeline(readableStream, res, (error) => {
//         if (error) console.log(error)
//         else {
//             console.log("Ending time :");
//             console.timeEnd(str);
//             res.end('</pre></body></html>');
//         }
//     })
//     // readableStream.pipe(res);
//     // readableStream.on('close',()=>{
//     // })
// });

// server.listen(3001, () => {
//     console.log("Server is Listening on 3001");
// })



// const expr = require("express");

// var app = expr();

// app.use(morgan("dev"));

// app.get("/", (req, res) => {
//     // res.writeHead(200, { "Content-Type": "text/html" });
//     const readableStream = fs.createReadStream('./temp.txt', { highWaterMark: 64 * 1024 });
//     // res.write("<html><body><pre>")
//     let str = process.pid.toString()
//     console.time(str);

//     pipeline(readableStream, res, (error) => {
//         if (error) console.log(error)
//         else {
//             console.log("Ending time :");
//             console.timeEnd(str);
//             // res.send('</pre></body></html>');
//         }
//     })
// })

// app.listen(3001, () => {
//     console.log("Server is Listening on 3001");
// });


// const {unzip} = require('zlib');

// _____________________________________________________



// ______ S2 E1


// SDLC (Software Development Life Cycle)
// WaterFall Model

// Requirements
// |-> Design
//   |-> Development
//     |-> Testing
//       |-> Deployment
//         |-> Maintainance

// Monolith vs. MicroServices

// Monoliths
// -> suppose like you have one big repository
// and inside it your all applications like below will present
// Backend
// DB connect
// frontend
// Auth
// Emails
// Analysis

// Microservices

// Doing cetain things only on one level
// there can be microservice for only one thing
// like only frontend
// like only backend
// like only auth
// like only addminnistration
// like only the analytics


// Parameters below

// Dev speed -> faster in microservices and slower in monolith

// Code Repo -> a big in monolith and min in microservices but multiple in microservices

// Scalability -> Tough in monolith and compare to monolith scalling in microservices are easy to manage

// Deployment -> in monolith you to do single deployment and in microservices you have to deploy your each and every services, suppose you have change one feature and depoly on frontend then you need to deploy your whole monolith where as just one microservice in microservices

// Tech Stack -> in monolith you need to stick to one tech for you project where the tech can differ through each microservices

// Infra cost -> lower in monolith and higher microservices

// complexity -> for small project then tough in microservices where as for large project it is easy and hard in monolith

// Fault Isolation -> suppose there are one feature will down then in monolith the whole code will crash but in microservices the only one microservices will crash

// Testing -> easy in micro, hard in monolith for simple single testing and for integration monolith will be easy to write whole flow and testcases

// Ownership -> own by top of chain in monolith where as in microservices own by teams

// Maintainence -> easy in micro, hard in monolith

// Rewamps -> easy in micro, hard in monolith

// Debugging -> slight easy in monolith and hard in micro

// Dev Experience ->  