// Day-63

// ___________________________________________________

// React element is object, when we render it on dom it will become a HTMLELEMENT

// Facebook devs created JSX

// JSX is being transpiled before going to JS engine

// Babel is javaScript complier/transpiler which is resposible to work jsx in browser before reaching to js Engine.

// JSX => React.createElement => ReactElem/JS Object => HTML

// attributes of different tags in jsx will be in camelCase

// React Components
// Two types of Component 👉 1️⃣ Class Based Component -old way and 2️⃣ Functional Component -new

// React Functional Component - A function which returning React element(At the end JSX is react element after transpiling) is react functional component.
// It's name always starts with capital letter.
const HeadingComponent = () => {
    return <h1> Namaste React Functional Component.</h1>;
};
// is same as
const HeadingComponent2 = () => <h1>Namaste React Functional Component. without return keyword</h1>
// also same as
const HeadingComponent3 = () => (
    <h1>Namaste React Functional Component. without return keyword</h1>
);

// Now if you want to render it then pass it like below

// root.render(<HeadingComponent />);̣

const HeadingComponent4 = () => (
    <div id="container">
        <HeadingComponent />   {/* Passing and functioal component to another functional component is called  COMPONENT COMPOSITION */}
        <h1 className="heading">Namaste React Functional component.</h1>
    </div>
);

// also without arrow function as with by function keyword

const HeadingComponent5 = function () {
    return (
        <h1>This is functional component with using function.</h1>
    );
}

// if we do {} (curly braces) inside anywhere in functional component then we can run javascript code which written in it

// we can put variables or react elements into it also like below

const title = (
    <h2>
        This is title React/JSX element. 
    </h2>
)

const HeadingComponent6 = () => (
    <div className="container">
        {title} {/*  like this   */}
        <h1>This is 6th component</h1>
    </div>
)

// we can aslo call this functional component as 
// {HeadingComponent()} //because it is normally js function

// JSX prevents cross-site scripting attacks
// like someone can inject js to your {data}


// EP-4 

// Learned and build simple ui page which have nav, search, restaurant card, footer,
// Learned about props, it is basically a way to pass named values to any functional component as we want to
// like passing attritube-value pair where the we renders the component then it will be accessible by arguement or you simply destruct it also 

// |_____________________|
// |  Config Driven UI.  |
// |_____________________|

// It's simple meaning data controlleable ui, meaning ui can be congigured through the data.
// Like top meals or offeres varies in different cities or area's so some may have nothing to show.


// we can use map inside jsx to inject jsx in loop such as creating cards from data.
// we must have to pass unique id as key in reserved attribute key as react will render and show error if not provided.

// suppose if new card came or any single change done in any card then if there is no key then react will re-render full container instead of reflecting single change
// if we have given keys then it just simply add or update that card only

// !!!!!!!!!!!!!!!!!!! STRICTLY DO NOT USE INDEX AS KEYS !!!!!!!!!!!!!!!!!!! //


// Date: 28/05/2026
// Task: Completed ep2 , ep3, ep4 and learn about props and created simple page in react.
