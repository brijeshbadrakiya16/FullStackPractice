// Day-29

// Date: 10/04/2026
// Task: Understand difference between package-lock.json and package.json, also between ^ sign and ~ sign before versions, Watched E4 as learned about routing type, and regex routing, routing orders, tried a code where i am handling infinite timeout request to automatically send res after 20s, read connect-rid, cookie-parser, cookie-session, cors as learned how to set cookies and restrict it for changing by user and cors to only allow certain site's js to read server's response. 

// _____________________________________________________



// in package.json in dependencies the ^ (carat) sign before the version is behave as if like ^5.2.1 meaning it will be automatically update to the version if newyear version comes of formate 5.x.x,
//  and ~ (tilda) sign before the version is behave as if like ~5.2.1 meaning it will allowed all patch upgrades if newer version are of formate 5.2.x but not the minor versions

// the difference betweem package-lock.json and package.json is the package.json have information about our project and our installed dependencies like here express but package-lock.json have exact version of installed dendencies and it have in-depth info about dependency tree like express -->  it has it's own dependencies and then chains, so when we write npm install then package-lock.json maintains exact dependency tree on user side same as source and helps to faster the installing process

// order of the routes will matter and maintained

// "/abc" only for path /abc
// /ab?c/ => matches to ac or abc only (0 or 1 b)
// /ab+c/ => matches to abc, abbb...c/ only (1 or more b)
// /ab*c/ => matches to ac, abc, abbb...c (0 or more b)
// on above + and ? will not work with string just * is working as shown, "/ab*c" => abc, absdjhc, absajhcfjsd
// /^(.|a).*c$/ => matches to anything ending with c
// /.*fly$/ => matched anything that ends with fly
// but instead of using strings use pure regex it will work as intended and fine

//suppose now for dynamic routing
// request is /abc?userId=101&role=user
// then will get userId from req.query object
// request is /abc/1



// ______________________________________________________

// Middlewares

// # __ connect-rid

// npm install connect-rid

// var rid  = require('connect-rid');

// app.use(rid({ //header: 'X-RID' }));


// # __ cookie-parser

// npm install cookie-parser

// var cookieParser = require('cookie-parser');

// cookieParser(secret, options)

// secret : string or array used for signing the cookies with secret
// options : an object is passed to cookie.parse as second option. decode : a function to decode the value of cookie.

// cookieParser.JSONCookie(str) => parse a cookie value as a JSON cookie. this will return the parsed JSON value if it was JSON coolie, otherwise, it will return the passed value

// cookieParser.JSONCookies(cookies) => given an object, this wil iterate over the keys and call JSONCookie on each value, replacing the original value with the parsed value and return the original object which was passed in

// cookieParser.signedCookie(str,secret) => parses cookie value as signed cookie. returns unsigned value if cookie was signed and signature is matched but if not matched then returns false

// cookieParser.signedCookies(cookies,secret) => same as above just when cookie is signed and signature is matched then it will remove that from object which we have passed and add it to new object which will return

// in simple word, cookie-parser is used to parse the cookies which are coming from request cookie header, the secrete is used with cookie value that if while setting cookie we provide third arguement {signed : true} then it will store that provide key's value as s:value:encryption this encryption is hmac of our secret and if user changes the cookie then it will automatically cookie value will be false even if user just changes in value or any encryption.
// all this type of signed cookies will be in req.signedCookies

//Example below

// var expr = require('express');
// var cookieParser = require("cookie-parser");

// var app = expr();

// app.use(cookieParser("The whole new secret"));

// app.get('/', (req, res) => {
//     console.log("Cookies :", req.cookies);
//     console.log("Signed Cookies :", req.signedCookies);
//     res.cookie("name", "true", { signed: true });
//     res.end();
// })

// app.listen(8000);


// # __ cookie-session

// same like cookie-parser but here we are not doing a manual work, the cookie-session attach a session object that we can use to get or set any key value pair, the cookie is stored on the browser side not same as original session but it has expire time and all the things which normal cookie and session have

// npm install cookie-session

// var cookieSession = require('cookie-session');
// var express = require('express');

// var app = express();

// app.use(cookieSession({
//     name: "session",
//     keys: ["The new secret"],
//     maxAge: 24 * 60 * 60 * 1000
// }))

// app.get("/", (req, res) => {
//     console.log(req.session.isChanged);
//     req.session.count = (req.session.count || 0) + 1;
//     res.send(`You have visited ${req.session.count} times.`);
// })

// app.listen(8000);


// # __ cors

// npm install cors

// cors myths/misconceptions

// “CORS blocks requests from disallowed origins”
// No. Your server receives and processes every request. CORS headers tell the browser whether JavaScript can read the response—not whether the request is allowed.

// “CORS protects my API from unauthorized access”
// No. CORS is not access control. Any HTTP client (curl, Postman, another server) can call your API regardless of CORS settings. Use authentication and authorization to protect your API.

// “Setting origin: 'http://example.com' means only that domain can access my server”
// No. It means browsers will only let JavaScript from that origin read responses. The server still responds to all requests.

// as you can test below in postman it will work though we have marked original to https://example.com

// var express = require('express');
// var cors = require('cors');
// var app = express();

// app.use(cors({
//     origin: 'https://example.com',
//     optionsSuccessStatus: 200,
// }));
// cors default to this below
// cors({
//     "origin" : "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
// })
// app.get("/products/:id", (req, res) => {
//     res.json({ msg: "hello" });
// })

// app.listen(8000);

// console.log(require("http").STATUS_CODES);