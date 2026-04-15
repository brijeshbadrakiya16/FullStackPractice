// Day-13

// hoisting
// IIFEs (Immediately invoked function expression)
// Closure



// _______________________________________________________

// console.log(typeof NaN);


// var a = 3;

// function a(){
//     return 3;
// }
// console.log(a);

// const foo = {
//     a:42,
// }

// const bar = Object.create(foo);

// console.log(bar===foo);

// const m = new Map();

// m.set(1,2);
// m.set(2,4);
// m.set(3,6);

// console.log(m.keys());
// console.log(m.values());
// console.log(m.entries());

function hello() {
    console.log("hello");
}

// named exports

// export {hello};
// exports.hello = hello;
// module.exports.hello = hello;
// export function hello(){
//     // ...
// };

// not named exports

// export default hello;  //can export any one single thing and can import it with any name