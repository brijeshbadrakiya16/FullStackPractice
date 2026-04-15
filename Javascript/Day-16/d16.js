// Day-16
// Revised Generators and Object property related topics like property_descripter, enumerable, writtable, configurable, and static object methods like create assign, and learned about proxy and

// proxy is something like middle layer between the set and get operation to targeted object






//_________________________________

// const user = {name:"brijesh",age:19};

// const handler = {
//     get(target,property){
//         console.log(`Getting property : ${property}`)
//         return property in target ? target[property] : "Not found";
//     },
//     set(target,property,value){
//         if(property === "age" && typeof value !== "number"){
//             throw new TypeError("Age must be a number.");
//         }
//         target[property] = value;
//         console.log(`Setting ${property} to ${value}`);
//         return true;
//     }
// }

// const proxyUser = new Proxy(user,handler);

// console.log(proxyUser.name);
// try{
//     proxyUser.age = "12";
// }catch(err){
//     console.log(err.message);
// }
// proxyUser.age = 20;
// console.log(proxyUser.city);
// delete proxyUser.age;
// console.log(user);
// console.log(proxyUser);