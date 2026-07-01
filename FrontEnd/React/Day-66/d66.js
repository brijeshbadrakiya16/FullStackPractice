// Day-66

// completed ep 8 part 001, 8 002, 9, 10, 11 001, 11 002,


// _________________________________________________

// ?- Class Based components

// Learned how to create state variables in classBased components 

// ! in constructor

// this.state = {
//     count(variableName) : initialValue
// }

// ! to update

// this.setState({
//     count : newValue;
// })

// ! Life Cycle of react component rendering interms of Class

// * First Parent component class's contructor called
// * Then Parent render() method called
// * Then if there is any child component inside it then it's contructor called then if
// * then child's rendering called 
// * after successfull rendering comleted then it's Did Mount method called
// * then parent's didmoount method called

// ! Like -> P constructor -> P render() -> C construtor -> C render() -> C DidMount() -> P DidMount()

// ? As Suggested we should make api calls inside componentDidMount(), like how useEffect behaves as it wait till component fully rendered and then amke api call and then re-redner the component

// If there is mutliple childs then it will first load child-1 constructor, child-1 render then child-2 constructor, child-2 render goes upto n-childs then child-1 didMount, child-2 didmount and child-n didMount then last parent didmount

// React Fast because it batch ups the child component rendering

// ! Update Cycle -> Render -> DOM Update -> didUpdate called

// ! Component Will Unmount called -> when component gone from page -> Like changing page to render diffrent component instead of it

// ? Why should we unmount component and use willunmount method in class? -> clear things ? -> what things?
// * supppose think if have setInterval in constructor or component didmount or in component update then we need to clear it when the component unmounted, if we do not it will keep running in background because React is single page application

// how we can do something like that in useEffect / functioncomponents

// suppose , we have interval in useEffect

// useEffect(()=>{
//     setInterval(()=>{
//         #Something code
//     },1000);
// },[]);

// then what function we write in useEffect's return it will be executed when component unMounted

// useEffect(()=>{
//     const id = setInterval(()=>{
//         "something"
//     },1000);

//     return () => {
//         clearInterval(id);
//     };
// },[]);



// !!!!!!!!! How to Make Our APP Performing well ... Optimizing

// ! Make component doing a single thing like displaying or something else, if not make it by making custom hooks 

// When we make build then bundler bundles all js file into one single js file which is good as well as bad

// suppose if we have 1000s of component we have not bundle it to one file or also not want to browser loads 1000s of js files

// ! so instead we do make it in smaller bundles

// this called 

// ? Chunking
// ? Code Splitting
// ? Dynamic Bundling
// ? App Chunking
// ? Lazy Loading
// ? On Demand Loading
// ? Dynamic import

// How to do that

// from where you want that component a different big collection of compponents

// !! don't import it as in normal way

// import it with lazy function of react library
// import React, {lazy} from "react";

// * const Grocery = lazy(()=>{ import("./path to that component") //Dynamic import }) //write this inside you App.jsx/js 

// ! here import is different as it is a function

// ? also use Suspense Component provided by "react" and Wrap your lazy component inside it

// ! <Suspense fallback={<h1>Loading...</h1>} > <Grocery /> <Suspense />

// ? fallback is here to show something while the component inside it loads.. we have to write JSX inside fallback={}


// ! Lifting the state up like suppose if we have multiple accordians and we want to controll it as what we click only and only that should be showing if other is open then it should be close, so we must have to handle the logic at where they all reference the safe thing, like parent component

// * createContext / useContext / Context.Provider value={here pass the value you'll be using} like we using {loggedInUser:"Default"} then pass value={{loggedInUser:"Name"}} 

// ! to make things work and to want to change it's value from anywhere then ______________bind it's Value with state variable_______________ like below

// ? <UserContext.Provider value = {{loggedInUser: userName}}>  <App />  </UserContext.Provider>  where, const [userName,setUserName] = useState();


// _______________________________________________________________________________________


// !!!!    REACT and REDUX is different libraries. 

// Date: 2/06/2026
// Task: Completed ep 8 part 001, 8 002, 9, 10, 11 001, 11 002 and started ep 12 001.
// # Learned about Class Based Components and how to handle states like useState but in classbased component.
// # Understand Full LifeCycle of React Rendering with ClassBased component with it's each didMount, didUpdate, willUnmount methods and also with single child and multiple childs.
// # Learned Why we clean somethings after getting any component unMounted and see how do it with functional-component in useEffect with returning callback function which executes at time when component unMounted.
// # Learned about tailwind CSS.
// # Learned how to optimize the app with lazyLoading/onDemandRendering/Chunking and also know about dynamic import and using that component with suspense fallback.
// # Understand a concept of lifting State up with accordians.
// # Learned about context with createContext / useContext/ ContextProvide and did used as to change the context value from inside wrapped app.

