// Day-33

// express.static()=> to serve static files from local folder
// app.all(path,callbacks)=> resolves for all http type req
// app.disable(name) => set false to setting name string value
// app.disabled(name) => check and return result of name as it is disabled or not
// app.enable(name) -> set name setting to true
// app.enabled(name) => check and return status of name
// app.engine(ext,callback)=> app.engine('html',require('ejs').renderFile) in this EJS provides a .renderFile() method with the same signature that express expects (path,options,callback);
// const engined = require("consolidate");  //exception
// app.engine("haml",engines.haml); 
// app.engine("html",engines.hogan);

// app.get(name) => return the value of name app setting where name is one the strings in the app settings table
// example
// app.get('title'); //undefined
// app.set('title','My site');
// app.get('title'); // My site

// app.get(path,callbacks); => routes get requests to path

// app.listen(path,callback) => Starts Unix socket and listens for connection on the given path, identical to node's http.server.listen();
// exa -> app.listen('/tmp/sock');

// app.listen([port [, host [, backlog]]][,callback]);
// binds and listens for connections on the specified host and port.
// app.listen(3000);

// nvm npm npx
// prettier eslint nvmrc 
// dev dependencies and types
// json and jsonp

// app.param(name,callback) => it will calll the callback whenever in any route path the named name parameter will come like app.param('userId',(req,res,next,userId)=>{}) for the app.post("/user/:userId",(req,res)=>{});

// app.path()
// Returns the canonical path of the app, a string.
// app.use('/blog', blog)
// blog.use('/admin', blogAdmin)

// console.log(app.path()) // ''
// console.log(blog.path()) // '/blog'
// console.log(blogAdmin.path()) // '/blog/admin'

// app.render(view, [locals], callback)
// Returns the rendered HTML of a view via the callback function.

// app.render(view, [locals], callback)
// Returns the rendered HTML of a view via the callback function.
// Think of app.render() as a utility function for generating rendered view strings. Internally res.render() uses app.render() to render views.

//app.route(path)
// Returns an instance of a single route, which you can then use to handle HTTP verbs with optional middleware.

// app.set('trust proxy', (ip) => {
//     if (ip === '127.0.0.1' || ip === '123.123.123.123') return true // trusted IPs
//     else return false
// })

// req.app => it provides an instance of an app
// req.baseUrl => the url path on which a router intance was mounted
// req.body => contains key-value pairs of data submitted in the request body. by default it is undefined and if populated with body-parser or some other middlewares then it will hold the value



// _______________________________________________________

const expr = require("express");

const app = expr();

// app.use("/", expr.static(__dirname.slice(0, __dirname.length - 6)));

app.get("/test", (req, res, next) => {
    // console.log(next);
    res.jsonp(req.body);
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something went wrong.");
})

app.listen(5000, () => {
    console.log("Server is running on port 5000, \n\t http://localhost:5000/");
});


// app.engine('bb', (filepath, options, callback) => {
//     fs.readFile(filepath, (err, content) => {
//         if (err) return callback(err)
//         const rendered = `#title# \n #message#`.replace("#title#", `<title>${options.title}</title>`).replace("\n", "</br>").replace("#message#", `<h2>${options.message}</h2>`);
//         return callback(null, rendered);
//     })
// })

// app.get("/",(req,res)=>{
//     res.render('index',{title:"hey",message:"hello there!"});
// })