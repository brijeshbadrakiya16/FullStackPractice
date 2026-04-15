// Day-3

// Callback queue and event loop
// --- event loop wait till the callstack is empty and if it is then pushes the callback from callback queue to it
// How the web apis works in browser

// Microtask queue --- it has higher priority than callback queue, all the callback functions which come through promises will go inside it, and also mutation observer also

// Starvation --- when the microtask queue can not be empty for long period of time and the callback waiting in the callback queue can not get a chance to execute, this scenario is called starvation

// JRE (JavaScript Runtime Environment) --- have JS(JavaScript Engine) and Web APIs, and also eventloop, callback queue and microtask queue

// JS -> Code_parsing = Tokens + Syntax_parser + AST -> Compilation ->
// JIT (Just in Time) Compilation --- it uses both interpreter and compiler to executer the code

// JS/V8 Engine architecture

// Array.prototype.(any name) = function(){} it allows to use that named function on all arrays

// Higher order functions --- a function that takes another function as an argument or returns a function as a result is called higher order function

// functional programming --- polyfill

// map, fiter, reduce
// always provide the intial value in reduce function

// Callback Hell and Inversion of Control 

// Promise is an object that represents the eventual completion or failure of an asynchronous operations. 

// Promise chain

// 2.10 to 2.11

// ________________________________________________

// console.log("Start");

// setTimeout(function cb(){
//     console.log("Callback");
// },1000);

// console.log("End");

// let startDate = new Date().getTime();
// let endDate = startDate;
// while(endDate < startDate + 15000){
//     endDate = new Date().getTime();
// }

// console.log("While expires");

// _______________________________________________

// const radius = [3, 1, 2, 4];

// const area = (radius) => {
//     return Math.PI * radius * radius;
// }

// const circumference = function(radius){
//     return 2 * Math.PI * radius;
// }

// const diameter = function(radius){
//     return 2 * radius;
// }

// Array.prototype.calculate = function(logic){
//     const output = [];
//     for(let i=0;i<this.length;i++){
//         output.push(logic(this[i]))
//     }
//     return output;
// }

// console.log(radius.map(area));
// console.log(radius.calculate(area))

// console.log(calculate(radius,area));
// console.log(calculate(radius,circumference));
// console.log(calculate(radius,diameter));

// const arr = [5, 1, 3, 2, 6];

// function double(x) {
//     return x * 2;
// }
// function triple(x) {
//     return x * 3;
// }

// const output = arr.map((value, index) => value * index)

// console.log(output);

// console.log(arr.filter(x => x % 2 === 0));

// console.log(arr.reduce((prev, curr) => prev > curr ? prev : curr, -Infinity));

// const users = [
//     { name:"a", age: 26 },
//     { name:"b", age: 75 },
//     { name:"c", age: 50 },
//     { name:"d", age: 26 },
// ];

// console.log(users.reduce((acc, curr) => {
//     acc[curr.age] = (acc[curr.age]) ? ++acc[curr.age] : 1
//     return acc;
// }, {}));

// console.log(users.filter(x => x.age<30).map(x => x.name))

// console.log(users.reduce((acc,curr)=>{
//     (curr.age<30) ? acc.push(curr.name) : null;
//     return acc;
// },[]))


// api.createOrder(
//     cart,
//     function () {
//         api.proceedToPayment(function () {
//             api.showOrderSummary(function () {
//                 api.updateWallet();
//             });
//         });
//     }
// );

// const cart = ["shoes", "pants", "kurtas"];
// const promise = createOrder(cart);

// promise.then(function (orderId){
//     proceedToPayment(orderId);
// })

const GITHUB_API = "https://api.github.com/users/akshaymarch7";

const user = fetch(GITHUB_API);

console.log(user);

user.then((data) => {
    return data;
}).then((data) => {
    return data;
}).then((data) => {
    return data;
}).then((data) => {
    console.log(data);
});


// foreach behaviour with both asynchronous and synchronous