function isValid(key, val) {
  switch (key) {
    case "s":
      return typeof val === "string";
    case "n":
      return typeof val === "number";
    case "b":
      return typeof val === "boolean";
    case "l":
      return typeof val === "symbol";
    case "o":
      return typeof val === "object" && !Array.isArray(val);
    case "a":
      return Array.isArray(val);
    default:
      return false;
  }
}

const targetObj = { a: 1, b: 2, nNum: 3 };

const handler = {
  set(targetObj, prop, value) {
    if (isValid(prop[0], value)) {
      targetObj[prop] = value;
    } else {
      throw Error("You are trying to Set invalid Property!!");
    }
  },
};

const proxy = new Proxy(targetObj, handler);

for (const key in targetObj) {
  try {
    proxy[key] = targetObj[key];
  } catch (error) {
    delete targetObj[key];
  }
}

proxy.sName = "jemish";
proxy.nAge = 21;
proxy.bisTrue = true;
proxy.oDetails = {};
proxy.aCollection = [];
proxy.lIter = Symbol();

// proxy.avd = 5;

console.log(proxy);

//
//
//

// const targetObj = { a: 1, b: 2, nNum: 3 };

// const handler = {
//   set(targetObj, prop, value) {
//     if (prop[0] === "s" && typeof value === "string") {
//       targetObj[prop] = value;
//     } else if (prop[0] === "n" && typeof value === "number") {
//       targetObj[prop] = value;
//     } else if (prop[0] === "b" && typeof value === "boolean") {
//       targetObj[prop] = value;
//     } else if (
//       prop[0] === "o" &&
//       typeof value === "object" &&
//       !Array.isArray(value)
//     ) {
//       targetObj[prop] = value;
//     } else if (prop[0] === "a" && Array.isArray(value)) {
//       targetObj[prop] = value;
//     } else if (prop[0] === "l" && typeof value === "symbol") {
//       targetObj[prop] = value;
//     } else {
//       throw Error("You are trying to Set invalid Property!!");
//     }
//   },
// };

// const proxy = new Proxy(targetObj, handler);
// for (const key in targetObj) {
//   try {
//     proxy[key] = targetObj[key];
//   } catch (error) {
//     delete targetObj[key];
//   }
// }

// proxy.sName = "jemish";
// proxy.nAge = 21;
// proxy.bisTrue = true;
// proxy.oDetails = {};
// proxy.aCollection = [];
// proxy.lIter = Symbol();

// // proxy.avd = 5;

// console.log(proxy);

