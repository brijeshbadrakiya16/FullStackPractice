// // Day-15



// // ____________________________________________________
// const { type } = require("os");
// const util = require("util");
// class customPromise {

//     static #queue = [];

//     static #flag = false;

//     #result = {
//         "customPromiseState": "pending",
//     };

//     #resolve = (argu) => {
//         if (this.#result.customPromiseState === "pending") {
//             this.#result["customPromiseState"] = "fulfilled";
//             this.#result["customPromiseResult"] = argu;
//             this.customEventLoop();
//             return argu;
//         }
//     }

//     // static customResolve(data) {
//     //     const result = new customPromise((resolve, reject) => {
//     //         resolve(data);
//     //     });
//     //     // console.log("custom Resolve",result);
//     //     return result;
//     // }

//     #reject = (err) => {
//         if (this.#result.customPromiseState === "pending") {
//             this.#result["customPromiseState"] = "rejected";
//             this.#result["customPromiseReason"] = err;
//             this.customEventLoop();

//             // console.log("Checking err :",err);
//             // this.#queue = [];
//             // queueMicrotask(() => {
//             //     // for(let i of this.#queue){
//             //     //     if(typeof i[1])
//             //     // }
//             //     if (this.#queue.length === 0) {
//             //         // throw new CustomPromiseUnhandledError(err);
//             //         console.error("UnhandledCustomPromiseError :", err.message);
//             //         return new CustomPromiseUnhandledError(err);
//             //     }
//             // })
//             return err;
//         }
//     }

//     constructor(executer) {
//         executer(
//             (resolve) => this.#resolve(resolve),
//             (reject) => this.#reject(reject)
//         );
//     }

//     customThen(onResolve=undefined, onReject=undefined) {
//         // console.log("queue");
//         const child = new customPromise((resolve, reject) => {
//         });
//         let data;

//         // customPromise.#flag = false;

//         if (this.#result.customPromiseState === "pending") {
//             customPromise.#queue.push([this, onResolve, onReject, child]);
//         } else {
//             if (this.#result.customPromiseState === "fulfilled") {
//                 try {
//                     // if(!customPromise.#flag){
//                         data = onResolve(
//                             data = (data === undefined) ? this.#result.customPromiseResult : data
//                         );
//                     // }
//                     if (data instanceof customPromise) {
//                         // this.#queue([data, onResolve, onReject, child]);
//                         data.customThen(
//                             val => child.#resolve(val),
//                             err => child.#reject(err)
//                         );
//                     } else {
//                         if (data instanceof Error) {
//                             // customPromise.#queue = [];
//                             child.#reject(data);
//                         } else {
//                             child.#resolve(data);
//                         }
//                     }
//                     // console.log("data :",data);
//                 } catch (err) {
//                     child.#reject(err);
//                     // customPromise.#queue = [];
//                 }
//             } else if (this.#result.customPromiseState === "rejected") {
//                 // data = onReject();
//                 if (onReject !== undefined) {
//                     try {
//                         data = onReject.call(
//                             data = (data === undefined) ? this.#result.customPromiseReason : data
//                         );
//                         console.log("the final for rejection",data());

//                         // if(typeof data() !== "undefined"){
//                             customPromise.#flag = true;
//                         // }

//                         child.#resolve(data);
//                         // if (data instanceof Error) {
//                         //     child.#reject(data);
//                         // } else {
//                         //     child.#resolve(data);
//                         // }
//                     } catch (err) {
//                         // customPromise.#queue = Array(Set(customPromise.#queue));

//                         // customPromise.#queue = [];
//                         // console.log("Checking function...");
//                         child.#reject(err);
//                     }
//                 } else {
//                     child.#reject(this.#result.customPromiseReason);
//                 }
//             }
//         }
//         // console.log("return :",customPromise.customResolve(data));
//         // return customPromise.customResolve(data);
//         return child;
//     }

//     customCatch(onReject) {
//         customPromise.#flag = true;
//         return this.customThen(null, onReject);
//     }

//     customEventLoop() {
//         const id = queueMicrotask(() => {
//             if (customPromise.#queue.length !== 0) {
//                 const method = customPromise.#queue.shift();
//                 // const temp = method[0].customThen(method[1], method[2]);
//                 // console.log("Temp :",temp);
//                 let result;
//                 try {

