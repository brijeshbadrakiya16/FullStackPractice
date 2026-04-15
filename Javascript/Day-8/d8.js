// Day-8

// 5.2 Numbers
// 5.3 String

// objects basics and it's method and given a test

// _________________________________________________

// Numbers

// let billion = 1_000_000_000;
// underscore will be ignored
// let billion = 1e9;

// hex binary and octal
// console.log(0xff);
// console.log(0o77);
// console.log(0b11);

// Number.toString(2);
// let num = 255;
// console.log(num.toString(2)); //binary
// console.log(num.toString(8)); //octal
// console.log(num.toString(36)); //hexa-deimal
// valid for 2-36
// otherwise throws an RangeError error

// Math.floor
// Math.ceil
// Meth.round // for middle case ceils the number
// Math.trunc //not supported in InternetExplorer // it removes floating point number

// Number.toFixed(number);
// similar to Math.round
// let num = 123.23;
// console.log(num.toFixed(1)); //123.2
// console.log(num.toFixed(12));
// it returns the string

// isFinite and isNaN
// console.log(isNaN(NaN)); //true
// console.log(isNaN("str")); //true
// console.log(NaN === NaN); //false
// console.log(isFinite("15")); //true
// console.log(isFinite("str")); //false because NaN
// console.log(isFinite(Infinity)); //false

// Number.isNaN();
// Number.isFinite();
// both are very strict than normal, as they don't convert into number
// console.log(Number.isNaN("str")); //false bcz string
// console.log(Number.isFinite("123")); //false bcz string

// Object.is(num,num);
// Object.is(NaN,NaN); //true
// Object.is(0,-0); //false

// parseInt();
// parseFloat();
// + and Number() are strict
// parseInt("100px"); //100
// parseFlaat("12.5em"); //12.5
// parseInt('0xff', 16); //255
// works without 0x also

// Math.random(); //returns random number between 0 to 1
// Math.max(num,num...);
// Math.min(num,num...);
// console.log(Math.max([1,2,3,5])); returns NaN for string and array or object
// Math.pow(2,10); 2**10


// String
// let single = 'single-quoted';
// let double = "double-quoted";
// let backticks = `backticks`;

// \n -> new line
// \r combination of \r\n
// \', \", \` for quotes
// \\  for backslash
// \t tab
// \b, \f, \v backspace, formfeed, vertical tab

// string.length

// string[index] or string.at(index);
// returns character in string
// console.log("sdh"[1]);
// at() and str[] returns undefined if not found.
// negatives are work for at() but not for str[]

// for(let char of "hello"){
//     console.log(char);
// }

//Strings are immutabel

//toUpperCase();
//toLowerCase();

// str.indexOf(target) // finds the target in str if found return the starting index and if not then return -1
// str.indexOf(target,index); search target after that index
// str.lastIndexOf(substr,position);

// str.includes(target); // true if target in str
// str.includes(target,position);
// str.startsWith(target);
// str.endsWith(target);

// str.slice(0,5); returns substring without str[5]
// str.slice(2); 2 to end
// negatives works

// str.substring(start,end) // returns not including end
// alsomost same as slice but if start>end then swaps it
// console.log("1234567".slice(5,3)); //"" empty
// console.log("1234567".substring(5,3)); //45
// console.log("1234567".substring(-4,-1)); //not supported

// string.codePointAt(index);
// console.log("Z".codePointAt(0)); //90
// console.log("Z".codePointAt(-1)); //undefined

//String.fromCodePoint(number);
// console.log(String.fromCodePoint(90)); // Z

// ____________________________________________

// this.table = "window-table";

// let yudizTable = {
//     table : "yudiz-table",
// }

// function thisShow(param){
//     console.log(this.table,param);
// }
// thisShow("Anything"); //undefined
// thisShow.call(this,"anything"); //passed global object so yudiz
// thisShow.call(yudizTable,"anyThing");

// this.table = "window-table";

// const cleanTable = function(soap){
//     const cleanTable = (_soap) => {
//         console.log(`Cleaning ${this.table} with ${_soap}`);
//     }
//     // cleanTable.bind(this)(soap);
//     // cleanTable.call(this,soap);
//     cleanTable(soap);
// }
// cleanTable.call(this,"Some soap");

// (function() {
//     console.log(this.table);
// }).call(this);

// function intro() {
//     const o1 = {
//         fname: 'brijesh',
//         lname: 'badrakiya',
//         set age(age) {
//             this.age = age;
//         },
//         get age() {
//             return this.age;
//         }
//     }
//     o1.dept = 'web';

//     const docs_for_one_field = Object.getOwnPropertyDescriptor(o1, 'fname');
//     const docs_for_all_field = Object.getOwnPropertyDescriptors(o1);

//     console.log(docs_for_one_field, docs_for_all_field);

// }
// intro();

// const o1 = {
//     distro : {
//         arch : {},
//         debian : {}
//     }
// }

// Object.defineProperty(o1,'fs',{value:['ext4','btrfs'],enumerable:false});

// console.log(o1); // we can't see 'fs' when it's enumerable is false, we can just access it;
// for(let i in o1){
//     console.log(i);
// }
// console.log(Object.keys(o1));
// console.log(Object.values(o1));
// console.log(Object.entries(o1));

const o1 = { a: 1, b: 2 };
const o2 = { a: 1, b: 2 };
const o3 = { a: 1, b: 2 };
const o4 = { a: 1, b: 2 };

Object.preventExtensions(o1); //after this we can not add any property
Object.seal(o2); // prevents adding and deleting property
Object.freeze(o3); // prevents both add and delete with also preventing changes in existing property

o1.c = 1;
o2.c = 2;
delete o2.b
console.log(o1);
console.log(o2);