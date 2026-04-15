// Day-21

// 9 Clusters - it helps to devide a task/ server on cores of which the running cpu have
// started watching from node.js playlist of software developer diaries channel
// learned how to do multi threading with worker threads
// 10.
// 11 Console
// --> .debug() same as .log();
// 12. Crypto

// ____________________________________________________

// const { error } = require('console');
// const http = require('http');
// const { Worker } = require('worker_threads');

// http.createServer((req, res) => {
//     if (req.url === "/non-b") {
//         res.statusCode = 200;
//         res.end("This page is non-blocking");
//     } else if (req.url === "/block") {
//         const worker = new Worker("./worker.js");

//         worker.on("message", (data) => {
//             res.statusCode = 200;
//             res.end(`The count is ${data}`);
//         })
//         worker.on("error", (error) => {
//             res.statusCode = 500;
//             res.end(`An error in server : ${error}`);
//         })
//     }
// }).listen(3000);

// ___________________________________________________

// const { Worker } = require('worker_threads');
// const http = require('http');
// const { resolve } = require('path');

// http.createServer(async (req, res) => {
//     if (req.url === "/non-b") {
//         res.statusCode = 200;
//         res.end("This page is non-blocking");
//     } else if (req.url === "/block") {
//         const workers = []

//         for (let i = 0; i < 4; i++) {
//             workers.push(createWorker());
//         }
//         try {
//             const data = await Promise.all(workers);

//             const result = data.reduce((accu, curr) => {
//                 accu += curr;
//                 return accu;
//             }, 0);
//             res.statusCode = 200;
//             res.end(`The count is ${result}`);
//         } catch (err) {
//             res.statusCode = 500;
//             res.end("There is some error :", err);
//         }
//     }
// }).listen(3000)

// function createWorker() {
//     return new Promise((resolve, reject) => {
//         const worker = new Worker("./worker.js", {
//             workerData: { "thread_count": 4 }
//         });

//         worker.on("message", (data) => {
//             resolve(data);
//         })
//         worker.on("error", (error) => {
//             reject(error);
//         })
//     })
// }

// console.debug();

// _________________________________________________

// Crypto

// const crypto = require("crypto");

// const randomKey = crypto.randomBytes(16).toString('hex');
// console.log("Random key :", randomKey);

// const hash = crypto.createHmac('sha256', randomKey).update('myPassword').digest('hex');

// console.log("Hash :", hash);


// let id = crypto.randomUUID();

// console.log(id);