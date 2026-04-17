// Day-34

// Date: 17/04/2026
// Task: Read about req object properties and methods, and res object's properties and methods as learned about res.headersSent, res.redirect(), res.attachment() and res.download() with builded a simple api that serves a local file to download in client, also learned about how to share any remote file on our apiend point to serve client as download. And experiment download loadtesting with pm2 8 thread cluster hosting. Learned about difference between json and jsonp methods, as well as about nvm,npm,npx, and prettier,eslint,.nvmrc and about dependency types such as devDependencies, peerDependencies, bundledDependencies. Also started reading mongoDb docs.

// _______________________________________________________

// req.body => for getting parsed data of form-body or any body data sended over req by client
// for .body to work we have to use
// app.use(express.json()); //for json data
// app.use(express.urlencoded({extended:true})); //for parsing application/x-www-form-urlencoded


// req.cookies => we get cookies key-value pair data in this cookies object
// we have to use app.use(cookie-parser()); to work it.abs

// req.fresh => when the response is still "fresh" in the client's cache true is returned otherwise false
// when client sends the Cache-Control: no-cache request header to indicate an end-to-end reload request then this will return false;

//req.host => contains the host derived from the Host HTTP header
// when the trust proxy setting does not evaluate to false, this property will instead get the value from X-Forwarded-Host header field. This header can be set by the client or by the proxy.
// if there is more than one header in X-Forwarded-Host then first one will be considered.

// req.hostname => contains the hostname from the derived host header. other things are same as host

// req.ip => contains the remote IP address of the request.
// when the trust proxy setting does not evaluate to false then it will get the value from left-most-entry in the X-Forwarded-For header.

// req.ips

// req.method

// req.originalUrl
// -> req.Url is not a native Express property, it is inherited from Node's http module

// req.params => /user/:name=> req.params.name
// app.get("/files/*file",()=>{});
// GET /files/note.txt => ['note.txt']
// GET /files/images/image.png => ['images','image.png']

// req.path => //example.com/users?sort=desc => /users

// req.protocol
// => contains the reques to protocol string: either http or (for TLS requests) https.

// req.query => This property is an object containing a property for each query string parameter in the route. When query parser is set to disabled, it is an empty object {}, otherwise it is the result of the configured query parser.

// req.res => This property holds a reference to the response object that relates to this request object.

// req.route =>  contains the currently matched route
// app.get('/user/{:id}',()=>{});
// example output
// Route {
//     path: '/user/{:id}',
//     stack: [
//         Layer {
//             handle: [Function(anonymous)],
//             keys: [],
//             name: '<anonymous>',
//             params: undefined,
//             path: undefined,
//             slash: false,
//             matchers: [[Function: match]],
//             method: 'get'
//         }
//     ],
//     methods: [Object: null prototype] { get: true }
// }

// req.secure => a boolean property that is true if a TLS connection is established. Equivalent to the following
// req.protocol => 'https'

// req.signedCookies => when a cookie-parser middleware used and assigned any cookie with signed => true then that will be find in signedCookies not in simple cookies

// req.stale => indicates whether the request is "stale", and is the opposite of req.fresh

// req.subdomains => An array of subdomains in the domain name of the request
// Host : "tobi.ferrets.example.com"
// console.dir(req.subdomain); => ["ferrets","tobi"]

// req.xhr => A Boolean property that is true if the request's X-Requested-With header fiekd is "XMLHttpRequest", indicating that the request was issued by client library such as jQuery.

// ## Methods->
// req.accepts(types)
// check if specified content types are acceptable, based on the request's Accept HTTP header field

// req.acceptsCharsets(charset [, ...]);
// req.acceptsEncodings(encoding [, ...]);
// req.acceptsLanguages([lang, ...]);
// above all three returns first matched that acceptable and if not all then returns false.

// req.get("Content-Type"); //text/plain
// req.get("Something"); //undefined
// aliased as req.header(field);

// req.is(type);
// With Content-Type: text/html; charset=utf-8
// req.is('html') // => 'html'
// req.is('text/html') // => 'text/html'
// req.is('text/*') // => 'text/*'
// // When Content-Type is application/json
// req.is('json') // => 'json'
// req.is('application/json') // => 'application/json'
// req.is('application/*') // => 'application/*'
// // Using arrays
// // When Content-Type is application/json
// req.is(['json', 'html']) // => 'json'
// // Using multiple arguments
// // When Content-Type is application/json
// req.is('json', 'html') // => 'json'
// req.is('html') // => false
// req.is(['xml', 'yaml']) // => false
// req.is('xml', 'yaml') // => false

