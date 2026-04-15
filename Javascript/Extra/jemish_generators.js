// - Explore more about generators
//         - Generator Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
//         - Async Generator Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator
// - Create a demo of generators
//         - Create a generator function to generate 20 random numbers
//         - Create a generator function to generate 20 random numbers in a range
//         - Create an async generator with same pizza making example

// Create a generator function to generate 20 random numbers
function* generateTwentyNum(n) {
  while (n > 0) {
    n--;
    yield Math.random();
  }
}

const result = [...generateTwentyNum(20)];
console.log(result);

// Create a generator function to generate 20 random numbers in a range
function* generateTwentyNumInRange(n, min, max) {
  while (n > 0) {
    n--;
    yield Math.floor(Math.random() * (max - min) + min);
  }
}

const res = [...generateTwentyNumInRange(20, 60, 100)];
console.log(res);

// Create an async generator with same pizza making example
function prepareDough() {
  return new Promise((resolve, reject) => {
    console.log("Preparing dough...");
    setTimeout(() => {
      console.log("Dough is ready!");
      resolve();
    }, 2000);
  });
}

function addSauce() {
  return new Promise((resolve, reject) => {
    console.log("Adding sauce...");
    setTimeout(() => {
      console.log("Sauce has been added!");
      resolve();
    }, 1000);
  });
}

function addToppings() {
  return new Promise((resolve, reject) => {
    console.log("Adding toppings...");
    setTimeout(() => {
      console.log("Toppings have been added!");
      resolve();
    }, 1500);
  });
}

function bakePizza() {
  return new Promise((resolve, reject) => {
    console.log("Baking pizza...");
    setTimeout(() => {
      console.log("🍕 is ready!");
      resolve();
    }, 3000);
  });
}

async function* readyPizza() {
  try {
    yield await prepareDough();
    yield await addSauce();
    yield await addToppings();
    yield await bakePizza();
  } catch (err) {
    console.error(err);
  }
}

// const generator = readyPizza();

// generator.next().value;
// generator.next().value;
// generator.next().value;
// generator.next().value;

(async () => {
  for await (const iter of readyPizza()) {
    // console.log(iter);
  }
})();
