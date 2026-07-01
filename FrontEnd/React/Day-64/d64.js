// Day-64

// Date: 29/05/2026
// Task: Completed ep 5 and ep 6 half, learned about export imports, react's Reconcilation Algorithm and Diff algorithm as understand how react updates particular component to DOM and why react is efficient in Handling DOM, learned about react hooks such as useState and useEffect, created simple webpage that shows data cards after fetching from the swiggy API.

// ________________________________________


// There are two types of export
// * one is simple default export - export only single thing can not be used more then once
// * and other is named export  - export multiple times but you have to import as same name as you have exported.

// !! export default component;
// !! import component from 'path';

// !! expport const component;
// !! import {component} from 'path';


// ***** React Hooks
// It is normal JS utility Functions written by facebook devs

// useState() - if the state changes then react will re-render the particular component
// useEffect()

// ** React is fast because it is effecient in DOM manipulation.

// ! Reconciliation Algorithm (React Fiber) came up in React 16

// Virtual DOM is representation of actual DOM

// the object which we had seen like in react.createElement returns what, a react element which is basically a JAVASCRIPT Object then that object is the virtual DOM in react

// ! The Whole virtual DOM in react is basically a JAVASCRIPT OBJECT.

// There lies a Diff Algorithm which finds difference between old virtual DOM and new Virtual DOM and it will update the dom in every render cycle

 