//                     result = method[0].customThen(method[1], method[2]);
//                     // console.log(result.#result);
//                     // console.log("EventLoop result :",result);
//                     if (result instanceof customPromise) {
//                         result.customThen(
//                             val => method[3].#resolve(val),
//                             err => () => {
//                                 customPromise.#queue = [];
//                                 customPromise.#flag = false;
//                             }
//                         )
//                     }
//                     method[3].#resolve(result);
//                 } catch (err) {
//                     // this.#queue.pop();
//                     method[3].#reject(err);
//                 }
//             } else {
//                 if (customPromise.#queue.length === 0 && this.#result.customPromiseReason !== undefined) {
//                     // throw new CustomPromiseUnhandledError(err);
//                     // console.error("UnhandledCustomPromiseError :", this.#result.customPromiseReason.message);
//                     // let flag = (()=>{
//                     //     for(let i of customPromise.#queue){
//                     //         if(i[1] === null && i[2] !== undefined){
//                     //             return true;
//                     //         }
//                     //     }
//                     //     // return false;
//                     // })();
//                     // console.log(flag);
//                     // if(this.#result.customPromiseState === "fulfilled"){
//                     if (customPromise.#flag) {
//                         return new CustomPromiseUnhandledError(this.#result.customPromiseReason);
//                     } else {
//                         console.log("Stuck")
//                         throw new CustomPromiseUnhandledError(this.#result.customPromiseReason);
//                     }
//                 }
//             }
//         });
//     }

//     [util.inspect.custom]() {
//         if (this.#result.customPromiseState === "rejected") {
//             return new CustomPromiseUnhandledError();
//         } else if (this.#result.customPromiseState === "fulfilled") {

//             let str = typeof this.#result.customPromiseResult === "string" ? `\'${this.#result.customPromiseResult}\'` : Array.isArray(this.#result.customPromiseResult) === true ? `[${this.#result.customPromiseResult.join(", ")}]` : typeof this.#result.customPromiseResult === "object" ? JSON.stringify(this.#result.customPromiseResult) : Number.isNaN(this.#result.customPromiseResult) ? "NaN" : `${this.#result.customPromiseResult.toString()}`

//             return `customPromise { ${str} }`
//         } else {
//             return `customPromise { <pending> }`;
//         }
//     }

//     // [Symbol.iterator](){
//     //     return this.#result.customPromiseResult || this.#result.customPromiseReason;
//     // }
// }

// class CustomPromiseUnhandledError extends Error {
//     constructor(err) {
//         super(err);
//     }
// }

// const cProm = new customPromise((resolve, reject) => {
//     // reject("reject")
//     setTimeout(() => {
//         resolve("success");
//     }, 1000);
// });

// var temp = cProm.customThen((data) => {
//     console.log(data);
//     return data;
// }).customThen((data) => {
//     console.log("Second then :", data);
//     throw new Error("reject");
// }).customThen((data) => {
//     console.log("Third then :", data);
// })
// .customThen(()=>{},(data)=>{
//     console.log("The middle different check.")
// })
//     // .customCatch((err) => {
//     //     console.log("Error 1:", err.message);
//     //     throw new Error("NO");
//     // }).customCatch((err) => {
//     //     console.log("Error 2:", err.message);
//     // })

// // setTimeout(() => {
// //     console.log("Completed");
// // }, 3000);
// // console.log(cProm);

// // const anotherPromise = new customPromise((resolve, reject) => {
// //     resolve("ok");
// // })

// // console.log(typeof anotherPromise);

// // console.log(cProm);

// // const prom = new Promise((resolve, reject) => {
// //     setTimeout(()=>{
// //         resolve("success");
// //     },10);
// // })
// // prom
// // .then((data) => {
// //     console.log(data);
// //     throw Error("Catch this");
// // })
// // .catch((reason)=>{
// //     console.log(reason);
// //     return "Execute finally";
// // })
// // .finally(()=>{
// //     setTimeout(()=>{
// //         console.log("1");
// //     },1000);
// // })
// // .finally(()=>{
// //     setTimeout(()=>{
// //         console.log("2");
// //     },999);
// // })

// // console.log(prom); 






// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________




const util = require("util");

class CustomPromiseUnhandledError extends Error {
    constructor(err) {
        super(err);
        this.name = "CustomPromiseUnhandledError";
    }
}

class customPromise {
    static #queue = [];
    static #flag = false;

