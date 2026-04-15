/*
1. Before promise we used to depend on callback functions which would result in
1.) Callback Hell (Pyramid of doom) | 2.) Inversion of control
2. Inversion of control is overcome by using promise.
  2.1) A promise is an object that represents eventual completion/failure of an asynchronous operation.
  2.2) A promise has 3 states: pending | fulfilled | rejected.
  2.3)  As soon as promise is fulfilled/rejected => It updates the empty object which is assigned undefined in pending state.
  2.4) A promise resolves only once and it is immutable.
  2.5) Using .then() we can control when we call the cb(callback) function.

3. To avoid callback hell (Pyramid of doom) => We use promise chaining. This way our code expands vertically instead of horizontally.
Chaining is done using '.then()'
4. A very common mistake that developers do is not returning a value during chaining of promises. Always remember to return a value.
This returned value will be used by the next .then()
*/

/*
// callback
function fun1(callbackFun1) {
  console.log("1");
  callbackFun1(fun3);
}

function fun2(callbackFun2) {
  console.log("2");
  callbackFun2();
}

function fun3() {
  console.log("3");
}

fun1(fun2);
*/

/*
// callback Hell
function getCheese(callback) {
  setTimeout(() => {
    const cheese = "🧀";
    console.log("Your cheese:", cheese);
    callback(cheese);
  }, 2000);
}

function getSoda(passCheese, callback) {
  setTimeout(() => {
    const soda = "🥤";
    console.log("Your Cheese:", passCheese, " Your soda:", soda);
    callback(passCheese, soda);
  }, 1000);
}

function getPizza(passCheese, passSoda) {
  setTimeout(() => {
    const pizza = "🍕";
    console.log(
      "Your Cheese:",
      passCheese,
      " Your soda:",
      passSoda,
      " Your pizza:",
      pizza
    );
  }, 500);
}

getCheese(function (passCheese) {
  getSoda(passCheese, function (passCheese, passSoda) {
    getPizza(passCheese, passSoda);
  });
});
*/

// Promise
/*
function genorderid({ itemname, price }) {
  return new Promise((resolve, reject) => {
    const orderid = 123456;
    setTimeout(() => {
      console.log(
        "add in cart  i item : " +
          itemname +
          " item price is : " +
          price +
          " your order id is: " +
          orderid
      );
      resolve({ itemname, price, orderid });
    }, 2500);
  });
}

function makepayment({ itemname, price, orderid }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("you make your payment here: ");
      console.log(
        "add in cart  i item : " +
          itemname +
          " item price is : " +
          price +
          " your order id is " +
          orderid +
          " your amount is : " +
          price
      );
      console.log("please wait for the payment status:");
      resolve();
    }, 2000);
  });
}

function paymentstatus() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("payment is successfully proceed");
      resolve();
    }, 5000);
  });
}

function givemassage() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("thank you");
      resolve();
    }, 2000);
  });
}

const promises = new Promise((resolve, reject) => {
  setTimeout(() => {
    const itemname = "iphone";
    const price = 50000;
    console.log(
      "add in cart i item : " + itemname + " item price is : " + price
    );
    console.log("you are interested than generate order id :");
    resolve({ itemname, price });
  }, 3000);
});

promises
  .then(({ itemname, price }) => {
    return genorderid({ itemname, price });
  })
  .then(({ itemname, price, orderid }) => {
    return makepayment({ itemname, price, orderid });
  })
  .then(() => {
    return paymentstatus();
  })
  .then(() => {
    return givemassage();
  });

// async function main() {
//   try {
//     const val = await promises;
//     const generateVal = await genorderid(val);
//     await makepayment(generateVal);
//     await paymentstatus();
//     await givemassage();
//   } catch (error) {
//     console.error(error);
//   }
// }

// main();
*/

// Promise Methods
/*
// Promise.all([p1,p2,p3])
//            // |  |  |
//            // 3s,2s,1s
// it will run all promise and give result of all promise value in array.
// if one promise reject from all([]) then Promise.all() will fail and "output is same error of rejected promise".
// in this if p2 reject then it will throw(return) error, it will not wait for any other promise to run.
// Promise Already fulfilled, if the iterable passed is empty.

const p1 = Promise.resolve(1); // this called as static methods
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
    // reject();
  }, 2000);
});
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then((val) => {
  console.log(val); // returns arr of promise val
});
*/

/*
// Promise.allSetteled()
// if all promises resolve() then it give output same as .all().
// if p2 failed after 2s but it still wait other Promise to run(Complete), then it will give all result is either resolve or reject
// in array form.
// it give "{ status: 'fulfilled', value: 1 }" as an output.
// if reject then give { status: 'rejected', reason: 3 } in the output.

const p1 = Promise.resolve(1);
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});
const p3 = Promise.resolve(3);

Promise.allSettled([p1, p2, p3]).then((val) => {
  console.log(val);
});
*/

/*
// Promise.race()
// the promise who will fulfilled first it return that "promise as an value", and it will not care about any other Promise.
// if first promise is finish and it rejected then it will return error.

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});
const p2 = Promise.resolve(1); // if it reject() then it will return error.
const p3 = Promise.resolve(3);

Promise.race([p1, p2, p3]).then((val) => {
  console.log(val);
});
*/

/*
// Promise.any()
// it will find success
// if p2 reject then it wait for other to fulfilled and always return fulfilled "value".
// if all of are rejected then it will return AggregateError: (it is arr of all error).

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});
const p2 = Promise.resolve(1);
const p3 = Promise.reject(3);

Promise.any([p1, p2, p3]).then((val) => {
  console.log(val);
});
*/

// async
/*
// async function always returns Promise
async function getData() {
  return "value";
}

const data = getData();
console.log(data); // it will give Promise { 'value' }

// to retrive inside value
data.then((val) => console.log(val));
*/

/*
const p = new Promise((resolve, reject) => {
  resolve("Hi");
});

async function getData() {
  // if return value is not promise then it will wrap into promise and return.
  // if return value is promise then it will return as it is.
  return p;
}

const data = getData();

data.then((val) => console.log(val)); // we and handle promise using await as mention below
*/

/*
// await
// async - await are use to handle Promises
// await is keyword that can only be used inside async function
// write await before "Promise or async" function to get data.

const p = new Promise((resolve, reject) => {
  resolve("Resolved");
});

async function handlePromise() {
  // const res = p; // it gives Promise { 'Resolved' }
  const res = await p; // await handle promise and wait for it to fulfilled and returns
  console.log(res);
}

handlePromise();
*/

// for error handling use try-catch or .catch()

// fetch() => returns Response Obj that has body it hava readableStream
// then it converted to json using .json()
// .json() is also Promise to it will take time to convert
// so, in async-await use await .json();

// Note:
/*
// one line callback
function myCallback(message) {
  console.log(message);
}

setTimeout(myCallback, 1000, "Hello, world!");

// same as above
setTimeout(console.log, 1000, "Hello, world!");
*/
