// Day-67

import { info } from "node:console"
import { it } from "node:test"

// Completed 12 part 001, 12 002, 13 001, 13 002

// ____________________________________________________

// ! Redux

// * Redux is a store which can accessed by any component on any level of our app's architecture

// ? store is big and we have slices in its,
// ? Slice are logical collection to keep data seprate in small slices

// ! Suppose on clicking add button of your item card it dispatch an action, it calls a function and this function modifies the cart slice.
// ! redux says you can't directly modify the slice

// ! what is the function ---> It is a _____Reducer______ .

// ? Now how can we get data from the cart slice? --> for that we have ____Selector_____ . This is called __subscribing to the store__

// !-Redux Toolkit
// - Install @reduxjs/toolkit and react-redux
// - Build our Store
// - Connect our store to our app
// - Slice (cartSlice, loginSlice)
// - dispatch(action)
// - Selector 

// *- Build Store

// import { configureStore } from "@reduxjs/toolkit";
// import loginReducer from "./loginSlice";

// const appStore = configureStore({
//     reducer: {
//         login: loginReducer, // ! add after creating loginSlice
//     }
// });

// export default appStore;

// *- connect our store to our app

// import { Provider } from 'react-redux';
// import appStore from './utils/appStore';

// function App() {
//   return (
//     <>
//       <Provider store={appStore}> //! pass tje exported app from our store
//         <RouterProvider router={appRouter} />
//       </Provider>
//     </>
//   )
// }

// export default App

// *- Creating Slice

// import { createSlice } from "@reduxjs/toolkit";

// const loginSlice = createSlice({
//     name: "login",  //! name of the slice
//     initialState: {
//         name:"visitor",              //! intial state is the inital value of our slice
//     },
//     reducers: {                      //! we have to export and pass this reducer to our store as it is holding all actions
//         updateName: (state,action) => {   //! anything you want to edit with your data
//             state.name = action.payload;  //! state is current data which is holding
//         },
//         removeData: (state) => {
//             state.name = "visitor";
//         }
//     }
// });

// export const {updateName,updateStatus,removeData} = loginSlice.actions;
// export default loginSlice.reducer;


// *- dispatch (action)

// import { useDispatch } from "react-redux";
// import { removeData, updateName } from "../utils/loginSlice";

// ! please write all code from this and below inside function of component

// const dispatch = useDispatch();

// <button className="auth-btn" onClick={() => {
//     #dispatch an action;
//     if (btnName === "Login") {
//         setBtnName("Logout");
//         dispatch(updateName("Brijesh")); //! here we are passing our imported reducer function of specified action to dispatch anf with the value we want to set
//     } else {
//         setBtnName("Login");
//         dispatch(removeData()); //! same here also
//     }
// }}>{btnName}</button>


// *- Selector - to subscribe our store to any slice

// import { useSelector } from "react-redux"; 

// ! please write all code from this and below inside function of component

// const login = useSelector((store) => store.login); //! we have to pass a callback function to useSelector which will get the store and return what we want from store a whole slice or particular object, field

// <li style={{ fontWeight: "bold" }}>
//     {login.name === "visitor" ? "Anonymous" : login.name} //! and then we can use it anywhere
// </li>


// ! important thing is in appStore the field named as ______reducer not reducers it is showing one big reducer which contain different small slices reducers

// ! and while createSlice there is field named as ______reducers not reducer because where we are defining mutiple reducer functions/actions
// ! and while exporting in it whe exported ______slice.reducer because it is collection of all we have defined


// ?__________________________________________________________________________________________

// Hence  
// ? configureStore
// ? createSlice
// will be imported from // ! @reduxjs/toolkit

// *  & 

// ? Provide
// ? useDispatch
// ? useSelector
// will be imported from // ! react-redux

// ?__________________________________________________________________________________________

// In earlier in vanilla(older) redux
// we are not able to change the state directly within our reducer action

// updateName: (state,action)=>{
//     ?we have to copy the full state
//     * const newState = {...state};
//     ?then change the info
//     * newState.name = "new name"
//     ! then we have to return it
//     ! return newState
// }

// but redux have made developer to do things easy

// now we can just mutate the state directly from within it

// ! but behind the scenes redux is still doing the same thing, it is using immer.js (npm package) to find the difference between oldState, newState and return the new immutate object

// and also //! you can not do state = ["name"] or something
// * because you are not changing or mutating the state but you are just giving a reference

// if you want to see the state
// ! so _______current(state) inside of reducer action and there          // import { current } from '@reduxjs/toolkit';

// ! you can also return new state instead of mutating

// ? Read about RTK queries and middlewares from redux website

// _____________________________________________________________________________________

// Writing test cases

// ? Types of texting (devloper)
// - Unit Testing. => you're testing react coponent in isolation. like you are testing your header component only
// - Integration Testing  => Testing the integration of component
// - End to End Testing - e2e testing  => Full as soon as user enters in the app to leave the app


// ! React Testing library
// ! Jest
// ! jestdom



// Date: 03/06/2026
// Task: Completed ep 12 part 001, 12 002, 13 001, 13 002.
// # Learned about Redux as it is different library which is used along with react to manage and store state.
// # Learned about it's store creating, slice creating, dispatch function and reducers/actions.
// # Understand to integrate it with Provider, useDispatch, useSelector from react-redux a different library to use redux in react. 
// # Learned about different testing likes unit, integrate, End-to-End, and understand how to test with jest.



// # Learned about Class Based Components and how to handle states like useState but in classbased component.
// # Understand Full LifeCycle of React Rendering with ClassBased component with it's each didMount, didUpdate, willUnmount methods and also with single child and multiple childs.
// # Learned Why we clean somethings after getting any component unMounted and see how do it with functional-component in useEffect with returning callback function which executes at time when component unMounted.
// # Learned about tailwind CSS.
// # Learned how to optimize the app with lazyLoading/onDemandRendering/Chunking and also know about dynamic import and using that component with suspense fallback.
// # Understand a concept of lifting State up with accordians.
// # Learned about context with createContext / useContext/ ContextProvide and did used as to change the context value from inside wrapped app.