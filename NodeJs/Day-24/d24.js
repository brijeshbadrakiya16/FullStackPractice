// Day-24

// _____________________________________________________

// _____ S1 E8

// Stages(Steps) of V8 Engine when you gave it code.

// V8 Engine Architecture

// A . Parsing :
//     1 . Lexical Analysis (Tokenization):
//         Code -> Tokens(var a=10;, tokens=var,a,=,10,;)
//     2 . Syntax Analysis (Parsing):
//         Tokens -> AST (Abstract Syntax Tree)
//         for visualizing ast go to astexplorer.net
//     When ever JS Engine can not able to generate AST it throws Syntax Error.
// B . Interpreter :
// ( Types of Languages : Interpretted(Code executes line by line ) And Compiled (Code first Compilded into Machine code and then Executes very fast) )
// JavaScript is both interpretted and complied language as it uses JIT Compiler(Just in time)
// AST -> Ignition Interpretter -> Byte Code -> Execution
// Ignition Interpretter -(HOT Code)> Turnofan Compiler -> Optimised Machine Code -> Execution

// Interpretter made an assumtion on code that later on Turbofan checked as it won't work to reuse than it sends back to Ignition Interpretter by deoptimising code

// AST ----
//         \
//      Ignition InterPretter  --->  Turbofan Compiler
//          |        ⬆️                      |
//          |         \                      |
//          |        deoptimised code        |
//          |                      \         |
//      Byte Code          Optimised Machine Code
//           \              /
//            \            /
//             \          /
//              \        /
//              EXECUTION

// 1995 JAVA-SCRIPT has been built


// _____ S1 E9


// Libuv, there are 3 Major components, 1. Event Loop 2.Callback Queue 3.Thread Pool

// The Tasks which are Asynchronous will handover(offload) to libuv by js engine, libuv is responsible for Async I/O in Nodejs.

// Suppose you have very big code mix of the async and sync, and libuv finishes the first async task it handed over then untill v8's callstack not be empty the libuv store that callback function of completed task into it's callback queue, then whenever the event loop of libuv sees that v8's call stack is empty then it pops first callback which is inserted and then put that on call stack.

// Event Loop has 4 Major Phases

// EventLoop-->1   timer(setTimeout/setInterval)
//                 /               \
//                /                 \
//               /     process       \
//              /     .nextTick()     \
//             /       ⬆️  |           \    I/O callbacks
//(socket.on('close'))  |   |         Poll ->incoming conn
//      Close           |   |              ->data
//             \        |  ⬇️         /   ->fs,crypto,http
//              \      promise        /
//               \     callback      /
//                \                 /
//                 \               /
//              Check (Set Immediate)

// event loop starts and first runs inside loopcycle check if process.nextTick() have any callback then execute it them promise callbacks then it moves to timer check for that and moves to next poll but before poll it again cycles through the inside loop and then after checks for poll, this is similar and exact same for all cycles.

// const fs = require('fs');
// const a = 100;

// setImmediate(() => console.log("setImmediate"));

// Promise.resolve(() => console.log("Promise"))
// // .then((data)=>{
// //     data();
// // });

// fs.readFile('', () => {
//     console.log("Reading file Completed");
// })

// setTimeout(() => console.log("setTimeout"), 0);

// process.nextTick(() => console.log('process.nextTick'));

// function printA() {
//     console.log("a :", a);
// }

// printA();
// console.log("Last line of code..");

// In the Idle phase- when all the all timers/checks/closes/process/promises executed and nothing left in queue then eventloop have nothing to do then it waits at poll for poll tasks to complete.


// _____ S1 E10