// "use strict";

// Object.getOwnPropertyDescriptor()
function aboutGetOwnPropertyDescriptor() {
  const obj = {
    key: 1,
    name: "jemish",
    get keyValue() {
      return this.key;
    },
  };

  const objDes = Object.getOwnPropertyDescriptor(obj, "key"); // if it exists then return it descripter otherwise it return undefined.
  console.log(objDes);

  const objDesAll = Object.getOwnPropertyDescriptors(obj); // if it exists then return it all descripters otherwise it return {}.
  console.log(objDesAll);
}
// aboutGetOwnPropertyDescriptor();

// Object.defineProperty()
function aboutObjectDefineProperty() {
  // property descriptor object keys(6) : [ configurable, enumerable, writable, value, get, set ]
  // out of these 6 keys only four can be used at any time which represents two flavours of it.

  // Flavour of the property descriptor :
  // 1) Data descriptors: [configurable, enumerable, writable, value]
  // 2) Accessor descriptors : [configurable, enumerable, set, get]

  // writable : true => we can change it value, false => we can not change it value

  // enumerable : true => can be seen during enumeration e.g in "for....in loop, Object.keys(), JSON.stringify()" etc.
  // false => can not enumerate

  // configurable : true => changing the object other properties such as "enumerable, writable is allowed", and we can delete properties.
  // false => other attributes of its descriptor cannot be changed, the property can not be deleted.
  // (however, if it's a data descriptor with writable: true, the value can be changed, and writable can be changed to false).

  const obj = {
    name: "jemish",
    get n() {
      return this.name;
    },
  };
  // by default Object.defineProperty() all property is set to false.
  const defineProp = Object.defineProperty(obj, "prop", {
    value: 1, // if we do not assign value it return undefined.
    // enumerable: true,

    // configurable: false, // can not change anything but we can redeclare this property with same configurations.
    // writable: true, // if it true with configurable: false then below ([c,w]) line: 60

    // configurable: false, // we can also delete obj value.
  });

  // [e]
  // console.log(defineProp); // enumerable is false so we can't enumerate
  // console.log(defineProp.prop); // but we can directly access it

  // [c,w] (above line: 51)
  // Object.defineProperty(obj, "prop", {
  //   // we can redefine property
  //   value: 10, // we can change the value
  //   writable: false, // we can change writable true to false
  // });
  // console.log(obj.prop); // 10

  // we can redifine property "second time" but can not change it value or other property second time.(as it is).
  // Object.defineProperty(obj, "prop", {
  //   value: 10,
  //   configurable: false,
  //   writable: false,
  //   enumerable: false,
  // });
  // console.log(obj.prop);

  // [configurable: false]
  // delete obj.prop; // can not delete Object.defineProperty define properties
  // console.log(obj); // it not deleted

  //
  /*
  // get and set works like this:-
  // we can not use "value with get, set" so, we have to define like below
  let bValue = 38;
  Object.defineProperty(obj, "b", {
    get() {
      return bValue;
    },
    set(newValue) {
      bValue = newValue;
    },
    enumerable: true,
    configurable: true,
  });
  console.log(obj.b); // 38
  */

  /*
  // we cannot use value and getter, setter both at same property together
  Object.defineProperty(obj, "conflict", {
    value: 0x9f91102,
    get() {
      return 0xdeadbeef;
    },
  });
  // throws a TypeError: value appears
  */
  //

  /*
  const o = {};
  Object.defineProperty(o, "b", {
    writable: false,
    configurable: true,
  });
  Object.defineProperty(o, "b", {
    value: 1,
  }); // We can replace the value with defineProperty
  console.log(o.b); // 1
  o.b = 2; // throws TypeError in "strict mode": cannot change a non-writable property's value with assignment
  console.log(o.b);
  */

  /*
  //
  // Object.defineProperties()
  //

  const obj2 = {};

  Object.defineProperties(obj2, {
    x: { value: 10 },
    y: { value: 100, enumerable: true },
  });

  console.log(obj2);
  */
}
aboutObjectDefineProperty();

