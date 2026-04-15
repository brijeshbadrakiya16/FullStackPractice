// Day-22


// __________________________________________________

// _____ S1 E0

// _____ S1 E1

// Jeff Atwood - 2007 Founder/StackOverflow
//      "Any application that can be written in JavaScript, will eventually be written in JavaScript"

// Node js --> It's Javascript runtime and it's built on top of chrome's V8 Engine.
// It's a cross-platform that can run everywhere on any OS.
// It's a open Source and it is maintain by community/commitie of OpenJS Foundation.
// It runs on Chrome's V8 Engine. It helps you to run js outside the web browser.
// It has an Event-Driven Architecture, that is capable of Asynchronous I/O | Non-Blocking I/O .

// It was Develop by Ryan Dahl in 2009.

// Wherever there is a JavaScript then there is JS Engine to run it. Without it you can not.

// _____________________________________________________

// 2009 - Ryan Dahl - SpiderMonkey(FireFox) -- After 2 Days of dev he changed to V8(Chrome).

// Joyent is company which offered ryan to work on the node project and they will fund/support it.

// Earlier when ryan developed it he named it as "web.js" to create web server, but later on he renamed it to "node.js", he realized that it is not limited to web servers, you can build multiple things with the help of node.js

// why he build?
// The Problem :
//     1. Apache Http Server was used to create server, and it is blocking server.

// The Non-blocking server helps you to handle multiple request with lesser number of threads.

// ______________________________________________________
// 2010 - NPM wa introduced - It is Package manager for node
// npm is basically a registry where anyone can add package
// ______________________________________________________
// 2011 (windows Support) - as intially node was can be run on only mac and linux - Joyent + MS made that happen
// ______________________________________________________
// 2012 - Ryan gives responsibility to Isaac(creator of npm)

// Now V8 was started updating fast, but the team was not able to maintain node up to date, they are slowing in terms of realising new versions of node.
// ______________________________________________________
// 2014 - Fedor - developed fork of node - named as io.js

// Joyent was the one who was the limiting the realises and slowing it's development.
// ______________________________________________________
// Sep 2015 - node JS foundation formed - it was commity to take away the handle of the node.js/io.js and murged it.
// ______________________________________________________
// 2019 - 2 commities JS Foundation and Node js Foundation , this two murged as "Open Js Foundation" and they now currently handling the nodejs .


// _____ S1 E2

// Node js is c++ code.
// Infact the JS Engine is majority(more than 70%) c++ code.

// V8 can be embedded into any C++ programe
// means you can run js scripts and interect with between js and c++ through the v8

// ______________________________
// |                  Server    |
// |   ______________________   |
// |   |      Node JS (C++) |   |
// |   |   ______________   |   |
// |   |   |            |   |   |
// |   |   |  V8 (C++)  |   |   |
// |   |   |____________|   |   |
// |   |                    |   |
// |   |____________________|   |
// |                            |
// |____________________________|

// they why was node created and why just putting V8 on server will not the run js on server ????

// --->  First understand Ecma Script.
//       What it is -> it is Standard for scripting languages. It is standard/Rules that followed by JS also and it is maintained by Ecma International (swiss based standards organizations).
//       The V8 follows the Ecma Script standards, so it can not go beyond/outside of Ecma Script but here node gives it certain powers, node gives certain things on top of V8 which evantually helps V8 to run the JS on the server or anywhere.
//       What is the power --> it is the API's on the server, suppose we have to access the database on the server than we can not do it with only help of V8, so here the node gives that power to communicate with it.
//       It provide some more access, as this is just the example.

// Now why the V8 is C++ code and what it do?
// ---> V8 was built in 2006, so the engine need to be fastest and it wanted memory control and some other cross-platform and browser dependent things, so major code of chromium browsers is of C++ and at time of devlopment the c++ was big present to develop fast softwares, in v8 where the js executing where any fractionals of micro seconds matters, there comes c++, so for this some reasons V8 is build on major of C++ code.
// ---> It parses the JS code

// ---> Scenario like computer understands only binary code, on top of that there is Assembly code and on top of that there is Machine code and top of that High level languages come, where the c++ is held, and on top of that the JS is held, so it would so easy to us to use the Js to do certain things which is far compleceted to understand in low level languages.

// _____ S1 E3

// Node JS is JavaScript Runtime Environment which provides Js to run outside of the browser.

// REPL (Read Evaluate Print Loop)

// console.log(global);

// global is part of Node not part of the V8.
// it is one of the power which is given by node to v8.
// with help of global we can use multiple important functions/specialities in node.

// console.log(this); // {}
// it prints the empty object
// if we have run js in browser then we know that browser automatically assigns window(browser's global object) to this if it is undefined but not in node.

// const someFunction = () => {
//     console.log(this);  //{}
// }
// someFunction();

// but below is an exception here inside this function this prints the global object
// const someFunction = function(){
//     console.log(this); //global
// }
// someFunction();

// console.log(self); // RefError self is not defined
// console.log(frames); // RefError frames is not defined

// but if we run in the dev console of browser then it will both print the window object.

//as we think we questions that why there should not be a single global object name which works on the both of the broweser and the node
// the openJs commitie made "globalThis" as new and alrounder name which represents the global object according to where you were running the script

// like below it will print the node's global object
// console.log(globalThis);

// same for IIFEs

// WHy? --> as arrow function behaves they inherits the lexical object from it's surrounded scope, here they inherit global this ({}) but as function it changes to global if it is undefined in non-strict mode if you use "use strict" then it will print undefined


// _____ S1 E4

// require("./any path.js"); //you can run that js file

// in node the js files are modules
// and modules protects there code from accessing without it's permission
// like in your sum.js there is some func written
// now you run sum.js with require() then in second line you try to directly access that func which was defined in sum.js then node will throw error like that func is not defined in your code

// for giving permission or you intentionally wanted to use any variable or functions then you can do it with the help of the module.exports

// -| sum.js

// function calculateSum(a,b){
//     console.log(a+b);
// }
// module.exports = calculateSum;
// or module.exports = {calculateSum:calculateSum};
// same as module.exports = {calculateSum};

// there will be only change in the require on depending how'd you have exported

// -| app.js

// for first -> const calculateSum = require('./sum.js');
// for secon-> const {calculateSum} = require('./sum.js');
// just we are doing object destructuring.

// this type of imports are called common js modules(cjs),
// in the node you can implicitly use import and require at same time.

// const cr = require("crypto");
// cr.randomBytes(16);
// import crypto from "crypto";
// crypto.randomBytes(16);

// as per above code the "RefError : require is not defined in ES module scope, you can use import instead" will come if you run
// because you write import somthing then import is ES6 speciality and node will by default thinks the file as ESmodule not the commonJs module.

// if you want to use it you have to create package.json file inside your path and write there
// {
//     "type" : "module"
// }

// and you export function as below also (multiple also)
// export function () = {
//      ..some work;
// };

// and you must have to use import to use it

// Commmon js require is synchronous way and in non-strict
// ESmodule's import is asynchronous way in strict mode

// you can require multiple things from different files which is in same folder like below

// \Calculate
//  > sum.js
//  > multiply.js

// const {calculateSum,calculateMultiplication} = require("./Calculate");

// you can also import json by require("./data.json")

// diff between require("node:util") and require("util");
// --> not writing node: the node checks the util modules in your node_modules folder and retrieves it and writing node:module ensure returning the built in module
// effected when you have same name of module available/installed in your node_modules folder