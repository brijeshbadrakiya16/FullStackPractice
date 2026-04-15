// ## callbacks

// _Callbacks are functions that are passed as arguments to other functions and are executed when a specific event occurs._

// ## Synchronous callbacks

// _Synchronous callbacks are executed immediately after the function is called._

// ## Asynchronous callbacks

// _Asynchronous callbacks are executed at some point in the future, usually when some event has occurred or when a certain condition has been met._

// ### _synchronous pizza ordering_

// javascript
let pizza;

function orderPizza() {
  console.log(`Ordered pizza`);
  pizza = `🍕`;
  console.log(`${pizza} is ready`);
}

orderPizza();
console.log(`Eat ${pizza}`);


// ### making it looks real, using async js

// javascript

// let pizza;

// function orderPizza() {
//   console.log(`Ordered pizza`);
//   setTimeout(function makePizza() {
//     pizza = `🍕`;
//     console.log(`${pizza} is ready`);
//   }, 2000);
// }

// orderPizza();
// console.log(`Eat ${pizza}`); // ! when this execute, pizza not prepared yet !!


// ### eating pizza is depending on orderPizza and should not execute until pizza is ready.

// to solve this we have two methods (their are more but will see that later)

// method 1 (bad) : move the dependent block in the orderPizza function itself
function solution1() {
  let pizza;

  function orderPizza() {
    console.log(`Ordered pizza`);
    setTimeout(function makePizza() {
      pizza = `🍕`;
      console.log(`${pizza} is ready`);
      console.log(`Eat ${pizza}`);
    }, 2000);
  }

  orderPizza();
}

// method 2 (good) : use callback function that will be invoked when pizza is ready
function solution2() {
  let pizza;

  function orderPizza(callback) {
    console.log(`Ordered pizza`);
    setTimeout(function makePizza() {
      pizza = `🍕`;
      console.log(`${pizza} is ready`);
      if (typeof callback == "function") callback();
    }, 2000);
  }

  function eatPizza() {
    console.log(`Eat ${pizza}`);
  }

  orderPizza(eatPizza);
}


// ## Lets dive deep into 🍕 making using callbacks


function prepareDough(callback) {
  console.log("Preparing dough...");
  setTimeout(() => {
    console.log("Dough is ready!");
    callback();
  }, 2000);
}

function addSauce(callback) {
  console.log("Adding sauce...");
  setTimeout(() => {
    console.log("Sauce has been added!");
    callback();
  }, 1000);
}

function addToppings(callback) {
  console.log("Adding toppings...");
  setTimeout(() => {
    console.log("Toppings have been added!");
    callback();
  }, 1500);
}

function bakePizza() {
  console.log("Baking pizza...");
  setTimeout(() => {
    console.log("🍕 is ready!");
  }, 3000);
}

function makePizza() {
  prepareDough(() => {
    addSauce(() => {
      addToppings(() => {
        bakePizza();
      });
    });
  });
}

console.log("Making pizza...");
makePizza();


// This code simulates the process of making a pizza using asynchronous callbacks. Each step of the process (preparing the dough, adding sauce, adding toppings, and baking the pizza) is represented by a function that takes a callback parameter. When each step is finished, it calls its callback to move on to the next step.

// However, this code also demonstrates the problem of "**callback hell**" also known as pyramid of doom as the shape of code resembles pyramid. As the number of steps increases, the indentation level of the code becomes deeper and deeper, making it difficult to read and understand the code. This can lead to bugs and errors, especially when dealing with complex programs.

// ### solving callback hell

// There are many ways to solve callback hell. One way to solve the problem of callback hell is to use named functions instead of anonymous functions. This makes the code easier to read and understand.


function prepareDough(callback) {
  console.log("Preparing dough...");
  setTimeout(() => {
    console.log("Dough is ready!");
    callback();
  }, 2000);
}

function addSauce(callback) {
  console.log("Adding sauce...");
  setTimeout(() => {
    console.log("Sauce has been added!");
    callback();
  }, 1000);
}

function addToppings(callback) {
  console.log("Adding toppings...");
  setTimeout(() => {
    console.log("Toppings have been added!");
    callback();
  }, 1500);
}

function bakePizza() {
  console.log("Baking pizza...");
  setTimeout(() => {
    console.log("Pizza is ready!");
  }, 3000);
}

//

function makePizza() {
  prepareDough(addSauceAndToppings);
}

function addSauceAndToppings() {
  addSauce(addToppingsAndBake);
}

function addToppingsAndBake() {
  addToppings(bakePizzaAndFinish);
}

function bakePizzaAndFinish() {
  bakePizza();
}

console.log("Making pizza...");
makePizza();

// In this refactored code, each step of the pizza-making process is defined as a separate named function. The makePizza() function is the entry point for the process and calls prepareDough(), which in turn calls addSauceAndToppings(). Each subsequent step is defined as a separate named function and calls the next step until the pizza is finished.

// This approach avoids the problem of callback hell and makes the code more readable and easier to maintain.

// ## Problems in call back

// 1. *callback hell* :
//    As the number of steps increases, the indentation level of the code becomes deeper and deeper, making it difficult to read and understand the code. This can lead to bugs and errors, especially when dealing with complex programs.

// 2. *inversion of control* : DIY
