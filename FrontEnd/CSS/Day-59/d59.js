// Day-59

// _________________________________________________________

// prev ->
// CSS completed

// next/now ->
// just casualy reading about tailwind CSS 

// Date: 21/05/2026
// Task: Just casualy looked out and read little bit about tailwind css, seen it's different logics to make things work, also revised usefull css properties, elements, methods to write by a short note with help of gpt. Learn the git stash in-depth.


// __________________________________________________________
// git stash

// it will used to store the temporary work without committing the branch 
// usefull when scenario like you are working on some branch you did some code but you have to urgently do some other code in different file on different branch then you can not leave your current branch without committing it so instead of commiting we do like git stash push -m "some feature building" then shift the branch and when you shift back then you'll just need to do either git stash pop or git stash apply if you not want to remove it 

// noramlly stash ignores new files so run 
// git stash -u
// or git stash --include-untracked

// to see all the stashes that we have made 
// run git stash show
// or run git stash show -p for more details

// to delete git stash drop stash@{0}
// to delete all git stash clear
// 

// generous knowledge
// the commits and stashes both stored locally in your .git path but they are meant for different thing
// commits are for full complete code changes and for sharing
// where for temporary storage you can use the stashes
// for stash you don't have to run git add . for staging all files/changes before running git stash push -u -m "session incomplete" to add temp changess

// __________________________________________________________

// # CSS Quick Handbook (Mini Book)

// ## 1. CSS Syntax

// ```css
// selector {
//   property: value;
// }
// ```

// Example:

// ```css
// p {
//   color: red;
//   font-size: 16px;
// }
// ```

// ---

// # 2. Selectors

// ## Basic Selectors

// ```css
// * {}          /* all elements */
// p {}          /* tag */
// .class {}     /* class */
// #id {}        /* id */
// ```

// ## Grouping

// ```css
// h1, h2, h3 {}
// ```

// ## Descendant

// ```css
// div p {}
// ```

// ## Child

// ```css
// div > p {}
// ```

// ## Adjacent Sibling

// ```css
// h1 + p {}
// ```

// ## General Sibling

// ```css
// h1 ~ p {}
// ```

// ## Attribute Selectors

// ```css
// input[type="text"] {}
// a[target="_blank"] {}
// ```

// ---

// # 3. Colors & Units

// ## Colors

// ```css
// color: red;
// color: #ff0000;
// color: rgb(255,0,0);
// color: rgba(255,0,0,0.5);
// color: hsl(0,100%,50%);
// ```

// ## Units

// | Unit | Meaning            |
// | ---- | ------------------ |
// | px   | pixels             |
// | %    | percentage         |
// | em   | relative to parent |
// | rem  | relative to root   |
// | vw   | viewport width     |
// | vh   | viewport height    |

// ---

// # 4. Text Properties

// ```css
// color
// font-size
// font-family
// font-weight
// font-style
// text-align
// text-decoration
// text-transform
// line-height
// letter-spacing
// word-spacing
// text-shadow
// white-space
// overflow-wrap
// ```

// Example:

// ```css
// p {
//   font-size: 18px;
//   font-weight: bold;
//   text-align: center;
// }
// ```

// ---

// # 5. Background Properties

// ```css
// background
// background-color
// background-image
// background-repeat
// background-size
// background-position
// background-attachment
// ```

// Example:

// ```css
// div {
//   background: url(bg.jpg);
//   background-size: cover;
// }
// ```

// ---

// # 6. Box Model

// ```css
// width
// height
// padding
// margin
// border
// border-radius
// box-sizing
// box-shadow
// overflow
// ```

// Example:

// ```css
// .card {
//   width: 300px;
//   padding: 20px;
//   border-radius: 10px;
// }
// ```

// ---

// # 7. Display & Position

// ## Display

// ```css
// display: block;
// display: inline;
// display: inline-block;
// display: flex;
// display: grid;
// display: none;
// ```

// ## Position

// ```css
// position: static;
// position: relative;
// position: absolute;
// position: fixed;
// position: sticky;
// ```

// ## Related Properties

// ```css
// top
// right
// bottom
// left
// z-index
// ```

// ---

// # 8. Flexbox

// ## Container

// ```css
// display: flex;
// flex-direction
// justify-content
// align-items
// flex-wrap
// gap
// ```

// ## Item

// ```css
// flex
// flex-grow
// flex-shrink
// flex-basis
// align-self
// order
// ```

// Example:

// ```css
// .container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// ```