    #result = {
        customPromiseState: "pending",
        customPromiseResult: undefined,
        customPromiseReason: undefined
    };

    #resolve = (argu) => {
        if (this.#result.customPromiseState === "pending") {
            this.#result.customPromiseState = "fulfilled";
            this.#result.customPromiseResult = argu;
            this.customEventLoop();
            return argu;
        }
    };

    #reject = (err) => {
        if (this.#result.customPromiseState === "pending") {
            this.#result.customPromiseState = "rejected";
            this.#result.customPromiseReason = err;

            // Unhandled Rejection check using the microtask queue
            queueMicrotask(() => {
                const isHandled = customPromise.#queue.some(
                    item => item[0] === this && typeof item[2] === "function"
                );
                if (!isHandled && !customPromise.#flag) {
                    console.error("UnhandledCustomPromiseError:", err instanceof Error ? err.message : err);
                }
            });

            this.customEventLoop();
            return err;
        }
    };

    constructor(executer) {
        try {
            executer(
                (resolve) => this.#resolve(resolve),
                (reject) => this.#reject(reject)
            );
        } catch (err) {
            // Catch synchronous errors thrown inside the executor
            this.#reject(err);
        }
    }

    customThen(onResolve = undefined, onReject = undefined) {
        const child = new customPromise(() => {}); // Empty executor for the child promise

        // ALWAYS push to the queue. This forces async behavior (Promise A+ compliance)
        // and simplifies the logic massively by letting the event loop handle everything.
        customPromise.#queue.push([this, onResolve, onReject, child]);

        // If it's already settled, kickstart the loop immediately
        if (this.#result.customPromiseState !== "pending") {
            this.customEventLoop();
        }

        return child;
    }

    customCatch(onReject) {
        customPromise.#flag = true; // Your flag to suppress unhandled errors
        return this.customThen(undefined, onReject);
    }

    customEventLoop() {
        queueMicrotask(() => {
            // Find the FIRST item in the queue where the parent promise is already settled
            const index = customPromise.#queue.findIndex(item => item[0].#result.customPromiseState !== "pending");

            if (index !== -1) {
                // Remove that specific item from the queue
                const method = customPromise.#queue.splice(index, 1)[0];
                const [parent, onResolve, onReject, child] = method;

                try {
                    if (parent.#result.customPromiseState === "fulfilled") {
                        if (typeof onResolve === "function") {
                            const data = onResolve(parent.#result.customPromiseResult);
                            
                            // If the callback returns another Promise, wait for it
                            if (data instanceof customPromise) {
                                data.customThen(
                                    val => child.#resolve(val),
                                    err => child.#reject(err)
                                );
                            } else {
                                child.#resolve(data);
                            }
                        } else {
                            // Value Pass-through (e.g., when .then has no onResolve)
                            child.#resolve(parent.#result.customPromiseResult);
                        }
                    } else if (parent.#result.customPromiseState === "rejected") {
                        if (typeof onReject === "function") {
                            const data = onReject(parent.#result.customPromiseReason);
                            
                            if (data instanceof customPromise) {
                                data.customThen(
                                    val => child.#resolve(val),
                                    err => child.#reject(err)
                                );
                            } else {
                                // Resolves the child because the error was successfully caught!
                                child.#resolve(data);
                            }
                        } else {
                            // Error Pass-through (e.g., when .then has no onReject)
                            child.#reject(parent.#result.customPromiseReason);
                        }
                    }
                } catch (err) {
                    child.#reject(err);
                }

                // If there are more ready items in the queue, recursively trigger the loop
                if (customPromise.#queue.some(item => item[0].#result.customPromiseState !== "pending")) {
                    this.customEventLoop();
                }
            }
        });
    }

    [util.inspect.custom]() {
        if (this.#result.customPromiseState === "rejected") {
            return `customPromise { <rejected> ${this.#result.customPromiseReason} }`;
        } else if (this.#result.customPromiseState === "fulfilled") {
            let str = typeof this.#result.customPromiseResult === "string" 
                ? `'${this.#result.customPromiseResult}'` 
                : Array.isArray(this.#result.customPromiseResult) 
                    ? `[${this.#result.customPromiseResult.join(", ")}]` 
                    : typeof this.#result.customPromiseResult === "object" 
                        ? JSON.stringify(this.#result.customPromiseResult) 
                        : Number.isNaN(this.#result.customPromiseResult) 
                            ? "NaN" 
                            : `${this.#result.customPromiseResult}`;

            return `customPromise { ${str} }`;
        } else {
            return `customPromise { <pending> }`;
        }
    }
}
