// Day-17



// ________________________________________________________________

class customPromise {
    static async race(values) {
        if (Array.isArray(values) && (values.length === 0)) {
            return new Promise((resolve, reject) => {
            });
        } else if (typeof values === "string") {
            values = values.split("");
        } else if (!Array.isArray(values)) {
            return Promise.reject(new TypeError(`${typeof values[0]} is not iterable`));
        }

        return new Promise((resolve, reject) => {
            for (const p of values) {
                Promise.resolve(p).then(resolve).catch(reject);
            }
        })
    }

    static async all(values) {
        if (Array.isArray(values) && (values.length === 0)) {
            return Promise.resolve([]);
        } else if (typeof values === "string") {
            values = values.split("");
        } else if (!Array.isArray(values)) {
            return Promise.reject(new TypeError(`${typeof values[0]} is not iterable`));
        }
        // const promises = values.map(p => );
        let arr = new Array();
        let flag = true;
        let error;
        let promise;
        for (const p of values) {
            await Promise.resolve(p)
                .then((data) => {
                    arr.push(data);
                })
                .catch((err) => {
                    flag = false;
                    error = err;
                });
        }
        if (flag) {
            promise = new Promise((resolve) => {
                resolve(arr);
            })
        }
        else {
            promise = new Promise((resolve, reject) => {
                reject(error);
            })
        }
        return promise;
    }

    static async allSettled(values) {
        if (Array.isArray(values) && (values.length === 0)) {
            console.log(Array.isArray(values[0]) && (values.length === 1));
            return Promise.resolve([]);
        } else if (typeof values === "string") {
            values = values.split("");
        } else if (!Array.isArray(values)) {
            return Promise.reject(new TypeError(`${typeof values[0]} is not iterable`));
        }

        let arr = new Array();
        let promise;
        for (const p of values) {
            await Promise.resolve(p)
                .then((data) => {
                    arr.push({ status: 'fulfilled', value: data });
                })
                .catch((err) => {
                    arr.push({ status: 'rejected', reason: err });
                });
        }
        promise = new Promise((resolve) => {
            resolve(arr);
        })
        return promise;
    }

    static async any(values) {
        if (Array.isArray(values) && (values.length === 0)) {
            return new Promise((resolve, reject) => {
                const errors = new AggregateError([], "All customPromises were rejected");
                errors.stack = "AggregateError: All customPromises were rejected";
                reject(errors);
            })
        } else if (typeof values === "string") {
            values = values.split("");
        } else if (!Array.isArray(values)) {
            return Promise.reject(new TypeError(`${typeof values[0]} is not iterable`));
        }

        let arr = new Array();
        let executer = 0;

        return new Promise((resolve, reject) => {
            for (let p in values) {
                Promise.resolve(values[p]).then(resolve).catch((err) => {
                    arr.push(err);
                    ++executer;
                    console.log(executer);
                    if (executer === values.length) {
                        const errors = new AggregateError(arr, "All customPromises were rejected");
                        errors.stack = "AggregateError: All customPromises were rejected";
                        reject(errors);
                    }
                })
            }
        });
    }
}

// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('P1 resolved.');
//         reject('P1 reject.');
//     }, 2000);
// });
// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('P2 resolved.');
//         // reject('P2 rejected.');
//     }, 500);
// });


// ()
// ([])
// ("sdfh")
// ("dgsdg","fdgdf")
// (1,"Sdsffdf","SDfsf")
// (any obj,...) 
// ()
// (async () => {
// })()

// const obj = customPromise.any([p1, p2]);
// console.log(obj);

// console.log(Promise.any([1, 2]));
// console.log(Promise.resolve([])); 

console.log([1, NaN, 3].findIndex());