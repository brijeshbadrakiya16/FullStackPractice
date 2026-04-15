// Day-10

// Asynchronous programming
// async vs sync
// callbacks

// 2_prototype from <= this_oops 2
// object prototypes, prototype chain

// 4 inheritanse
// constructor function inheritance

// class , static , private properties 
// single , multilevel inheritance.

// ___________________________________________________

// console.log("start");


// const prom = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve("Success");
//     },3000);
// });
// prom.then((msg)=>{
//     console.log(msg);
// });

// setTimeout(()=>{
//     console.log("Hello");
// },2999);

// console.log("end");

// console.log(x);

// function x(){

// }
// console.log(x);

// var x = 10;

// console.log(x);

// console.log("Start");

// async function fun1(callback) {
//     console.log("fun1");
//     setTimeout(() => {
//         console.log("Async Callback");
//     });
//     callback();
// }

// function fun2() {
//     console.log("fun2");
// }

// fun1(fun2);

// console.log(`end`);

// function foo(){
//     console.log(a);
// }

// function bar(){
//     var a = 2;

// }

// bar();

// const brijesh = {
//     name: "brijesh",
//     greet() {
//         console.log(`Hi , I am ${this.name.slice(0, 1).toUpperCase + this.name.slice(1)}`);
//     }
// }

// brijesh.role = () => "user";
// brijesh.__proto__.role1 = () => "user"; //in console.log we don't see it, we can just access it by that key
// Object.setPrototypeOf(brijesh, { role2: () => "user" })

// console.log(brijesh.role());
// console.log(brijesh.role1());
// console.log(brijesh.role2());

// console.log(Object.getPrototypeOf(brijesh));

// function Person(name, age, city){
//     this.name = name;
//     this.age = age;
//     this.city = city;
//     this.speak = () => {
//         return `Hi , I am ${this.name.slice(0, 1).toUpperCase() + this.name.slice(1)}.`;
//     }
// }

// const b1 = new Person("br1",20,'a');
// const b2 = new Person("br2",20,'b');

// console.log(b1.speak());
// console.log(b2.speak());

// const p = { a: 1, b: 2 };

// const o = Object.create(p);

// console.log(o); //{}
// console.log(o.a); //1
// console.log(o.b); //2
// console.log(o.__proto__); //{a:1,b:2}

// function shape(h,w){
//     this.h = h;
//     this.w = w;
// }
// shape.prototype.getHeight = function () {
//     return this.h;
// }
// shape.prototype.getWidth = function () {
//     return this.w;
// }

// function rectangle(h,w){
//     shape.call(this,h,w);
//     Object.setPrototypeOf(this,shape.prototype);
// }

// const rec = new rectangle(10,12);

// // Object.setPrototypeOf(rec,shape.prototype);

// console.log(rec);
// console.log(rec.h);
// console.log(rec.w);
// console.log(rec.getHeight());
// console.log(rec.getWidth());

// class Person{
//     static isHuman = true;
    
//     constructor(name,age,city){
//         this.name = name;
//         this.age = age;
//         this.city = city;
//     }

//     introduce(){
//         return `Hi, I am ${this.name}`;
//     }

//     isAnimal(){
//         return !Person.isHuman;
//     }
// }

// const brijesh = new Person('brijesh',20,'Ahm');

// console.log(brijesh.introduce());

// console.log(brijesh.isAnimal());

// console.log();


// class Rectangle{
//     #height = 2;
//     #width ;
//     constructor(h,w) {
//         this.#height = h;
//         this.#width = w;
//     }

//     #getArea(){
//         return this.#height*this.#width;
//     }

//     meta(){
//         return `Height: ${this.#height} Width: ${this.#width} Area : ${this.#getArea()}`;
//     }
// }

// const r1 = new Rectangle(10,12);

// console.log(r1.meta());