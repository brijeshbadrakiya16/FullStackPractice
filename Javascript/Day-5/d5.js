// Day - 5

// 2.15 function-basics
// 2.16 function-expressions
// 2.17 arrow-functions basics
// 2.18 revision
// 3.1 Debugging in the browser
// 3.2 codding style
// 3.3 comments
// 3.4 Ninja code



// ________________________________________________

// function showMessage(){
//     var message = "Hello World!";
//     alert(message);
// }
// showMessage();
// alert(message);

// let userName = "John";

// function showMessage(){
//     let userName = "Bob";
//     alert(this);
// }

// showMessage();

// function showPrime(n){
//     nextPrime: for (let i = 2 ; i < n ; i++) {
//         for (let j = 2 ; j< i ; j++) {
//             if(i%j ==0) continue nextPrime;
//         }
//         console.log(i);
//     }
// }
// showPrime(100);

// function min(a,b){
//     return a<b ? a : b;
// }
// console.log(min(2,5));
// console.log(min(3,-1));
// console.log(min(1,1));

// function pow(x, n) {
//     return x ** n;
// }
// function pow(x, n) {
//     let result = x;
//     let multiplier = x;
//     for (let i = 2; i <= n; i++) {
//         result *= multiplier;
//     }
//     return result;
// }
// console.log(pow(3, 2));
// console.log(pow(3, 3));
// console.log(pow(1, 100));

let ask = (question, yes, no) => {
    (confirm(question)) ? yes() : no();
};

ask('Do you agree?', () => alert("You agreed"), () => alert("You canceled the execution."));