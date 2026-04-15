// # Promises

// ## What is Promise ?

// _A Promise is an object which represents the eventual completion (or failure) of an asynchronous operation and its resulting value._

// _we can also say that promise is an special object that contain two field 'state' and 'value'. where initially state is pending and value is undefined_

// A Promise can be in one of three states:

// **Pending**: The initial state before the operation has completed.

// **Fulfilled**: The operation has completed successfully and a value is available.

// **Rejected**: The operation has failed and an error is available.

// Promises can be created using the Promise constructor, which takes a function that defines the asynchronous operation. The function should take two parameters: resolve and reject. resolve is a function that is called when the operation is successful, and reject is a function that is called when the operation fails.

// _A promises is said to be settled when either it is resolved or is rejected. in other word a promise is settled when its not in pending state._

// In real life whenever a promise is made two people are involved.

// 1. the person who makes the promise
// 2. and the person whom the promise in made to.

// The same applies to javascript promises and their is always two pieces involved in the promise

// 1. Promise **Maker** : _It creates the promise_

function maker() {
  return new Promise((resolve, reject) => {
    // async logic ...
    // resolve()
    // reject()
  });
}
// ```

// > _role of promise maker_:
// >
// > 1. returns a promise object(which will be in pending state at the time of invocation) immediately as a token
// >
// > 2. proceed with the async logic defined
// >
// > 3. invoke resolve function on success of async logic, and in case of any error invoke reject function

// 1. Promise **Receiver** : _It consumes the promise_

maker().then(onFulfilled, onRejected); // onFulfilled and onRejected are two callback functions which we attach to the promise object using then to get triggered automatically when result is ready.

// > _role of promise consumer_:
// >
// > 1. invoke the promise maker function
// >
// > 2. (optional) attach callbacks to the promise object returned by the promise maker


function orderPizza() {
  console.log(`Ordered pizza`);
  return new Promise((resolve, reject) => {
    setTimeout(function makePizza() {
      const pizza = `🍕`;
      console.log(`${pizza} is ready`);
      resolve(pizza);
      resolve(`🤣`); // it has no effect as promise can either resolve or reject once
      // reject(`❌ out of stock`);
    }, 2000);
  });
}

function eatPizza(pizza) {
  console.log(`Eat ${pizza}`);
}

function onRejected(err) {
  console.log(`Error : ${err}`);
}

const promise = orderPizza();
promise.then(eatPizza, onRejected);
// promise.then(eatPizza).then(null, onRejected)
// promise.then(eatPizza).catch(onRejected)

// > **Promise Guarantees**:
// >
// > 1. any promise can anytime in one of three state _'Pending'_, _'Fulfilled'_ and _'Rejected'_
// > 2. any promise can either be resolved or rejected, and whatever it be it can happens only once
// > 3. promises are immutable anc can't be altered once resolved

// wait still confused 😕! when to reject and when to resolve ?

// ### some meaningful example to demonstrate when to resolve or reject

function orderPizza(type) {
  function fun(resolve, reject) {
    const types = ["french", "chicago", "white"];
    if (!types.includes(type)) return reject("not in stock");

    setTimeout(() => {
      switch (type) {
        case "french":
          resolve("french 🍕");
          break;
        case "chicago":
          resolve("chicago 🍕");
          break;
        case "white":
          resolve("white 🍕");
          break;
      }
    }, 0);
  }
  return new Promise(fun);
}

function onFulfilled(val) {
  console.log("resolved", val);
}
function onError(err) {
  console.log("rejected", err);
}
const promise = orderPizza("white").then(onFulfilled, onError);

// ### lets take some other example which uses fetch api

const promise = fetch("https://api.github.com/");
console.log(promise); // Promise {<Pending>}

/** OBSERVATIONS:
 * If we will deep dive and see, this `promise` object has 3 things
 * `prototype`, `promiseState` & `promiseResult`
 * & this `promiseResult` is the same data which we talked earlier as data
 * & initially `promiseResult` is `undefined`
 *
 * `promiseResult` will store data returned from API call
 * `promiseState` will tell in which state the promise is currently, initially it will be in `pending` state and later it will become `fulfilled`
 */

/**
 * When above line is executed, `fetch` makes API call and return a `promise` instantly which is in `Pending` state and Javascript doesn't wait to get it `fulfilled`
 * And in next line it console out the `pending promise`.
 * NOTE: chrome browser has some in-consistency, the moment console happens it shows in pending state but if you will expand that it will show fulfilled because chrome updated the log when promise get fulfilled.
 * Once fulfilled data is there in promiseResult and it is inside body in ReadableStream format and there is a way to extract data.
 */

