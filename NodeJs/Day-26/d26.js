// Day-26


// ______________________________________________________


// _____ S1 E13

// MongoDB is document oriented database

// MongoDB has two versions, Free and Enterprise

// Both can be used as self managed or managed by MongoDB

// When you self managed, then you have to make sure when you are going to production you have to deploy your database, you have to make sure your database is always up and running, you have to make sure that your database backedup properly because suppose if your server is hacked or server is crashed then you need your data to be backedup, you can do it with regular backups.

// If you want then you can do your database managed by MongoDB, they charge some money but they will handle all the things.

// Go to MongoDB website, do login
// Create a free M0 cluster
// Create a User
// Get the connection string
// Install MongoDB Compass

// const URL = "mongodb+srv://brijesh:Brijesh.@learning.sdjcmsv.mongodb.net/";

// const mongo = require("mongodb");


// const client = new mongo.MongoClient()

// _______________________________________________________

// nodejs.org

// Crypto 
// Debugger
// Deprecated APIs
// EventEmitters
// File system (fs)
// Globals
// HTTP
// HTTP/2
// HTTPS
// Inspector


// const http = require("http");
// console.log(http.STATUS_CODES);


// below code is for just the encryption and decruption data like we want to send some data to other and don't want to any middle man to understand it then we can do this.

// const { scrypt, randomFill, createCipheriv } = require('node:crypto');

// const algo = 'aes-256-gcm';
// // use this for strong encryption + authentication (aead)
// // use "chacha20-poly1305" when want fast stream and best for mobile/IoT where AES hardware support is weak.

// const password = "Password used to generate key";
// // let encrypted;
// let encrypted = "";

// scrypt(password, 'salt', 32, (err, key) => {
//     if (err) throw err;
//     console.log("key :", key);

//     const iv = Buffer.alloc(16, 0);
//     //you can use randomBytes(12); /or .toString('hex') in end
//     // for gcm only

//     console.log('iv :', iv);
//     const cipher = createCipheriv("aes-256-gcm", key, iv);

//     cipher.setEncoding('hex');

//     cipher.on('data', (chunk) => encrypted += chunk);
//     cipher.on('end', () => console.log("Encrypted :", encrypted));

//     cipher.write(JSON.stringify({"name":"brijesh"}));
//     cipher.end();
//     const tag = cipher.getAuthTag();

//     scrypt(password, 'salt', 32, (err, key) => {
//         if (err) throw err;
//         const iv = Buffer.alloc(16, 0);
//         const decipher = createDecipheriv("aes-256-gcm", key, iv);
//         decipher.setAuthTag(tag);
//         let decripted = '';

//         decipher.on('readable', () => {
//             let chunk;
//             while (null !== (chunk = decipher.read())) {
//                 decripted += chunk.toString('utf8');
//             }
//         });
//         decipher.on('end', () => {
//             console.log(decripted);
//         });
//         decipher.on('error', (error) => {
//             console.log("Error :", error);
//         });

//         decipher.write(encrypted, 'hex');

//         decipher.end();

//     });
// })

// const { createDecipheriv } = require('node:crypto');

// const { Buffer } = require('node:buffer');

// const events = require('events');

// const myEmittter = new events.EventEmitter();

// myEmittter.on("event",function (){
//     // console.log("Event fired",a,b,this,this === myEmittter); //true
//     // console.log('Event fired',arguments[1]); if we haven't defined parameters
// })
// myEmittter.on("event",function (){

// })
// console.log(myEmittter.listenerCount("event"))
// myEmittter.removeAllListeners("event")
// console.log(myEmittter.listenerCount("event"))
// myEmittter.emit('event',1,2);

// _______________________________________________________


// _____ S2 E0

//DevTinder

// _____ S2 