// req.range(size[, options])
// Range header parser.
// The size parameter is the maximum size of the resource.
// The options parameter is an object that can have the following properties.



// ___RESPONSE



// res.app => holds the reference to the instance of the Express application that is using the middlewares
// res.headersSent
// after res.send it will return true otherwise false

// res.locals => this property is used to set variables accesible in templates rendered with res.render

// res.req => this property holds a refernece to the request object that relates to this response object

// Methods
// res.append(field [, value])
// Appends the specified value to the HTTP response header field. If the header is not already set, it creates the header with the specified value. The value parameter can be a string or an array.
// calling res.set() after res.append() will reset the previously-set header value.
// res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
// res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
// res.append('Warning', '199 Miscellaneous warning')

// res.attachment([filename]) => sets the HTTP response content-disposition header field to "attachment".  If a filename is given, then it sets the Content-Type based on the extension name via res.type(), and sets the Content-Disposition “filename=” parameter.
// res.attachment('path/to/logo.png')

// res.cookie(name, value [, options]); => 
// options =>
// domain	|  String	|  Domain name for the cookie. Defaults to the domain name of the app.
// encode	|  Function	 |  A synchronous function used for cookie value encoding. Defaults to encodeURIComponent.
// expires	|  Date	 |  Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
// httpOnly	|  Boolean	 |  Flags the cookie to be accessible only by the web server.
// maxAge	|  Number	|  Convenient option for setting the expiry time relative to the current time in milliseconds.
// path	 |  String	 |  Path for the cookie. Defaults to “/”.
// partitioned	|  Boolean	|  Indicates that the cookie should be stored using partitioned storage. See Cookies Having Independent Partitioned State (CHIPS) for more details.
// priority	 |  String	 |  Value of the “Priority” Set-Cookie attribute.
// secure	|  Boolean	 |  Marks the cookie to be used with HTTPS only.
// signed	|  Boolean	 |  Indicates if the cookie should be signed.
// sameSite	|  Boolean or String

// res.download(path [, filename] [, options] [, fn]);
// Transfers the file at path as an “attachment”. Typically, browsers will prompt the user for download. By default, the Content-Disposition header “filename=” parameter is derived from the path argument, but can be overridden with the filename parameter. If path is relative, then it will be based on the current working directory of the process or the root option, if provided.

// for serving any url file as download to the user then use below code as res.download path locates for only local files
// app.get("/download", async (req, res) => {
//     // res.download("./../Day-33/d33.js",(err)=>{
//     //     console.log(err);
//     // });
//     const url = "https://png.pngtree.com/png-clipart/20250105/original/pngtree-user-profile-avatar-icon-vector-png-image_19805162.png";

//     const response = await axios.get(url, { responseType: "stream" });
//     console.log(response.headers);
//     res.attachment(Date.now().toString() + "." + String(response.headers['content-type']).split('/')[1]);
//     await response.data.pipe(res);
// })

// res.end()
// res.format(object)
// The following example would respond with { "message": "hey" } when the Accept header field is set to “application/json” or “*/json” (however, if it is “*/*”, then the response will be “hey”).
// res.format({
//     'text/plain'() {
//         res.send('hey')
//     },

//     'text/html'() {
//         res.send('<p>hey</p>')
//     },

//     'application/json'() {
//         res.send({ message: 'hey' })
//     },

//     default() {
//         // log the request and respond with 406
//         res.status(406).send('Not Acceptable')
//     }
// })
// or 
// res.format({
//     text() {
//         res.send('hey')
//     },

//     html() {
//         res.send('<p>hey</p>')
//     },

//     json() {
//         res.send({ message: 'hey' })
//     }
// })

// res.get(field)

// res.json([body])
// sends a json response. converts any json type parameter to json string using JSON.stringify()

// res.jsonp([body]);
// ____ The Diff between json and jsonp
// in normal requests like simple /test jsonp behaves as json and returns normal json but when we attach query in express like /test?callback=myFunc then jsonp return a callback function named myFunc with the json wrapped inside, we can modify by what query the jsonp should return callback by app.set("jsonp callback name","cb");
// now we can do /test?cb=myFunc
// before the cors so widely supported the older browsers and clients uses this for fetching data cross-domain

// res.location(path);

// res.redirect([status,] path);