// ## lets explore `then` and see how it is designed so _beautifully_

// When we call the .then() method on a Promise, it returns a new Promise. The new Promise that is returned will be resolved with the value that is return from the .then() callback function.

// > Note:
// >
// > _then always returns a promise_
// >
// > the callback function attached to `then` should return any value or a `Promise`. **this value will be passed to the attached callback of next promise in the chain**
// >
// > when the attached function doesn't return any value explicitly then undefined is passed to the attached callback of the next promise in the chain

log = console.log;
new Promise(function (resolve, reject) {
  resolve(1);
})
  .then(function (result) {
    log(result); // 1
    return result * 2;
    // return Promise.resolve(result * 2);
    // return new Promise((res, rej) => res(result * 2));
    // return new Promise((res, rej) => res(result * 2)).then(function (result) {
    //   log(result); // 2
    //   return result * 2;
    // }); // doing so will result in promise hell
  })
  .then(function (result) {
    log(result); // 2
    return result * 2;
  })
  .then(function (result) {
    log(result); // 4
    return result * 2;
  })
  .then((res) => log(res)); // 8

// so we seen above that how promise is designed to solve the two problems we are having with callback:

// - inversion of control
// - callback hell

// ## hungry !! lets make pizza again but this time using promises

function prepareDough() {
  return new Promise((resolve, reject) => {
    console.log("Preparing dough...");
    setTimeout(() => {
      console.log("Dough is ready!");
      return resolve();
    }, 2000);
  });
}

function addSauce() {
  return new Promise((resolve, reject) => {
    console.log("Adding sauce...");
    setTimeout(() => {
      // return reject("no sauce is available");
      console.log("Sauce has been added!");
      return resolve();
    }, 1000);
  });
}

function addToppings() {
  return new Promise((resolve, reject) => {
    console.log("Adding toppings...");
    setTimeout(() => {
      console.log("Toppings have been added!");
      return resolve();
    }, 1500);
  });
}

function bakePizza() {
  return new Promise((resolve, reject) => {
    console.log("Baking pizza...");
    setTimeout(() => {
      console.log("🍕 is ready!");
      return resolve();
    }, 3000);
  });
}

function makePizza() {
  return new Promise((resolve, reject) => {
    console.log("Making pizza...");
    resolve();
  });
}

function onError(err) {
  console.log("Error: ", err);
}

makePizza()
  .then(prepareDough)
  .then(addSauce)
  .then(addToppings)
  .then(bakePizza)
  .catch(onError);

// # Promises Methods

// 1. [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) :

//    > The then() method of a Promise object takes up to two arguments: callback functions for the fulfilled and rejected cases of the Promise. It immediately returns an equivalent Promise object, allowing you to chain calls to other promise methods.

//    /*
//        SYNTAX:
//         then(onFulfilled)
//               or
//         then(onFulfilled, onRejected)
//    */

   const promise = new Promise((resolve, reject) => {
     resolve("Success!");
   });

   promise.then((value) => {
     console.log(value);
     // Expected output: "Success!"
   });

// 2. [Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

//    > The catch() method of a Promise object schedules a function to be called when the promise is rejected. It immediately returns an equivalent Promise object, allowing you to chain calls to other promise methods. **It is a shortcut for Promise.prototype.then(undefined, onRejected)**.

   /*
      SYNTAX:
        catch(onRejected) // ~ then(undefined, onRejected)
   */

   const promise = new Promise((resolve, reject) => {
     throw new Error("Uh-oh!");
   });

   promise.catch((error) => {
     console.error(error);
   });
   // Expected output: Error: Uh-oh!

// 3. [Promise.prototype.finally()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

//    > The finally() method of a Promise object schedules a function to be called when the promise is settled (either fulfilled or rejected). It immediately returns an equivalent Promise object, allowing you to chain calls to other promise methods.

//    ```javascript
//    /*
//       SYNTAX:
//         catch(onRejected) // ~ then(undefined, onRejected)
//    */

   function checkMail() {
     return new Promise((resolve, reject) => {
       if (Math.random() > 0.5) {
         resolve("Mail has arrived");
       } else {
         reject(new Error("Failed to arrive"));
       }
     });
   }

   checkMail()
     .then((mail) => {
       console.log(mail);
     })
     .catch((err) => {
       console.error(err);
     })
     .finally(() => {
       console.log("Experiment completed");
     });
   // Expected output: Error: Uh-oh!

