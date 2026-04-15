function intro() {
  const o1 = {
    fname: "anuj",
    lname: "jha",
    set age(age) {
      this.age = age;
    },
    get age() {
      return this.age;
    },
  };
  o1.dept = "web";
  const decs_for_one_field = Object.getOwnPropertyDescriptor(o1, "fname");
  const decs_for_all_field = Object.getOwnPropertyDescriptors(o1);

  console.log(decs_for_one_field);
  console.log(decs_for_all_field);
  /*
    *       ######################################## PROPERTY DESCRIPTORs ########################################
    gn|     def : object associated with each property of the object that contains information about that property.

            property descriptor object keys(6) : [ configurable, enumerable, writable, value, get, set ]

            out of these 6 keys only four can be used at any time which represents two flavours of it.

    sr|     Flavour of the property descriptor :
                1) Data descriptors: [configurable, enumerable, writable, value]
                2) Accessor descriptors : [configurable, enumerable, set, get]

    -         A descriptor must be one of these two flavors; it cannot be both.

              configurable  : changing the descriptor allowed or property can be deleted ? true#/false*
              enumerable    : can be seen during enumeration e.g, in for....in loop ?  true#/false*
              writable      : changing value allowed or not ? true#/false*
                                                                      here * represent default behavior when property defined with Object.defineProperty, Object.defineProperties
                                                                      and # represent default behavior when property defined with object literal
    */
}
// intro();

function ways2DefinePropertyInObject() {
  const linux = {
    distro: {
      arch: {},
      debian: {},
    },
  };

  // - adding new property
  linux["kernel"] = [1, 2, 3, 4, 5, 5.16];
  linux.inventedBy = "Linus Torvalds";

  // - adding new property
  Object.defineProperty(linux, "fs", { value: ["ext4", "btrfs"] }); // -  Object.defineProperty(<obj>, '<property>', <desc_obj{}>)
  Object.defineProperties(linux, {
    x: { value: 10 },
    y: { value: 100, enumerable: true },
  }); // -  Object.defineProperty(<obj>, <{'property_key: <desc_obj{}>, ...}>)

  console.log(linux);
  // console.log(Object.getOwnPropertyDescriptors(linux));

  // - accessing key/value of object
  // console.log(Object.getOwnPropertyNames(linux)) // - return array of all properties
  // console.log(Object.keys(linux)) // - return array of all enumerable properties
  // console.log(Object.values(linux)) // - return array of all enumerable properties associated value
  // console.log(Object.entries(linux)) // - return array of all enumerable properties as [key, value] pair
}
// ways2DefinePropertyInObject();

function objectCanBe() {
  /*
            1. Extensible   - new properties can be added // [e, w, c]
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

  Object.preventExtensions(o1);
  Object.seal(o2);
  Object.freeze(o3);

  // - try to extend
  o0.c = 3;
  o1.c = 3;
  o2.c = 3;
  o3.c = 3;

  console.log(o0, o1, o2, o3);

  // - try to write
  o0.a = 10;
  o1.a = 10;
  o2.a = 10;
  o3.a = 10;
  console.log(o0, o1, o2, o3);

  // - try to delete
  delete o0.a;
  delete o1.a;
  delete o2.a;
  delete o3.a;
  console.log(o0, o1, o2, o3);

  // - checking property descriptor
  // console.log({
  //     normal: Object.getOwnPropertyDescriptors(o0),
  //     non_extensible: Object.getOwnPropertyDescriptors(o1),
  //     sealed: Object.getOwnPropertyDescriptors(o2),
  //     frozen: Object.getOwnPropertyDescriptors(o3),
  // });

  // - check direct property
  // console.log(Object.hasOwn({ a: 1 }, 'a'));
  // console.log({ a: 1 }.hasOwnProperty('a'));
}
// objectCanBe();
