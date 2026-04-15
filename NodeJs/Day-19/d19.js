// Day-19

// REPL (Read Eval Print Loop) is a command line tool that allows us to execute JavaScript code in an interactive way. It is a great tool for learning and experimenting with JavaScript. We can use it to test out code snippets, debug code, and even create small programs.

// module, modules.exports
// require
// os, path, fs, http

// assert

// _______________________________________________________

// console.log(__dirname); //C:\Users\brijesh\Desktop\Fullstack\Node js\Day-19
// console.log(__filename); // C:\Users\brijesh\Desktop\Fullstack\Node js\Day-19\d19.js
// // console.log(module); //prints a data-heavy object
// console.log(process); //so big obj containing multiple things including belows
// console.log(process.uptime());
// console.log(process.cpuUsage());
// console.log(process.memoryUsage());

// const os = require('os');

// console.log(os.userInfo());
// console.log(os.uptime());  // in seconds

// const path = require('path');

// const path2 = path.join(__dirname, "../../Javascript/Day-18");

// console.log(path.basename(path2));
// console.log(path.extname(path2) === ""); // empty sttring if path is not directing the file
// console.log(path2);

// console.log(path.resolve("../../Javascript/Day-18"));

// const fs = require('fs');

// fs.appendFileSync("./19.html", "</end>", "utf8");

// const data = fs.readFileSync("./19.html", "utf-8");
// console.log(data);

// HTML Module

// const http = require("http");

// http.createServer((req, res) => {
//     if (req.url === "/") {
//         res.statusCode = 200;
//         res.write("ok");
//         res.end();
//     } else if (req.url === "/about") {
//         res.write(`<h1>Welcome</h1><br> <p>to the about page</h1>`);
//         res.end();
//     } else if (req.url === "/test") {
//         res.statusCode = 400;
//         res.write("Testing error");
//         res.end();
//     } else {
//         res.end("PaGe Not found");
//     }
// }).listen(5000, () => {
//     console.log("server is listening on 5000");
//     console.log("Ctrl + Click to navigate :\n\t http://localhost:5000");
// })


// ________________________________________________
// Assert

// const assert = require('assert');
// const assertStrict = require('assert').strict;

// assert.deepEqual([[[1, 2, 3]], 4, 5],[[[1, 2, '3']], 4, 5]);

// assertStrict.deepEqual([[[1, 2, 3]], 4, 5],[[[1, 2, '3']], 4, 5]);

// assert.deepEqual(/a/gi,new Date()); //error

// assert.deepEqual('+00000000', false); //no error

// process.on('message', msg => {
//     console.log('Child got:', msg);
//     process.send({ foo: 'bar' });
// })