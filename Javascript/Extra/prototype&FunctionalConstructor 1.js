// 'use strict';

// function assign(target, ...source) {
//   /*
//          gn|    def    : It copies all enumerable own properties from one or more source objects to a target object.
//          gn|    returns: It returns the modified target object
//     */
//   const s1 = { a: 1, b: 20 };
//   const s2 = { b: 2, c: 3 };

//   const t = {};

//   const ref_t = Object.assign(t, s1, s2);

//   console.log(t);
//   console.log(ref_t);

//   // - can we create new object with Object.create() ?

//   // use-case :> shallow copy, merging
// }
// // assign();

// function intro2Proto() {
//   //  gn|     def: Prototypes are the mechanism by which JavaScript objects inherit features from one another
//   /*
//     *       ----------------------------------------------------- getting/setting PROTOTYPES ----------------------------------------------------------
//     rd|     METHOD : 1 (deprecated)
//                 __proto__
//     gn|     METHOD : 2 (recommended)
//                 Object.getPrototypeOf(<obj>)
//                 Object.setPrototypeOf(<obj>, <proto obj>)
//     */

//   const rohan = {
//     name: "rohan",
//     city: "Jamtara",
//     greet() {
//       console.log(`Hi. I am ${this.name}`);
//     },
//   };

//   rohan.__proto__.role1 = () => "nodeJs dev"; // ! deprecated
//   Object.setPrototypeOf(rohan, { role2: () => 'denoJs dev' });

//   console.log(Object.getPrototypeOf(rohan.__proto__));

//   // ? add a new property in prototype of rohan {}.

//   console.log(rohan.role1());
//   console.log(rohan.role2());
// }
// // intro2Proto()

// function create(proto) {
//   /*
//          gn|    def    : It creates a new object, and link the passed object with its prototype.
//          gn|    returns: It returns the newly created object
//     */
//   const p = { a: 1, b: 2 };

//   const o = Object.create(p); // - Object.setPrototypeOf({}, { a: 1, b: 2 });

//   // console.log(o);
//   console.log(Object.getPrototypeOf(o).a);
//   console.log(o.__proto__.a);
// }
// // create();

// function withoutConstructorFunction() {
//   const rohan = {
//     name: "rohan",
//     city: "jamtara",
//     age: 60,
//     speak: function () {
//       return `hi, I am ${this.name}`;
//     },
//   };

//   const sohan = {
//     name: "sohan",
//     city: "mumbai",
//     age: 10,
//     speak: function () {
//       return `hi, I am ${this.name}`;
//     },
//   };

//   console.log(rohan.speak());
//   console.log(sohan.speak());
// }
// // withoutConstructorFunction();

// function withConstructorFunction() {
//   function Person(name, age, city) {
//     this.name = name;
//     this.age = age;
//     this.city = city;
//     this.speak = function () {
//       return `hi, I am ${this.name}`;
//     };
//   }

//   const rohan = new Person("rohan", 60, "Jamtara");
//   const sohan = new Person("sohan", 10, "Mumbai");

//   console.log(rohan.speak());
//   console.log(sohan.speak());
// }
// // withConstructorFunction();

// function _new() {
//   /*
//     *     ---------------------------------------------- Steps Involved while Invoking Function with 'new' ----------------------------------------------

//     gn|   There are essentially four steps involved while invoking a function with new
//              1. An empty brand new object is created

//              2. It links the prototype of the constructor function(Person) to the newly created object,
//                 thus ensuring that this object can inherit all properties and methods of the constructor function

//              3. The constructor function is called on this newly created object just like method invocation,
//                 thus, inside the constructor function, this gets the value of the newly created object used in the call.

//              4. Finally, return the newly created object iff any object is not explicitly returned;
//     */
//   function Person(name, age, city) {
//     this.name = name;
//     this.age = age;
//     this.city = city;
//   }
//   Person.prototype.speak = function () {
//     return `hi, I am ${this.name}`;
//   };

//   var rohan = new Person("rohan", 60, "Jmt");

//   // console.log(Person.prototype); // { speak: [Function (anonymous)] }

//   //
//   var o = {}; // create empty obj
//   // console.log(o.__proto__); // [Object: null prototype] {}
//   o.__proto__ = Person.prototype; // linking
//   o.constructor("rohan", 60, "Jmt"); // invoking constructor function(Person) // this -> o{}
//   //

//   console.log(rohan, rohan.speak());
//   console.log(o, o.speak());
// }
// // _new();

// // -
// function withConstructorFunction_theEfficientWay() {
//   function Person(name, age, city) {
//     this.name = name;
//     this.age = age;
//     this.city = city;
//   }
//   Person.prototype.speak = function () {
//     return `hi, I am ${this.name}`;
//   };

//   const rohan = new Person("rohan", 60, "Jamtara");
//   const sohan = new Person("sohan", 10, "Mumbai");

//   console.log(rohan.speak());
//   console.log(sohan.speak());
// }
// withConstructorFunction_theEfficientWay();

// ---------------------------------------------------------------------------------------------------------------------------------

/*
// multilevel inheritance
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return `My name is ${this.name}`;
};

const p1 = new Person("vivek");

function Student(name, Id) {
  Person.call(this, name);
  this.Id = Id;
}

// define before "Student.prototype.getID" because it replace Student.prototype to Person.prototype
// if we  define after then it removes the getID prototype.
Object.setPrototypeOf(Student.prototype, Person.prototype); // if we use this then there is no need to set "name" like below

Student.prototype.getID = function () {
  return `My name is ${this.Id}`;
};

const s1 = new Student("Jemish", 1);


// Student.prototype = Object.create(Person.prototype); // Establish the prototype chain to inherit methods
// Repair the constructor reference
// Student.prototype.constructor = Student; // Student na constructor nu "name Person" no ave etle Ene set karvanu

// Student -> Person

console.log(s1.getName());

//

function GamePlayer(name, Id, game) {
  Student.call(this, name, Id);
  this.game = game;
}

GamePlayer.prototype = Object.create(Student.prototype);
GamePlayer.prototype.constructor = GamePlayer;

GamePlayer.prototype.getGame = function () {
  return `Game name is ${this.game}`;
};

const g1 = new GamePlayer("Nishil", 2, "coc");

console.log(g1);

// GamePlayer -> Student -> Person
*/

/*
// https://www.tutorialsteacher.com/Content/images/oo-js/prototype-2.png
function Student() {
  this.name = "John";
  this.gender = "M";
}

var s1 = new Student();

console.log(Student.prototype); // {} (constructor: ƒ Student())
console.log(s1.prototype); // undefined
console.log(s1.__proto__); // {} (constructor: ƒ Student())

console.log(typeof Student.prototype); // object
console.log(typeof s1.__proto__); // object

console.log(Student.prototype === s1.__proto__); // true
*/

/*
// If you change function's prototype then only new objects will be linked to changed prototype.
// All other existing objects will still link to old prototype of function

// D:\Yudiz\javascript_basic_code\prototype.png

function Student() {
  this.name = "John";
  this.gender = "M";
}

Student.prototype.age = 15; // add

var s1 = new Student();
console.log("s1.age = " + s1.age); // 15

var s2 = new Student();
console.log("s2.age = " + s2.age); // 15

Student.prototype = { age: 20 }; // reassign

var s3 = new Student();
console.log("s3.age = " + s3.age); // 20

console.log("s1.age = " + s1.age); // 15
console.log("s2.age = " + s2.age); // 15
*/

/*
Objects shape
https://mathiasbynens.be/notes/shapes-ics
https://mathiasbynens.be/notes/prototypes
*/

