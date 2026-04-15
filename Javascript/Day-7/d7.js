// Day-7
// Shallow copy & Deep Copy

// Completed the given video of async and promises

// 4.1 Objects
// 4.2 Object References and Copying

// Objects.assign({},objects), merges all the objects property into one target {} as without reference but not work for nested

// structuredClone(Object obj); returns a deep cloned object
// it throws error(DOM Exception) when any property have function value

// 5.1


// _______________________________________________

// const newPromise = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve("The succeeded value.")
//     },100)
// }).then((data)=>{
//     console.log(data);
// })

// console.log(newPromise);

// const prom = async () => {
//     return  new Promise((resolve, reject) => {
//         setTimeout(() => resolve("Success"), 2000);
//     })
// }
// async function asyncFunction() {
//     const res = await prom();
//     console.log(res);
// }
// asyncFunction();

// (()=>{
//     const res = Promise.resolve('ok');
//     res.then(data => console.log(data));
//     console.log("Listener 1");
// })();

// _______________________________________________
// let fruit = "apple";

// let bag = {
//     [fruit]:5,
// }
// console.log(bag[fruit]);

// function makeUser(name, age){
//     return {
//         "name":name,
//         "age":age,
//         "test":undefined,
//     }
// }

// let user = makeUser("John",30);
// // console.log(user.test);

// // console.log("test" in user); //false if not

// let obj = {
// };

// const multiplyNumeric = (obj) => {
//     for(let key in obj){
//         if(typeof (obj[key])=="number"){
//             obj[key] *= 2;
//         }
//     }
// }
// obj.width = 200;
// obj.higth = 300;
// obj.title = "test";

// multiplyNumeric(obj);

// console.log(obj);

// let obj2 = Object.assign({},user,obj);

// let obj3 = {...user};

// console.log(obj2);
// console.log(obj3);

// user.sizes = {
//     height : 167,
//     width : 50
// }
// console.log(user);

// // user.funct = function(){};
// let obj4 = structuredClone(user);
// user.sizes.height = 165;
// console.log(user,obj4);


// function marry(man, woman) {
//   woman.husband = man;
//   man.wife = woman;

//   return {
//     father: man,
//     mother: woman
//   }
// }

// let family = marry({
//   name: "John"
// }, {
//   name: "Ann"
// });

// console.log(family);

// const a = {
//     "name":"ksjdh",
//     "age":20,
//     "sizes":{
//         width:200,
//         height:300    
//     }
// };

// const b = structuredClone(a);
// b.sizes.width = 400;
// b.name = "s";
// console.log(a);

// let num = 255;

// console.log(num.toString());