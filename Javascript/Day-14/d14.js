// Day-14
// 61 to 162

// transpiling
// Scope - LHS and RHS Lookups
// Lexical scope
// eval and with
// Functions As Scopes
// IIFEs
// Blocks as Scope
// Closures
// exporting function/modules/variables
// lexical scope vs dynamic scope
// minor this binding in functions and arrow functions



// ______________________________________________


// function foo(str, a) {
//     eval(str);
//     console.log(a, b);
// }

// // var b = 2;

// foo("let b = 4", 1);

// console.log(b);

// var a = 2;

// (() => {
//     var a = 3;
//     console.log(a);
// })();

// console.log(a);

// console.log(undefined);

// foo();	//	"b"
// var a = true;
// if (a) {
//     function foo() { console.log("a"); }
// }
// else {
//     function foo() { console.log("b"); }
// }

// import {hello} from "../Day-13/d13.js";

// hello();

// function foo() {
//     console.log(a);
// }

// function bar() {
//     var a = 4;
//     foo();
// }

// var a = 2;

// bar();