// res.render(view [, locals] [, callback]);
// send the rendered view to the client
// res.render('index')
// // if a callback is specified, the rendered HTML string has to be sent explicitly
// res.render('index', (err, html) => {
//   res.send(html)
// })
// // pass a local variable to the view
// res.render('user', { name: 'Tobi' }, (err, html) => {
//   // ...
// })

// res.send([body]);

// res.sendStatus(statusCode);

// res.set(field [, value]);
// sets the response's HTTP header field to value.

// aliased as res.header(field [, value]);

// res.status(code);
// sets the HTTP status for the response and it's a chainable
// res.status(403).send();

// res.tyoe(type);
// res.type('.html') // => 'text/html'
// res.type('html') // => 'text/html'
// res.type('json') // => 'application/json'
// res.type('application/json') // => 'application/json'
// res.type('png') // => image/png:

// res.vary(field);
// Adds the field to the Vary response header, if it is not there already.
// res.vary('User-Agent').render('docs');


// ______Router:
// A router object is an instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

// router.all(path, [callback, ...] callback);
// router.all('{*splat}', requireAuthentication, loadUser);

// router.METHOD(path, [callback, ...] callback)
// router.param(name,callback);
// whenever name will apppear in any route param then it will automatically call callback assosiated with that name before loading it

// router.route(path)
// Returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware.

// router.use([path],[function, ...] function);


// nvm npm npx

// NVM -> node version manager -> manages the node version to use
// NPM -> node package manager -> manages dependencies and dependency tree and install it locally or globally and provides scripts as npm run for automation
// NPX -> node package execute -> executes the package without being installed globally, like below,
// npx create-react-app myApp
// download and runs create-react-app without installing globally


// prettier eslint nvmrc

// prettier -> formatting code
// eslint -> checking code quality
// npm install eslint
// npx eslint --init
// it asks some questions and creates .eslintrc.json
// npx eslint .
// auto fix issues -> npx eslint . --fix
// nvmrc
// a .nvmrc file ensures a single node version to be installed or used to run you project. as it solves the not running on my machine problem


// dev dependencies and types
// dependencies ->
// dependencies
// purpose -> packages required at runtime (production)
// exa -> npm install express adds dependencies

// devDependencies
// purpose -> packages needed only during development
// exa -> npm install nodemon adds devDependcies

// peerDependencies
// purpose -> declare your package needs host package to provide dependencies
// exa -> react plugin might list "react":"^18.0.0" as peerDependency.

// optionalDependencies
// purpose -> Dependencies that are not strictly required 
// exa -> platform-specific modules(like fsevents in macOS)

// bundledDependencies
// purpose -> Packages bundled together when publishing a module to npm
// exa -> Ensures consumers don't need to install them seperately.

// overrides
// purpose -> Force specific versions of transitive dependencies.
// exa -> Security patches or bug fixes when upstream isn't updated.



// json and jsonp
// ____ The Diff between json and jsonp
// in normal requests like simple /test jsonp behaves as json and returns normal json but when we attach query in express like /test?callback=myFunc then jsonp return a callback function named myFunc with the json wrapped inside, we can modify by what query the jsonp should return callback by app.set("jsonp callback name","cb");
// now we can do /test?cb=myFunc
// before the cors so widely supported the older browsers and clients uses this for fetching data cross-domain


// ____________________________________________________
const axios = require('axios');
const expr = require("express");

const app = expr();

app.get("/test", async (req, res, next) => {
    // console.log(next);
    // console.log(req.xhr);
    // res.jsonp({ message: "OK" });
    res.links({
        next: 'http://api.example.com/users?page=2',
        last: 'http://api.example.com/users?page=5'
    })
    // res.redirect("/download");
    setTimeout(() => {
        res.send();
    }, 500);
});

app.get("/download", async (req, res) => {
    res.download("./../Day-33/d33.js", (err) => {
        console.log(err);
    });
    // const url = "https://png.pngtree.com/png-clipart/20250105/original/pngtree-user-profile-avatar-icon-vector-png-image_19805162.png";

    // const response = await axios.get(url, { responseType: "stream" });
    // res.attachment(Date.now().toString() + "." + String(response.headers['content-type']).split('/')[1]);
    // await response.data.pipe(res);
})
app.use((err, req, res, next) => {
    // console.log(err);
    res.status(500).send("Something went wrong.");
})

const server = app.listen(5000, () => {
    console.log("Server is running on port 5000, \n\t http://localhost:5000/");
});

server.keepAliveTimeout = 60000;
server.headersTimeout = 65000;