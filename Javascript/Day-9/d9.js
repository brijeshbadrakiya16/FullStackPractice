// Day-9

// 5.4 Arrays
// 5.5 Array methods
// 5.6 iterables
// 5.7 Map and set
// 5.8 WeakMap and WeakSet
// 5.9 Object.keys, values, entries
// 5.10 Destructuring assignment
// 5.11 Date & Time
// 5.12 JSON methods



// ______________________________________________

// let arr1 = new Array();
// let arr2 = [];

// console.log(typeof arr1, typeof arr2);

// let fruits = ["apple","orange","plum"];

// fruits[2] = 'pear';
// fruits[3] = 'lemon';

// for(let i=0;i<fruits.length;i++){
//     console.log(fruits[i]);
// }

// console.log(fruits[-1]);  //undefined
// console.log(fruits.at(-1)); //lemon
// console.log(fruits.at(-5)); //undefined

// console.log(fruits.pop());
// console.log(fruits);
// console.log(fruits.push('lemon'));
// console.log(fruits);
// console.log(fruits.shift());
// console.log(fruits.unshift());
// console.log(fruits);

// let fruits = [];

// fruits[99999] = 5;
// fruits.age = 25;

// console.log(fruits.length);
// console.log(fruits);

// fruits.forEach((value,index)=>{
//     console.log(value,index);
// })

// for(let i in fruits){
//     console.log(i);
// }

function getMaxSubSum(arr) {
    const result = [];
    calculateSum(arr, result, arr.length);
    return result.reduce((accu, curr) => {
        if (curr > accu) {
            accu = curr;
        }
        return accu;

    }, 0);
}

function calculateSum(arr, result, window) {
    if (window == -1) {
        return;
    }

    for (let i = 0; i < arr.length; i++) {
        if (i + window > arr.length) {
            break;
        }

        // let sum = arr.slice(i, i + window).reduce((accu, curr) => {
        //     accu += curr;
        //     return accu;
        // }, 0);

        let sum = 0;
        for (let j = i; j < i + window; j++) {
            sum += arr[j];
        }
        result.push(sum);
    }
    window = window - 1;
    calculateSum(arr, result, window);
}

console.log(getMaxSubSum([-1, 2, 3, -9]));  //5
console.log(getMaxSubSum([2, -1, 2, 3, -9]));  //6
console.log(getMaxSubSum([-1, 2, 3, -9, 11]));  //11
console.log(getMaxSubSum([-2, -1, 1, 2])); //3
console.log(getMaxSubSum([100, -9, 2, -3, 5])); //100
console.log(getMaxSubSum([1, 2, 3])); //6

console.log(getMaxSubSum([-1, -2, -3])); //0

//__________________________________________________

// array methods

// arr.splice(start,totalcount,[new elements without []]);
// let arr = ["I", "study", "JavaScript", "right", "now"];

// arr.splice(1, 1, "learn"); //also works on negative index

// arr.slice(-3); //works as give copy from -3 to end
// or arr.slice(1,3);
// console.log(arr);

// console.log(arr.concat([3, 4]));

// arr.indexOf(item,from); if found then returns index else 0
// arr.includes(item,from); if found then returns true else false

// includes can handle NaN correctly but 

// let users = [
//     { id: 2, name: "pete" },
//     { id: 3, name: "mary" },
//     { id: 1, name: "john" },
// ]

// let user = users.find(item => item.id == 2);

// console.log(users.sort((a, b) => a.id - b.id));
// console.log(users.sort((a, b) => b.id - a.id));

// let map = new Map();

// map.set('1', 'str1');
// map.set(1, 'num1');
// map.set(true, 'bool1');

// console.log(map.get(1));
// console.log(map.get("1"));

// console.log(map.size);
// console.log(map.has(false));

// map.forEach((value, key) => {
//     console.log(value, key);
// });

let date = new Date("2026-03-12");

console.log(date);