// ---

// # 9. Grid

// ## Container

// ```css
// display: grid;
// grid-template-columns
// grid-template-rows
// gap
// place-items
// justify-items
// align-items
// ```

// ## Item

// ```css
// grid-column
// grid-row
// ```

// Example:

// ```css
// .container {
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
// }
// ```

// ---

// # 10. Animation & Transition

// ## Transition

// ```css
// transition
// transition-duration
// transition-delay
// transition-timing-function
// ```

// Example:

// ```css
// button {
//   transition: all 0.3s ease;
// }
// ```

// ## Transform

// ```css
// transform: scale();
// transform: rotate();
// transform: translate();
// transform: skew();
// ```

// ## Animation

// ```css
// animation
// @keyframes
// animation-duration
// animation-iteration-count
// ```

// Example:

// ```css
// @keyframes move {
//   from { left: 0; }
//   to { left: 100px; }
// }
// ```

// ---

// # 11. Pseudo Classes

// ```css
// :hover
// :focus
// :active
// :first-child
// :last-child
// :nth-child()
// :not()
// ```

// Example:

// ```css
// button:hover {
//   background: blue;
// }
// ```

// ---

// # 12. Pseudo Elements

// ```css
// ::before
// ::after
// ::first-letter
// ::first-line
// ::selection
// ```

// Example:

// ```css
// p::first-letter {
//   font-size: 40px;
// }
// ```

// ---

// # 13. Responsive Design

// ## Media Query

// ```css
// @media (max-width: 768px) {
//   body {
//     background: red;
//   }
// }
// ```

// ---

// # 14. Common Values

// | Property        | Common Values         |
// | --------------- | --------------------- |
// | display         | block, flex, grid     |
// | position        | relative, absolute    |
// | overflow        | hidden, scroll        |
// | text-align      | left, center          |
// | font-weight     | normal, bold          |
// | justify-content | center, space-between |
// | align-items     | center                |
// | visibility      | visible, hidden       |

// ---

// # 15. Important CSS Functions

// ```css
// calc()
// clamp()
// min()
// max()
// var()
// url()
// rgb()
// rgba()
// hsl()
// ```

// Example:

// ```css
// width: calc(100% - 20px);
// ```

// ---

// # 16. CSS Variables

// ```css
// :root {
//   --main-color: blue;
// }

// p {
//   color: var(--main-color);
// }
// ```

// ---

// # 17. Common Shorthand

// ## Margin

// ```css
// margin: top right bottom left;
// ```

// ## Padding

// ```css
// padding: 10px 20px;
// ```

// ## Border

// ```css
// border: 1px solid black;
// ```

// ## Font

// ```css
// font: italic bold 16px Arial;
// ```

// ---

// # 18. Useful Layout Tricks

// ## Center Div

// ```css
// display: flex;
// justify-content: center;
// align-items: center;
// ```

// ## Full Screen

// ```css
// height: 100vh;
// ```

// ## Hide Element

// ```css
// display: none;
// ```

// ---

// # 19. Best CSS Learning Order

// 1. Selectors
// 2. Box Model
// 3. Position
// 4. Flexbox
// 5. Grid
// 6. Responsive Design
// 7. Animation
// 8. Advanced CSS

// ---

// # 20. Most Important CSS Properties (Top 30)

// ```css
// color
// background
// width
// height
// margin
// padding
// border
// display
// position
// top
// left
// right
// bottom
// flex
// grid
// justify-content
// align-items
// font-size
// font-family
// font-weight
// text-align
// line-height
// overflow
// z-index
// opacity
// transform
// transition
// animation
// box-shadow
// border-radius
// ```

// ---

// # 21. CSS Cheat Sheet (Ultra Short)

// ```css
// display: flex;
// justify-content: center;
// align-items: center;

// position: absolute;
// top: 0;

// margin: 10px;
// padding: 20px;

// font-size: 16px;
// font-weight: bold;

// transition: 0.3s;
// transform: scale(1.1);
// ```

// ---

// # 22. Recommended Practice Projects

// 1. Navbar
// 2. Card UI
// 3. Login Form
// 4. Dashboard
// 5. Portfolio
// 6. Responsive Website
// 7. Landing Page
// 8. Clone UI (YouTube/Netflix)

// ---

// # 23. Pro Tip

// Master these 5 areas deeply:

// * Flexbox
// * Grid
// * Positioning
// * Responsive Design
// * Animation

// That covers ~80% of real frontend CSS work.
