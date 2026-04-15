// Day-31


// ________________________________________________________

// _____ # S2 E6
// learned to connect the server to mongodb cluster using mongoose, learned how to create schema and models and implemented to save the dummy data to the database.

// _____ # S2_E7
// learned building basic apis with help of express and did crud operation over user with the user database.

// _____ # S2_E8
// learned about validations and schema validations and about validator package also, learned how to sanitize data before processing it. restricting user from entering anonymus fields and unethical data.

// _____ # S2_E9
// updated signup api valid the incomming data before passing it to model with the help of helper function, learned and used bcrypt package to encrypt the password before storing it to the DB.
// created login api to validated posted credentials and check if the password and email matches in DB

// ### Middlewares

// #__ ErrorHandlers

// npm install errorhandler
// var error handler = require("errorhandler");

// Create new middleware to handle errors and respond with content negotiation.

// Options => {log : true/false/function} (console.log)

// if (process.env.NODE_ENV === "development"){
//     app.use(errorhandler());
// }

// #__ method-override

// npm install method-override

// it is middleware to use as to replace the req.method with provided value because some browser or pages do not support methods like put,patch,delete but it is common in rest api so we override it with some parameter provided by client so over server can actually understand it

// like below

// var methodOverride = require("method-override");
// app.use(methodOverride("_method"));

// now when client write any form like below
// <form method="POST" action="/api?_method=DELETE">
// <button>Click</button></form>
// then _method parameter overrides req.method with it's value

// #___ morgan

// npm install morgan

// var morgan = require('morgan');

// morgan(format,option)

// Options ->
// Immediate -> logs the request line before responding
// skip -> morgan("any format",{
//     skip: (req,res)=>{return res.statusCode<400}
// })
// stream

// formats ->
// 1. "combined"=>
// : remote - addr - : remote - user[: date[clf]]":method :url HTTP/:http-version" : status: res[content - length] ":referrer" ":user-agent"
// # will output
// :: 1 - -[27 / Nov / 2024:06: 21: 42 +0000] "GET /combined HTTP/1.1" 200 2 "-" "curl/8.7.1"

// 2. "common" =>
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
// # will output
// ::1 - - [27/Nov/2024:06:21:46 +0000] "GET /common HTTP/1.1" 200 2

// 3. "dev" =>
// :method :url :status :response-time ms - :res[content-length]
// # will output
// GET /dev 200 0.224 ms - 2

// 4. "short" =>
// :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
// # will output
// ::1 - GET /short HTTP/1.1 200 2 - 0.283 ms

// 5. "tiny" =>
// :method :url :status :res[content-length] - :response-time ms
// # will output
// GET /tiny 200 2 - 0.188 ms

// app.use(morgan("dev")); //can implement like this