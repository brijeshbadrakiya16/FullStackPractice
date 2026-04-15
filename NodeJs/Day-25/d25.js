// Day-25


// ______________________________________________________


// _____ S1 E10

// there are more than four phases in eventloop of libuv, go to the nodejs docs or libuv docs for more details.
// in libuv I/O loop is the event loop

// after timer there is pending callbacks phase, one tick of an eventloop is known of one full cycle of the event loop through all the phases.

// there are some ideal/prepare phase but they are for it's internal work only, we don't cosider it important or not need to worry about it

// think like the poll phase is the responsible for the I/O operations so it is basically preparing before going into poll phase

// to find event loop code go to below link
// https://github.com/libuv/libuv/blob/v1.x/src/unix/core.c
// find function named uv_run


// Thread Pool ----
// Libuv is responsible to handle any async task,

// Suppose you are doing some fs task then, that fs task will be handed over by node to libuv, libuv checks the available thread and assings it this task, and then the thread will make request/communicate with os and complete that task and return it then it changes to available.

// so basically, thread behaves as middleware worker between os and request

// UV_THREADPOOL_SIZE = 4
// there are 4 threads by default, suppose if you have 5 simultaneous fs call then the 5th operation have to wait for the one thread to be empty(available).

// when libuv uses threadpool
// -fs
// -dns.lookup
// -crypto
// -user specified input (or some c++ code)

//Is NodeJS single threaded or multi-threaded?
//--> When you provide synchronous code then the NodeJS is single threaded, but if you provide any async code then the NodeJS is multithreaded as it handles the async operations with help of libuv's thread pool.

// you can change thread pool size by below code
// process.env.UV_THREADPOOL_SIZE = 2;

// childProcess.execSync("$env:UV_THREADPOOL_SIZE=2");
const { spawn } = require('child_process');
const crypto = require("crypto");

if (process.env._check === undefined) {
    const childs = spawn('node', [__filename], {
        env: { ...process.env, UV_THREADPOOL_SIZE: 1030, _check: 1 }
    });
    childs.stdout.on('data', (data) => {
        process.stdout.write(data.toString());
    });
    childs.stderr.on('data', (err) => {
        process.stderr.write(err.toString());
    });
} else {
    console.log("ThreadPool :", process.env.UV_THREADPOOL_SIZE);
    let count = 1;
    for (let i = 0; i < 1030; i++) {
        crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
            console.log(`crypto Done. ${count}`);
            count++;
        })
    }
}



// it won't depend on your computer's threads, you can also increase it for 100 or 1000

// crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
//     console.log(`crypto Done. ${count}`);
//     count++;
// })
// crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
//     console.log(`crypto Done. ${count}`);
//     count++;
// })
// crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
//     console.log(`crypto Done. ${count}`);
//     count++;
// })
// crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
//     console.log(`crypto Done. ${count}`);
//     count++;
// })
// crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
//     console.log(`crypto Done. ${count}`);
//     count++;
// })
// crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
//     console.log(`crypto Done. ${count}`);
//     count++;
// })
// crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
//     console.log(`crypto Done. ${count}`);
//     count++;
// })
// crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
//     console.log(`crypto Done. ${count}`);
//     count++;
// })

// console.log("End");

// DO APIs uses threadpool? -> NO

// Libuv (c-lang)  <==> epoll(linux) , kqueue(MacOS)

// both on right side is scalable I/O event Notification Mechanism

// Now suppose in your server, you variety of number of users, suppose you get more than 1000 of users requesting with an api to your server, each request connected with socket to your api endpoint, each socket have it's socket descriptor (known as fds - file descriptor).
// then you will make thousand threads to answer/write/send data to that socket connection --> NO

//here comes epoll, a single epoll can handle multiple socket connections/requests so it will handle and if anything thing happens it quickly notifies libuv with that connection and libuv take care of it.

// why Node js called eventdriven architecture?

// epoll is syscall in linux, as need something which can notify the OS/server itself whenever any changes happens or any updates or events, this the why the it is called Event Driven Architecture

// to-read.....
// epoll/kqueue
// fds - socket descriptors
// what ds is epoll use. because it's complexity is O(1);
// EVentEmitter
// Streams & Buffers
// Pipes

