// Day-30

// Date: 13/04/2026
// Task: Revised Nodejs Events and crypto module, watched E5 as learned about route handlers and middlewares, and how to handle error on combined all path with single middleware, completed a task Given by sir, as did all 5 http methods as GET, POST, PUT, PATCH, DELETE and create a http server server with help of node modules to handle user's CRUD operations with static json file as database.

// ______________________________________________________

// Revising Nodejs Modules

// - Events
// - crypto


// const { EventEmitter } = require("node:events");

// const myEvent = new EventEmitter();

// let i = 1;
// let count = 1;

// const myListener = () => {
//     setTimeout(() => {
//         console.log(`myListerner ${count++}`);
//     }, (i++) * 500);
// }

// myEvent.on('event', myListener);

// console.log(myEvent.listenerCount('event'));

// myEvent
//     .once('event', myListener)
//     .on('event', myListener)
//     .on('event', myListener)
//     .on('event', myListener)
//     .on('event', myListener)
//     .on('event', myListener)
//     .on('event', myListener)
//     .on('event', myListener)
//     .on('event', myListener)
//     .on('event', myListener);

// myEvent.emit("event");

// console.log(myEvent.listenerCount("event"));

// myEvent.once("once",()=>{
//     console.log("This will called once");
// })

// myEvent.emit("once");

// console.log(myEvent.listenerCount('once'));


// const crypto = require("node:crypto");

// const hmac = crypto.createHmac('sha256','my-secret').update('myPassword').digest('hex');

// console.log(hmac);

// crypto.pbkdf2("myPassword","some salt",50,20,'sha256',(err,key)=>{
//     console.log(key);
//     console.log(key.toString('hex'));
// });

// console.log(crypto.getHashes());
// console.log(crypto.getCiphers());

// let key = crypto.randomBytes(32);
// let iv = crypto.randomBytes(32);

// const cipher = crypto.createCipheriv("aes-256-gcm",key,iv);
// let encrypted = cipher.update('Sensitive Data',"utf8",'hex');
// encrypted += cipher.final('hex');
// const auth = cipher.getAuthTag();

// const decipher = crypto.createDecipheriv("aes-256-gcm",key,iv);
// decipher.setAuthTag(auth);
// let decrypted = decipher.update(encrypted,'hex','utf8');
// decrypted += decipher.final('utf8');

// console.log({encrypted,decrypted});

// crypto.scrypt("myPassword",crypto.randomBytes(16),20,(err,key)=>{
//     console.log(key.toString("hex"));
// })

// crypto.argon2("argon2id", { memory: 2 ** 16, message: "myPassword", nonce: crypto.randomBytes(16), parallelism: 4, secret: "the hard secret", tagLength: 64, passes: 500 }, (err, key) => {
//     if (err) console.error(err);
//     console.log(key);
// });



// __________________________________________________

// DevTinder

// Route Handlers examples
// app.get("/route",rH1(next)); app.get("/route",rH2);

// if we are calling next inside route handler but if we don't have next routehandler then it will throw an error as cannot get '/route'.

// now we can understand that which are calling routeHandlers which works inbetween from our original method which sends res back, they are called middlewares.