function objectCanBe() {
  /*
      1. Extensible   - new properties can not be added // [e, w, c]
      2. Sealed       - props can't be added, deleted or configured but are still writable // [e,w]
      3. Frozen       - props can't be changed in any way //  [e]
      -------------------------------------------------------------------------------------------
      To check :
                Object.isExtensible(<obj>)
                Object.isFrozen(<obj>)
                Object.isSealed(<obj>)
  */
  const o0 = { a: 1, b: 2 };
  const o1 = { a: 1, b: 2 };
  const o2 = { a: 1, b: 2 };
  const o3 = { a: 1, b: 2 };

  Object.preventExtensions(o1); // only new properties can not be added
  Object.seal(o2); // new prop not add, prop changable(writable), can not deleted
  Object.freeze(o3); // we can not performs [add,write,delete].

  // - try to extend
  o0.c = 3;
  o1.c = 3;
  o2.c = 3;
  o3.c = 3;
  // console.log(o0, o1, o2, o3);

  // - try to write
  o0.a = 10;
  o1.a = 10;
  o2.a = 10;
  o3.a = 10;
  // console.log(o0, o1, o2, o3);

  // - try to delete
  delete o0.a;
  delete o1.a;
  delete o2.a;
  delete o3.a;
  // console.log(o0, o1, o2, o3);

  // - checking property descriptor
  console.log({
      normal: Object.getOwnPropertyDescriptors(o0),
      non_extensible: Object.getOwnPropertyDescriptors(o1),
      sealed: Object.getOwnPropertyDescriptors(o2),
      frozen: Object.getOwnPropertyDescriptors(o3),
  });

  // - check direct property
  console.log(Object.hasOwn({ a: 1 }, 'a'));
  console.log({ a: 1 }.hasOwnProperty('a'));

  //
  // shallow freeze
  // here obj1 if freeze so we can not change anything inside it but inside obj1 we have another internal object and it is not freeze
  const obj1 = {
    internal: {},
  };

  Object.freeze(obj1);
  obj1.internal.a = "aValue";

  // console.log(obj1.internal.a); // 'aValue'
}
// objectCanBe();

//
// Object.assign()
function aboutAssign() {
  // * by default, string & array has enumerable: true.
  /*
  const target = { a: 1, b: 2 };
  const source = { b: 4, c: 5 };
  const source2 = { c: 6, d: 7 };

  const returnedTarget = Object.assign(target, source, source2);
  console.log(target);
  console.log(returnedTarget);
  console.log(returnedTarget === target);
  */
  /*
  const obj1 = { a: 0, b: { c: 0 } };
  const obj2 = Object.assign({}, obj1);
  // console.log("obj2:", obj2);

  obj1.a = 1;
  console.log("obj1:", obj1);
  obj2.a = 2;
  console.log("obj2:", obj2);

  // shallow copy(Clone)
  // object ni ander bijo object ni value change kari to original ni value pan change thay (vice versa)
  obj2.b.c = 3;
  console.log("obj1:", obj1);
  console.log("obj2:", obj2);

  // Deep Clone
  const obj3 = { a: 0, b: { c: 0 } };
  const obj4 = structuredClone(obj3);
  obj3.a = 4;
  console.log(obj3);
  obj3.b.c = 4;
  console.log(obj4);
  */
  //
  /*
  const v1 = "abc";
  const v2 = true;
  const v3 = 10;
  const v4 = Symbol("foo");
  // const v5 = [1, 2, 3, 4, 5];
  // const v6 = { aa: 11 };

  const obj = Object.assign({}, v1, null, v2, undefined, v3, v4);
  // Primitives will be wrapped, null and undefined will be ignored.
  // Note, only string wrappers can have own enumerable properties.
  console.log(obj); // { "0": "a", "1": "b", "2": "c" }
  */
}
// aboutAssign();

function aboutObjectCreate() {
  // Exceptions
  // TypeError Thrown if proto is neither null nor an Object.

  const obj1 = { a: 100, b: 10 };
  const obj2 = Object.create(obj1);
  console.log(obj2); // it linkage obj1 as an Prototype of obj2
  // console.log(obj2.__proto__);
  console.log(obj2.a); // we can access the value of obj1 via prototype

  console.log(Object.getOwnPropertyDescriptors(obj2)); // {} because obj1 is __proto__ to obj2

  /*
  const obj1 = {
    a: 1,
    b: 2,
  };

  const linkageProtoObj1 = Object.create(obj1);
  linkageProtoObj1.c = 3;
  console.log(linkageProtoObj1);
  // All Property of "Object.create(obj)" is by default true, [e,w,c] = true.
  console.log(Object.getOwnPropertyDescriptors(linkageProtoObj1));

  // it same as above
  const linkageProtoObjAnotherWay = Object.create(obj1, {
    c: { value: 3, enumerable: true },
  });
  console.log(linkageProtoObjAnotherWay);
  // All Property of "Object.create(obj,{})" is by default false, [e,w,c] = false.
  console.log(Object.getOwnPropertyDescriptors(linkageProtoObjAnotherWay));
  */
}
// aboutObjectCreate();
