// Day-11

// ES-6
// genrators
// map set

// 4.5 to 4.8
// constructor function, new keyword, optional chaining, symbole, object to primitive convertion

// started learning about array from mdn
// Array


// _____________________________________________________

// class x{
//     constructor(x,y){
//         this.x = x;
//         this.y = y;
//     }

//     getMethod(){
//         return 'Method';
//     }
// }

// const {getMethod}   = new x();

// console.log(getMethod());

// const x = 0b101010;

// console.log(x.toString(10));

// function *gen(){
//     for(let i=1;i<=2;i++){
//         yield i;
//     }
//     return;
// }

// const get = gen();

// let obj = get.next()
// while(!obj.done){
//     console.log(obj.value);
//     obj = get.next();
// }

// console.log([]);

// const m = new Set();

// m.add(1,2);
// m.add(2,3);

// console.log(m);
// console.log(m.entries());

// let user = {
//     'id': 2,
//     name: "Brijesh",
// };

// let id = Symbol("id");

// user[id] = 1;

// console.log(user[id]);
// console.log(user[id?.description]);

// let randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));



// function bSort(arr) {
//     let length = arr.length;

//     for (let i = 0; i < length; i++) {
//         for (let j = 0; j < length - i; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//             }
//         }
//     }
// }

// bSort(randomArray);

// console.log(randomArray);


// 101000
// 74000/
// 1000 