// epoll uses red-black tree (RB-tree) data structure
// times queue uses mean-heap tree data structure

// Instructions
// "Don't block the main Thread"
// - sync methods - Heavy Json Objects
// - complecx Regex - Complex calculations/loops
// _____
//  "Data Structure is important"
// _____
// "Naming is very important"
// _____
// "There's a lot to learn"


// _____ S1 E11


// Server

// server can be hardware or software

// Suppose we want to deploy our sys/app on AWS, basically what we are doing, aws is managing the hardware part, we are just using ec2 instance meaning somewhere in the world the aws has it's cpu/computer/hardware we are just occupying or using or hiring or taken it to deploy our code/app

// why i am not using our person/own computer/laptop as servers ?
// -limited rams (if we want to scale our systems)
// -high speed internet 24/7 needs(we don't have, aws have)
// -on our internet providers we don't have fixed ip, aws have when we create ec2 instance it has dedicated fix IP

// we are create a http server using node, meaning we are creating the application to handle our requests on server, sometimes it also called server

// can we create multiple server on the same ip?
// Yes -> now suppose when the user is requesting, then we can defined server with port so redirect user to our server

// like suppose we have namastedev.com/ -> React - 3000
// namstedev.com/api/ -> Node - 3001 we can do this later

// socket vs web sockets

// web sockets behaves as it does not closes automattically, it is for longer connections and 2 way communications, where as sockets are just meant for short connection, connect when only needed, like in most websites we are sending request -> socket is created -> get the data from the server ->  then socket is closed. here every request forms a new socket connection where web sockets stays connected over longer time basis.

// const http = require('http');

// const server = http.createServer((req,res)=>{
//     if(req.url === "/getSecretData"){
//         res.end("NO we don't share");
//     }else{
//         res.end("Hello world");
//     }
// });

// server.listen(7777);

// when create a big server which handles different of request then this way is so tougher to handle, so we use wrapper named express to create webserver

// Express is Node js Web application Framework


// _____ S1 E12


// What is Database?

// Database is organized collection of data.

// Database vs DBMS
// DBMS is something like middle man which talks to DB and user/server and gives user certain things to get or put the data.

// Types of Databases:
// 1. Relational DB - MySQL , Postgresql
// 2. NO SQL DB - MongoDB
// 3. In memory DB - Reddis
// 4. Distributed SQL DB - Cockroach DB
// 5. Time series DB - Influx DB
// 6. OO DB - db4o - ObjectOrientedDB
// 7. Graph DB - Neo4j
// 8. Hierarchical DB - IBM IMS
// 9. Network DB - 10MS
// 10. Cloud DB - Amazon RDS


// RDBMS (MySQL, PostgreSQL)

// EF Codd - Codd's 12 Rules [0-12]
// the rules applicable to RDB - Relational DB

// MySQL - created by Michael Videnium
// Sun Microsystems hold it then after sometime till now Oracle Own/Manage it.

// Postgres - created by Michael Stonebreakes
// Ingres -> Post In gres -> PostgreSQL

// NoSQL (MongoDB)
// Types->
// Document DB
// Key value DB
// Graph DB
// wide column DB
// Multimodel

// MongoDB is of Document DB type.
// MongoDB - 2009 getting famous
// creted by 10gen
// Mongo came from Humoungous meaning gigatic - huge

// scale on both ways - vertical - horizontal

// 10gen -> changed to MongoDB Inc

// flexible
// very compatible with JS Stack
// Stores data in documents in JSON format
// increases developer productivity

// RDBMS vs NoSQL (Document)

// in RDBMS the data is stored in tables as rows and in mongoDB data is stored in Collection as a documents

// Collection -> Documents -> Fields

// No need for joins and No need for data normalization
// _________________________________________
// Difference

// RDBMS
// - Table, Rows, columns
// - Structured Data
// - Fixed Schema
// - SQL
// - Tough Horizontal Scalling
// - Relationships - foreign keys + joins
// - Read-heavy apps transaction workloads
// - Ex. Banking apps

// NoSQL (MongoDB)
// - collection, document, field
// - Unstructured Data
// - flexible schema
// - Mongo(MQL) , Neo4J (Cypher)
// - Easy to scake horizontally + vertically
// - Nested [RelationShips]
// - Real Time, Big data, distributed computing
// - Ex. Real Tie analogies , social media