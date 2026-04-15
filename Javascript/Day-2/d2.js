// javascript history
// "use strict"
// valid variale names
// primitive data types and non-primitive data types
// alert, prompt, confirm
// covered till 2.9
// Closure : Function remebers it's lexical scope although it have returned anywhere else then it called closure.
// Function along with its lexical scope forms a bundle that what's the closure is.
// Example Uses :
// - Module Design Pattern
// - Currying
// - Function like once
// - Memoize
// - Maintaining state in async world
// - setTimeouts
// - Iterators
// setTimeout with closure
// How closure helps in data hiding and encapsulation
// functions (statement, expression, anonymous, first class funtions)


// _________________________________________________

// alert("I'm the JavaScript");
// alert("Hello");

// alert(3 +
// 1
// +2);

// alert("Hello")
// [1,2].forEach(alert); //error for both upper and lower line as there is no semicolon and browser interprets it as like alert("Hello")[1,2].forEach(alert)

// alert(`the result is ${1+3}`);

// let userName = prompt("Enter your name:","Enter here");
// alert(`Welcome ${userName}`);

// alert(2+2+'1'); //41
// alert('1'+2+2); //122
// alert('1'+2+2+'1'); // 1221

// alert(5++); //syntax error as ++ can only be applied to variables

// var newObj = {};
// newObj["name"] = "Brijesh";
// newObj.surname = "Badralkiya";
// console.log(newObj); // { name: 'Brijesh', surname: 'Badralkiya' }

// ________________________________________________

// function x(){
//     var a = 1;
//     function y(){
//         console.log(a);
//     }
//     return y;
// }
// var z = x();
// console.log(z);

// _______________________________________________

// function x(){
//     for(var i=1;i<=5;i++){
//         function y(z){
//             setTimeout(function(){
//                 console.log(z);
//             },i*1000);
//         }
//         y(i);
//     }
// }
// x();

// _______________________________________________

// function outest(){
//     var c = 1;
//     function outer(){
//         function inner(){
//             console.log(z,c);
//         }
//         let z = 10;
//         return inner;
//     }
//     return outer;
// }
// outest()()();

// function Counter() {
//     var count = 0;
//     this.incrementCounter = () => {
//         count++;
//         console.log(count);
//     }
//     this.decrementCounter = () => {
//         count--;
//         console.log(count);
//     }
// }

// var counter1 = new Counter();
// counter1.incrementCounter(); // 1
// counter1.decrementCounter(); // 0

// ________________________________________________

// function statement

// function a() {
//     console.log("a called");
// }

// function expression

// var b = function () {
//     console.log("n called");
// }

// the diffrence between above two is that while hoisting(calling the function before its declaration) a is hoisted but b is not as b is treated as a variable and assigned function when that line executes

// Anonymous function

// function () {
//     console.log("Anonymous function");
// }

// named function expression

// var c = function z() {
//     console.log("Named function expression");
// }

// Difference between parameters and arguments

// // parameters are param1, param2
// var b = function (param1, param2) {
//     console.log("n called");
// }
// arguments are 5,10
// b(5, 10);

// First class functions (functions are treated as first class citizens in js, meaning they can be assigned to variables, passed as arguments to other functions, and returned from other functions)
