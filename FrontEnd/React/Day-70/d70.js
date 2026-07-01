// Day-70

// Date: 08/06/2026
// Task: Completed Video of useRef, useMemo.
// - Learned about useMemo that how it caches heavy tasking results between re-renderings
// - Learned about useRef that how it updates it's value without re-rendering and remebers value on re-renderings.
// - Learned how to create and connect project of web hosting in firebase.
// - Implemented email,password,name  sign-up/sign-in/sign-out and used in netflixgpt project.
// - Implemented google auth with help of firebase to login using google email.
// - Tried to solve a issue of my web-app not hosting on firebase but still not resolved.

// _______________________________________________

// * useMemo
// const cachedResult = useMemo(currentValue or function, dependencies);
// ! useMemo lets you cache the function defination between re-renders
// ? here dependecies are as when you want to change value of that function like on text-change or on some state change only other wise cache it 

// * useRef
// const variable = useRef(intialvalue)
// ! useRef lets you update variable without re-rendering
// ? it will only show it value when the component renders, other \wise it is remembering behind the scenes

//