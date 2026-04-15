// Day-12

// ___________________________________________________

// a = 21;

// b = a * 2;

// console.log(b);

// console['log'](b);

// Scope --|
const util = require('util');

class customMap {
    size;
    #obj;
    constructor() {
        this.#obj = [];
        this.size = 0;
    }

    set(key, value) {
        if (!(this.has(key))) {
            this.#obj.push([key, value]);
        } else {
            for (let i of this.#obj) {
                if (i[0] === key || (Number.isNaN(i[0]) && Number.isNaN(key))) {
                    i[1] = value;
                }
            }
        }
        this.#updateSize();
    }

    get(key) {
        for (let i of this.#obj) {
            if (i[0] === key || (Number.isNaN(i[0]) && Number.isNaN(key))) {
                return i[1];
            }
        }
        return undefined;
    }

    entries() {
        const data = this.#obj;
        let i = 0;
        return {
            next() {
                if (i < data.length) {
                    return { value: data[i], done: false };
                }
                return { value: undefined, done: true };
            },
            [Symbol.iterator]() {
                return this;
            },
            [util.inspect.custom]() {
                let str = "{";
                for (let i of data) {

                    let key = typeof i[0] === "string" ? `\'${i[0]}\'` : Array.isArray(i[0]) === true ? `[${i[0].join(", ")}]` : typeof i[0] === "object" ? JSON.stringify(i[0]) : Number.isNaN(i[0]) ? "NaN" : `${i[0].toString()}`;

                    let value = typeof i[1] === "string" ? `\'${i[1]}\'` : Array.isArray(i[1]) === true ? `[${i[1].join(", ")}]` : typeof i[1] === "object" ? JSON.stringify(i[1]) : Number.isNaN(i[1]) ? "NaN" : `${i[1].toString()}`;

                    str += " [ " + key + ", " + value + " ],";
                }
                str += "\b }";
                return "[customMap Entries] " + str;
            }
        };
    }

    has(key) {
        for (let i of this.#obj) {
            if (i[0] === key) {
                // console.log(true);
                return true;
            }
        }
        for (let i of this.keys()) {
            if (Number.isNaN(i) && Number.isNaN(key)) {
                return true;
            }
        }
        // console.log(false);
        return false;
    }

    keys() {
        const data = this.#obj;
        let i = 0;
        return {
            next() {
                if (i < data.length) {
                    return { value: data[i++][0], done: false };
                }
                return { value: undefined, done: true };
            },
            [Symbol.iterator]() {
                return this;
            },
            [util.inspect.custom]() {
                let str = "{ ";
                for (let i of data) {

                    let key = typeof i[0] === "string" ? `\'${i[0]}\'` : Array.isArray(i[0]) === true ? `[${i[0].join(", ")}]` : typeof i[0] === "object" ? JSON.stringify(i[0]) : Number.isNaN(i[0]) ? "NaN" : `${i[0].toString()}`;

                    str += key + ", ";
                }
                str += "\b\b }";
                return "[customMap Iterator] " + str;
            }
        };
    }

    values() {
        const data = this.#obj;
        let i = 0;
        return {
            next() {
                if (i < data.length) {
                    return { value: data[i++][1], done: false };
                }
                return { value: undefined, done: true };
            },
            [Symbol.iterator]() {
                return this;
            },
            [util.inspect.custom]() {
                let str = "{ ";
                for (let i of data) {

                    let value = typeof i[1] === "string" ? `\'${i[1]}\'` : Array.isArray(i[1]) === true ? `[${i[1].join(", ")}]` : typeof i[1] === "object" ? JSON.stringify(i[1]) : Number.isNaN(i[1]) ? "NaN" : `${i[1].toString()}`;

                    str += value + ", ";
                }
                str += "\b\b }";
                return "[customMap Iterator] " + str;
            }
        };
    }

    delete(key) {
        let tempArray = [];
        for (let i of this.#obj) {
            if (i[0] !== key && !(Number.isNaN(i[0]) && Number.isNaN(key))) {
                tempArray.push(i);
            }
        }
        this.#obj = tempArray;
        this.#updateSize();
    }

    clear() {
        this.#obj = [];
        this.#updateSize();
    }

    toString() {
        return "[object customMap]";
    }

    [Symbol.iterator]() {
        return this.entries();
    }

    [util.inspect.custom]() {
        let str = "";
        for (let i of this.#obj) {

            let key = typeof i[0] === "string" ? `\'${i[0]}\'` : Array.isArray(i[0]) === true ? `[${i[0].join(", ")}]` : typeof i[0] === "object" ? JSON.stringify(i[0]) : Number.isNaN(i[0]) ? "NaN" : `${i[0].toString()}`;

            let value = typeof i[1] === "string" ? `\'${i[1]}\'` : Array.isArray(i[1]) === true ? `[${i[1].join(", ")}]` : typeof i[1] === "object" ? JSON.stringify(i[1]) : Number.isNaN(i[1]) ? "NaN" : `${i[1].toString()}`;

            str += key + " => " + value;
            str += ",\n\t\b\b\b\b";

        }
        return `customMap(${this.size}) {\n\t\b\b\b\b${str}\b\b\b\b}`;
    }

    #updateSize() {
        let count = 0;
        for (let i of this.#obj) {
            count++;
        }
        this.size = count;
    }

}


const myMap = new customMap();

const o1 = { "a": 1 };
const o2 = { "a": 1 };
const o3 = Symbol('o3');
const o4 = [1, 2, 3];

myMap.set(1, 2);
myMap.set(1, 3);
myMap.set("1", "string 1");
myMap.set(2, 3);
myMap.set(o1, 4);
myMap.set(o1, 5);
myMap.set(o2, { a: 1 });
myMap.set(o3, 'o3');
myMap.set(o3, 'o3');
myMap.set(NaN, 'not a number');
myMap.set(NaN, 'not number');
myMap.set(o4, ["a", "b", "c"]);

// console.log(myMap.get(1));
// console.log(myMap.get("1"));
// console.log(myMap.get(2));
// console.log(myMap.get(o1));
// console.log(myMap.get(o2));
// console.log(myMap.get(NaN));
// console.log(myMap.get(o4));
console.log("_____________________________________");


console.log(myMap.entries());
console.log("_____________________________________");

console.log(myMap.keys());
console.log(myMap.values());
myMap.delete(o1);
myMap.delete(NaN);
// console.log(myMap.keys());
// console.log(myMap.has(1));
// console.log(myMap.has(NaN));
console.log("_____________________________________");

console.log(myMap);
console.log(myMap.toString());
console.log("Size :", myMap.size);
console.log("_____________________________________");

for (let i of myMap.values()) {
    console.log(i);
}