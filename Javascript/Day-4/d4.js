// Day-4

// how to crete and handle promise and promise chain

// promise apis
// Promise.all([p1,p2,p3]) //max time taken by any promise
// Promise.allSetteled([p1,p2,p3]) //max time taken by any promise
// Promise.race([p1,p2,p3]) //return the first settled api result no matter fail or success
// Promise.any([p1,p2,p3]) //wait for the any first api to succeed and return it's result

// async and await

// this keyword
// if we are in function then "this" value is diffenrent in strict-mode and non-strict-mode

// this inside non-strict mode - this substitution
// if the value of this is undefined or null then this will be replaced with globalObject only in non-strict mode

// this keyword value depends on how this is called(window)

// function x() {
//     console.log(this);
// }
// x(); //undefined in strict mode
// window.x(); //window in both

// if we make the function as part of an object then it will be called method

// const student = {
//     name: "brijes",
//     printName: function () {
//         console.log(this.name);
//     },
// };

// student.printName();

// call, apply, bind, methods (sharing methods)

// const student2 = {
//     name: "abc",
// };

// student.printName.call(student2); //this represents student2

// student2.printName = student.printName
// student2.printName();

// this inside arrow function
// this refers to it's enclosing lexical enrionment inside a arrow function

// this inside DOM , it represents callining element's object

// 2.12 to 2.14
// ________________________________________________

// 2.12
// ?? (nullish coalescing operator '??')
// it will return the first if it is not undefined or null and if it is then returns the second one
// const result = a ?? b;
// similar as
// const result = (a!==undefined && a!==null) ? a : b;

// 2.13

for (let i = 2; i <= 10; i++) (i % 2) ? console.log(i) : null;


// ________________________________________________



// const cart = ["shoes", "pants", "kurta"];

// const promise = createOrder(cart);
// console.log(promise);

// promise
//     .then(function (orderId) {
//         return orderId;
//     })
//     .catch((err) => {
//         console.log(err.message);
//     })
//     .then((orderId) => {
//         console.log(orderId);
//         return proceedToPayment(orderId);
//     })
//     .then((paymentInfo) => {
//         console.log(paymentInfo);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     })

// function createOrder(cart) {
//     const pr = new Promise(function (resolve, reject) {
//         // validateCart
//         if (!validateCart(cart)) {
//             const err = new Error("Cart is not valid");
//             reject(err);
//         }
//         // createOrder
//         // orderId
//         const orderId = "123456";
//         if (orderId) {
//             setTimeout(() => {
//                 resolve(orderId);
//             }, 5000);
//         }
//     });

//     return pr;
// }

// function proceedToPayment(orderId) {
//     return new Promise(function (resolve, reject) {
//         resolve("Payment successfull.");
//     });
// }

// function validateCart(cart) {
//     return true;
// }


// Promise.all([p1,p2,p3]);
// -> if all are the succeded then time taken is max time of any api
// -> if any one is fail, then immediately as soon as any of the promise get rejected then promise.all throw the same error returned by that promise

// Promise.allSetteled([p1,p2,p3]);
// -> for success same as all()
// -> waits for to be setteled wheather they succeed or fail as like [val 1,err,val 3]
// -> it will return array of objects

// Promise.race([p1,p2,p3]);
// -> as soon as the any first promise setteled it will return it's value
// -> return as (val p3); // not the array
// -> if the promise setteled will fail then it will return the error

// Promise.any([p1,p2,p3]);
// -> wait for any api to succeed first and then return it's result
// -> if all the api promise fails then it will return aggregate error, [err1,err2,err3]

// ____________________________________________________

// Promise.any([p1,p2,p3]);
// if all fails
// [err1,err2,err3];

// ____________________________________________________

// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("P1 Success."), 3000);
//     // setTimeout(() => reject("P1 Fail."), 3000);
// });

// const p2 = new Promise((resolve, reject) => {
//     // setTimeout(()=> resolve("P2 Success."),1000);
//     setTimeout(() => reject("P2 Fail."), 1000);
// });

// const p3 = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("P3 Success."), 2000);
//     // setTimeout(() => reject("P3 Fail."), 2000);
// });


// Promise.allSettled([p1, p2, p3])
//     .then(res => {
//         console.log(res);
//     }).catch((err) => {
//         console.error(err);
//         console.log(err.errors);
//     })

// -------------------------------------------

// const p = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("Promise Resolved Value!!"), 1000);
// });
// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("Promise 2 Resolved Value!!"), 5000);
// });

// async function handlePromise() {
//     const val = await p;
//     console.log(val);
//     const val2 = await p2;
//     console.log(val2);
// }
// handlePromise();


// async function
// it will always return a promise
// async function getData() {
//     return p;
// }

// const dataPromise = getData();
// dataPromise.then((res) => console.log(res));