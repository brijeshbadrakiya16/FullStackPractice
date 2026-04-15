// Day-32

// Watched S2 E11 as learned how to handle cookies with the help of jwt, implemented a auth middle ware that restricts user from accessing apis rather then /signup or /login. and also learned how to create and  use custom middlewares. 
// Watched S2 E13 as learned how to use routes to handle api routes and also handle multiple conditions on connection request api to handle connection between two user. Also learned about indexing in mongodb as how it helps on response back when db have large amount of data. Learned about compound indexs.
// Read about Multer,response-time,serve-favicon,serve-index,server-static,express-session,connect-timeout,vhost, as learned in detail about multer,timeout and express-session middlewares.

// _______________________________________________________

// #___ S2 E10

// JWT
// When user hits login with email and password, server will creat a Token and wrape JWT inside it and then user have to store it and send it with all over request, we'll authorize users with that JWT Token.

// learned how to handle cookies with the help of jwt, implemented a auth middle ware that restricts user from accessing apis rather then /signup or /login.
// learned how to use custom middlewares


// Middlewares



// ## Multer

// Multer is a node.js middleware for handeling multipart/form-data

// Multer will not precess the form which do not multipart/form-data

// npm install multer

// multer adds a body object and a file or files object to the request and stores text-fields data of form into body and file to file or files

//<form action="/profile" method="post" enctype="multipart/form-data">
//    <input type="file" name="avatar" />
//</form>

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" })

// upload.single("write down here the field name of which we are accepting the file like from above example it would be --- avatar ");

// upload.array("like same - photos", 10);

// upload.fields([{ name: "avatar", maxCount: 1 }, { name: "photos", maxCount: 8 }]);

// if we want to handle just only the text fields then we need to pass none

// upload.none();

// this all above methods are supposed to pass in app.post before the route handlers

// each file object contain below infos

// fieldname => Field name specified in form
// originalname => name of the file on the user's computer
// encoding => Encoding tyoe of the file
// mimetype => Mime type of the file
// size => Size of the file in bytes
// destination => The folder to which the file has been saved (diskstorage)
// filename => diskstorage(file have been saved with destination)
// path => the full path to the uploaded file
// buffer => a buffer of the entire file

// multer(options)
// dest or storage => where to store the files
// fileFilter =>  function to control which file will be accepted
// limits => limits uploaded data
// preservePath
// defParamCharset

// storage ->
// DiskStorage ->  it gives you full control on storing the files in disk

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,'/tmp/my-uploads')
//     },
//     filename: function (req,file,cb){
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random * 1E9);
//         cb(null,file.fieldname + "-" + uniqueSuffix);
//     }
// })
// const upload = multer({storage:storage});

// limits ->
// fieldNameSize | Max field name size | 100 bytes
// fieldSize | Max field value size (in bytes) | 1MB
// fields | Max number of non-file fields | Infinity
// fileSize | For multipart forms, the max file size (in bytes) | Infinity
// files | For multipart forms, the max number of file fields | Infinity
// parts | For multipart forms, the max number of parts (fields + files) | Infinity
// headerPairs| For multipart forms, the max number of header key=>value pairs to parse | 2000

// function fileFilter (req, file, cb){
//     // To reject
//     cb(null, false);

//     // To accept
//     cb(null, True);

//     //or if anything goes wrong
//     cb(new Error("I don\'t have a clue!"));
// }


// ## response-time

// npm install response-time

// app.use(responseTime());

// options
// digits -> fixed number | default to 3 -> 2.300 ms
// header
// suffix -> default true-> 2.300ms / otherwise 2.300

// ## serve-favicon

// npm install server-favicon

// var favicon = require("serve-favicon");
// app.use(favicon(path.join(__dirname,"public","favicon.ico")));


// ## serve-index

// Serve URLs like /ftp/thing as public/ftp/thing
// The express.static serves the file contents
// The serveIndex is this module serving the directory
// app.use('/ftp', express.static('public/ftp'), serveIndex('public/ftp', {'icons': true}))


// ## serve-static

//  app.use(serveStatic('public/ftp', { index: ['default.html', 'default.htm'] }))


// ## express-session

// npm install express-session

// var session = require("express-session");

// session(options)
// Create a session middleware with the given options.

// Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.

// Warning The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

// var app = express()
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: function(req) {
//     var match = req.url.match(/^\/([^/]+)/);
//     return {
//       path: match ? '/' + match[1] : '/',
//       httpOnly: true,
//       secure: req.secure || false,
//       maxAge: 60000
//     }
//   }
// }))

// cookie.domain -> default no value
// cookie.expires -> Date object , default no value, if both expires and maxAge then last one will be considered and it should good practice to use maxAge instead of exp

// cookie.httpOnly => boolean

// cookie.maxAge => number(in ms)
// cookie.partitioned => boolean
// cookie.path => default -> "/"
// cookie.priority => not fully standardized
// cookie.samesite => true, false, "lax", "none", "strict","auto"

// cookie.secure => boolean => recommended to true

// genid : function(req){ return genuuid(); };
// name :
// proxy : true/false/undefined
// resave : Forces the session to be saved back to the session store, even if the session was never modified during the request. also have some race conditions issues. Defaults to true
// rolling : Force the session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. Default -> true
// saveUninitialized : Forces a session that is “uninitialized” to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with race conditions where a client makes multiple parallel requests without a session.
// secrete : "string"
// unset : default -> "keep", if 'destory' then session destroys within the response.

// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))

// // Access the session as req.session
// app.get('/', function (req, res, next) {
//     if (req.session.views) {
//         req.session.views++
//         res.setHeader('Content-Type', 'text/html')
//         res.write('<p>views: ' + req.session.views + '</p>')
//         res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//         res.end()
//     } else {
//         req.session.views = 1
//         res.end('welcome to the session demo. refresh!')
//     }
// })

// req.session.id
// req.session.cookie
// req.sessionId -> to get the id of loaded session

// ## connect-timeout

// npm install connect-timeout
// var timeout = require("connect-timeout");
// app.use(timeout('5s'));
// app.use()...multiple below
// it will halts the request for 5s and won't let it go to down middlewares


// or use like this also
// app.get("/path",timeout("3s"),routeHandler(req,res));


// ## vhost

// npm install vhost

// vhost(hostname,handle);
// Create a new middleware function to hand off request to handle when the incoming host for the request matches hostname. The function is called as handle(req, res, next), like a standard middleware.