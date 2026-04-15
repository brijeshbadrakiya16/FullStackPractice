// Day-23

// _______________________________________________________

// _____ S1 E5

// How node js restricts different files to being conflicted on the same variable names and same functions or you can say how node allocates each module/file a private space?

// --> suppose inside any file if you write any lines of code and wrape it inside a function like below,

// function xyz(){
//     var x = 10;
//     console.log(x); //10
// }

// console.log(x); // RefError : X is not defined

// as per above code you can not access the defined varibles or functions outside of that function, because function creates their own private scope and restrict it from accessing it from outside,
//      Node js do the same whatever you write in the modules, node js wrapes it inside a function so you can not directly access it.

// Imp: node always wrapes the code of that module inside function no matter you directly run code with node module-name.js or use require in another module.
//      it wrappes inside IIFE.

// Q . How are varibales & function private in different modules ??
// --->  IIFE & require(statement) , require wrapes your module code into IIFE.

// Q . How do you get access to module.export?
// --> node js add module object inside IIFE like below
// (function(module){
//      ..some code;
// })(module)

// it make IIFE with parameter named module and pass module object when invoking that IIFE.

// like other things like process, Buffer, setTimeout/interval/immediate, the module object is different. as all modules/files have there own __dirname,require,__filename, they also have there module object as it's injected inside scope by node's module wrapper.
// you can run below code to prove it.

// console.log(arguments.callee.toString());
// console.log(arguments);

// how require works!
// 1 -> it resolves the module
//      -> ./localpath -> .json -> node:module
// 2 -> loading the module
//      -> file content is loaded according to file typw
// 3 -> Wrapes inside IIFE
//      -> Compile step
// 4 -> code evaluation
//      -> module.export happens and returns it if it is .js file
// 5 -> catching
//      -> node catches the module after running the code once, so when you requiring same module in different files/modules so node only once run the module and catches to reuse the returned things so prevent load while loading and improving execution speed if scenario like you have hundreads of modules and multiple requires.

// you want to see original node code

// Go to : https://github.com/node


// _____ S1 E6


// JS -> is a synchronous single threaded language

// just tried this if scenario like we have capability of making 5 orders at same time and we want to maintain the order queue like first receives first and last receives last then on an average max avg time of 5 person will 10s according to below code

// function orderCoke() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('coke');
//         }, 0);
//     });
// }
// function orderPizza() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('pizza');
//         }, 10000);
//     });
// }

// function orderNoodles() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Noodles');
//         }, 5000);
//     });
// }

// async function orders() {
//     const d1 = orderCoke();
//     const d2 = orderNoodles();
//     const d3 = orderPizza();
//     const d4 = orderCoke();
//     const d5 = orderNoodles();

//     console.log(await d1);
//     console.log(await d2);
//     console.log(await d3);
//     console.log(await d4);
//     console.log(await d5);
// }

// orders();

// but with the apis you can do real things in async like every person receives the order of their making time only no waiting.
// like not maintaining the sequence of the orders, first resolves will get first

// ---> libuv is the one who gives multiple type of access to V8 js engine in node

// --> it is written in c language and when you wanted to communitcate between low-level specs like os or system or any other similar thing you have c to effectively handle it.

// it acts as middleware like between V8 engine and OS.

// like we have written some io operations like getting api data from url , setTimeout , reading file (async) then the libuv is the key handler between v8's code execution and os, v8 quickly executes code and gives particular task with it's callback so libuv can execute it with help of os and then after finishing that task libuv returns registered call back to the v8 and v8 quickly executes it, this is how node is async and can do async I/O operations.



// _____ S1 E7


// const fs = require('fs');
// const https = require('https');

// console.log("hello world");

// var a = 82376;
// var b = 29335;

// https.get("https://dummyjson.com/products/1", (res) => {
//     console.log("Fetched data successfully");
//     // res.destroy();
//     // here if you not write it then the socket connection which the https made will not close so cmd is ongoing and does not exit defaultly as it continues to listen the response.
// });

// setTimeout(() => {
//     console.log("set timeout called after 5 seconds");
// }, 5000);

// fs.readFile("./d23.js", "utf-8", (err, data) => {
//     console.log("file data :");
// });

// function multiply(x, y) {
//     return x * y;
// }

// var c = multiply(a, b);

// console.log("Multiplication result is :", c);

// Insort Libuv is responsible in node run any asynchronous task.

// const crypto = require("crypto");

// // Password base key derivative function - pbkdf
// crypto.pbkdf2("12345678", "salt", 10000000, 50, 'sha512', (err, key) => {
//     console.log("Async key:", key.toString('hex')===key2.toString('hex'));
// })

// const key2 = crypto.pbkdf2Sync("12345678", "salt", 10000000, 50, 'sha512');

// console.log(key2.toString('hex'));