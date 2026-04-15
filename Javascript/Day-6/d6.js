// Day-6
// 3-Types_Coercion
// NaN is the only value which is not equal to itself
// isNaN() converts param to number but Number.isNaN not
// negative Zero

// 02-Scopes_Closures
// 1-Compiler Theory _Scope 1:16:00

// Function Scoping
// IIFE (immediately invoked function expression)
// Hoisting
// Closure

// Completed 02-Scopes_Closure

// 3.5 Automated testing with mocha
// 3.6 Polyfills and transpilers

// 4.1 Objects

// ________________________________________________

// var y = "5";

// console.log(y++);
// console.log(y);

// let myCatsAge = Number("n/a");

// console.log(isNaN(myCatsAge));
// console.log(isNaN("fjs"));

// console.log(Number.isNaN(myCatsAge));
// console.log(Number.isNaN("djh"));

// var trendRate = -0;
// console.log(trendRate === -0); // true

// console.log(trendRate === 0); //true
// console.log(trendRate.toString()); //"0"

// console.log(trendRate < 0); //false
// console.log(trendRate > 0); //false

// console.log(Object.is(trendRate, -0)); //true
// console.log(Object.is(trendRate, 0)); //false

// console.log(Object.is(0,-0));

// x = 1;
// console.log(x);

// var a = 1;

// function otherClass() {
//     var a = 2;
//     console.log(a); //2
// }
// otherClass();
// console.log(a); //1

// var teacher = "Kyle";

// function otherClass() {
//     teacher = "Suzy";
//     topic = "React";
// }
// otherClass();

// console.log(teacher);
// console.log(topic);

// var teacher = "Kyle";

// (function anotherTeacher() {
//     var teacher = "Suzy";
//     console.log(teacher);
// })();

// console.log(teacher);

// function withoutLet(x) {
//     setTimeout(function cb(){
//         console.log(x);
//     }, x * 1000);
// }
// for (var i = 0; i < 4; i++) {
//     withoutLet(i);
// }

// Objects ___________________________________

// let user1 = new Object();
// let user2 = {};

// let fruit = prompt("Which fruit to buy?", "apple");

// let bag = {
//   fruit: 5, // the name of the property is taken from the variable fruit
// };

// alert( bag.apple )

// var io = 1

// function ds() {
//     io = 10
//     return;
//     function io() {}
// }
// ds()
// console.log(io)

// console.log(dfjh);
// y = 11;
// var x = 10;
// var e = 77
// function func(){
// if(false){
//     var e = 4
// }
//     console.log(e)
// }
// func()

// var io = 1

// function ds() {
//     io = 10
//     return;
//     function io() {}
// }
// ds()
// console.log(io)