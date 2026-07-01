// Day-65


// _____________________________________

// Conditional rendering 

// Whenever the state changes the react will re-rendered the full component.

// UseEffect

// *- if there is no dependency array then useEffect's callback function runs everytime the component renders
// *- if there is empty dependency array then useEffect called only at intial the component renders and only one time
// *- if there is something in dependency array then useEffect called every time when it changes

// useState

// *- never intialize or create useState hooks out of function.
// *- create it inside function and top of it
// *- don't create it with inside a condition
// *- don't create it also inside loops

// ! React Router Dom

// We can create routes as we want 

// ? to define routes we use createBrowserRouter by importing it from 'react-router-dom'

// ? to use that defined routes we use RouterProvide component imported from same 'react-router-dom'

// we have to pass it as 

// ! in main returning app ,  ---   <RouterProvider router={ our object which created by createBrowserRouter }

// ?> there another speccality while handling the any path error we have hook as useRouteError from 'react-router-dom' it shows complete info about error

// ?> we want to render component in any path's component but as child like fixed header and below it other then it will be as with help of children field and Outlet component from 'react-router-dom'

// ?-- Outlet componet ensure as what component we write in element field of children it will replaced by it

// to access nav and provide link we don't use <a> because it will reload the page instead we use <Link> given by "react-router-dom"

// ! Routing Types

// - Client Side routing - in this all the components are already got , just loaded according to situations
// - Server Side routing - meaning making network call and getting data as page comming from the server


// Class-Based Component
// where class extends React.Component and have render() method returning the jsx which will converted into reactelement => html and shown on browser

// ? to access props we crete constructor inside class and then we can set props from constructor parameter after writing 
// !! super(props); //Imp



// Date: 1/06/2026
// Task: Completed ep 6 part 001, part 002, 6.1, 6.2, 7 part 001, part 002.
// # Learned about do's and don't with useState and useEffect. Also seen different dependencies how affects the useEffect.
// # Learned about different conditional renderings.
// # Learned about react-router-dom as seen how to create client side routes with help of createBrowserRoute and RouterProvider and Link and Outlet to do children routing.
// # Used error page with it and shown Error status with message by useRouterError.
// # Tried to solve a api response as getting only 202 code on request from server, tried multiple solutions but as result it is concluding that swiggy's cdn (Amazon's CloudFront) is restricting it's api to access from external scripts or local servers as also with both http and https and with corsproxy but it not allows.
// # Started ep 8 001, as learned about Class-Based Components and how to use it, how to use props through classBased component.