## static methods

// 1. [Promise.resolve()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

//    > The Promise.resolve() static method "resolves" a given value to a Promise. If the value is a promise, that promise is returned; if the value is a thenable, Promise.resolve() will call the then() method with two callbacks it prepared; otherwise the returned promise will be fulfilled with the value.

//    /*
//        SYNTAX:
//         Promise.resolve(value)
//    */

   function checkMail() {
     return new Promise((resolve, reject) => {
       if (Math.random() > 0.5) {
         resolve("Mail has arrived");
       } else {
         reject(new Error("Failed to arrive"));
       }
     });
   }

   checkMail()
     .then((mail) => {
       console.log(mail);
     })
     .catch((err) => {
       console.error(err);
     })
     .finally(() => {
       console.log("Experiment completed");
     });

// 2. [Promise.reject()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

//    > The Promise.reject() static method returns a Promise object that is rejected with a given reason.

//    /*
//        SYNTAX:
//         Promise.reject(reason)
//    */

   function resolved(result) {
     console.log("Resolved");
   }

   function rejected(result) {
     console.error(result);
   }

   Promise.reject(new Error("fail")).then(resolved, rejected);
   // Expected output: Error: fail

// 3. [Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

//    > The Promise.race() static method takes an iterable of promises as input and returns a single Promise. This returned promise settles with the eventual state of the first promise that settles

//    /*
//        SYNTAX:
//         Promise.race(iterable_of_promises) // iterables : string, arrays ... etc
//    */
//    //
   function onFulfilled(val) {
     console.log("resolved", val);
   }
   function onRejected(val) {
     console.log("rejected", val);
   }

   function onSettled() {
     console.log("settled", result);
   }
   //

   const promise1 = new Promise((resolve, reject) => {
     setTimeout(resolve, 500, "one");
   });

   const promise2 = new Promise((resolve, reject) => {
     setTimeout(resolve, 100, "two");
   });

   const result = Promise.race([promise1, promise2]); // result => promise
   result.then(onFulfilled, onRejected).finally(onSettled); // Both resolve, but promise2 is faster
   // Expected output: "resolved two"

// 4. [Promise.any()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

//    > The Promise.any() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value. It rejects when all of the input's promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.

//    /*
       SYNTAX:
        Promise.any(iterable_of_promises) // iterables : string, arrays ... etc
  //  */
   //
   function onFulfilled(val) {
     console.log("resolved", val);
   }
   function onRejected(val) {
     console.log("rejected", val);
   }

   function onSettled() {
     console.log("settled", result);
   }
   //

   const promise1 = Promise.reject(0);
   const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
   const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

   const result = Promise.any([promise1, promise2, promise3]); // result => promise
   result.then(onFulfilled, onRejected).finally(onSettled);
//    ```

// 5. [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

//    > The Promise.all() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.

//    ```javascript
   /*
       SYNTAX:
        Promise.all(iterable_of_promises) // iterables : string, arrays ... etc
   */
   //
   function onFulfilled(val) {
     console.log("resolved", val);
   }
   function onRejected(val) {
     console.log("rejected", val);
   }

   function onSettled() {
     console.log("settled", result);
   }
   //

   const promise1 = Promise.resolve(3);
   const promise2 = 42;
   const promise3 = new Promise((resolve, reject) => {
     setTimeout(resolve, 100, "foo");
   });
   const result = Promise.all([promise1, promise2, promise3]); // result => promise
   result.then(onFulfilled, onRejected).finally(onSettled);
//    ```

// 6. [Promise.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

//    > The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), with an array of objects that describe the outcome of each promise.

//    ```javascript
   /*
       SYNTAX:
        Promise.all(iterable_of_promises) // iterables : string, arrays ... etc
   */
   //
   function onFulfilled(val) {
     console.log("resolved", val);
   }
   function onRejected(val) {
     console.log("rejected", val);
   }

   function onSettled() {
     console.log("settled", result);
   }
   //

   const promise1 = Promise.resolve(3);
   const promise2 = new Promise((resolve, reject) =>
     setTimeout(reject, 100, "foo")
   );
   const result = Promise.allSettled([promise1, promise2]); // result => promise
   result.then(onFulfilled, onRejected).finally(onSettled);
   // Expected output:
   // "fulfilled"
   // "rejected"
