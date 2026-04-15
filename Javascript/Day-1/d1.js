// var x = 2;

// function square(num){
//     var ans = num * num;
//     console.log(ans);
//     return ans;
// }
// var s1 = square(x);
// var s2 = square(5); 
// ______________________________________________
// function getname(){
//     console.log("Brijesh");
// }

// console.log(getname);    //if called using () then after execution undefined and if not then just [Function: getname]
// _______________________________________________
// console.log(getname); // undefined

// var getname = () => {
//     console.log("Brijesh");
// }
// _______________________________________________

// var x = 1;

// function a(){
//     var x = 10;
//     console.log(x);
//     console.log("Global :",globalThis.x);
// }
// a();

// ________________________________________________

// var x;
// console.log(typeof(x));
// x = 10;
// console.log(typeof(x));
// x = "Brijesh";
// console.log(typeof(x));
// x = false;
// console.log(typeof(x));

// ________________________________________________

// Hoisting (var and function declaration are hoisted but not let and const, meaning they are moved to the top of their scope and initialized with undefined, as you can access them before their declaration without getting a ReferenceError, but they will return undefined)

// Scope Chain and Lexical Environment (Lexical environment is like the function's reference to its parent scope)

// _________________________________________________

// console.log(x);  // ReferenceError: Cannot access 'x' before initialization
// let x = 10;

// Temporal Dead Zone is the time between the initalization to assigning a value to let.

// let vs const vs var

// block and scope

{
    // block also called
    // compound statement
    // where js expect s a single statement but we have to use multiple statements then we create a block

    //here declared var you can access it outside the block 
    // but not valid for let and const as it throws reference error
}

// __________________________________________________

// Shadowing (when a variable declared in the inner scope has the same name as a variable declared in the outer scope, then the variable in the inner scope is said to shadow the variable in the outer scope)

// var a = 100;
// let b = 200;
// {
//     var a = 10;
//     let b = 20;
//     const c = 30;
//     console.log(a); //10
//     console.log(b); //20
//     console.log(c); //30
// }
// console.log(a); //10 because shadowing
// console.log(b); //200 because of block scope of let

// const c = 10;
// {
//     const c = 20;
//     console.log(c); //20
// }
// console.log(c); //10 because of block scope of const

// let a = 10;
// {
//     var a = 20;
// }  //this is called illegal shadowing because var is function scoped and let is block scoped, so it throws a SyntaxError: Identifier 'a' has already been declared

// const a = 10;
// function test(){
//     var a = 20; //you can do this shadowing because var is function scoped and const is block scoped, so it does not throw any error
// 