// Day-28


// _______________________________________________________

// Express

// ___MiddleWares

// ## body-parser

// npm install body-parser

// const bodyparser = require('body-parser');
// const json = require('body-parser/json');
// or bodyparser.json;  for all below
// const urlencoded = require('body-parser/urlencoded');
// const raw = require('body-parser/raw');
// const text = require('body-parser/text');

// uses to parse the request of certain type like below

// if app.use(bodyparser.json()); it will parses all the json req
// if app.use(bodyparse.urlencoded()); it will parses encoded urls

// it generally used in req.body parsing

// ## compression

// npm install compression

// var compression = require('compression');

// following compression coding  supported

// deflate
// gzip
// br (brotil)

// brotil is supported only since node.js version 11.7.0

// app.use(compression([options]);

// this middleware attempts to compression all the request's responses which will pass through the middleware based on options object

// this will not compress the res which have header of Cache-control to no-transform , because compressing will transform the body

// options ->

// chunkSize : Number => default to zlib.contants.Z_DEFAULT_CHUNK or 16384

// filter : Function => function(req,res) if returns true then compresses otherwise not , default function check the res.getHeader('Content-Type') is compressible

// level : Number => default to zlib.contants.Z_DEFAULT_COMPRESSION or -1,  you can give value from 0 to 9, higher value meaning high compression and slower response time, 0 means no compression or 1 or lower values means lower compression and faster res time, -1 is equvivalent to 6

// memLevel : Number => default 8 , 1(minimum) to 9(maximum)

// strategy : Number => default to zlib.constants.Z_DEFAULT_STRATEGY, or you can set zlib.constants.Z_FILTERED, zlib.constants.Z_HUFFMAN_ONLY, zlib.constants.Z_FIXED, zlib.constants.Z_RLE


// ___________________________________________________


// ______ S2 E2

// Requirements

// 1. Create an Account
// 2. Login
// 3. Update your profile
// 4. Feed page - explore (other people)
// 5. send connection request
// 6. see our matched (people who accepted connection)
// 7. see the request we've sent/receive
// 8. update your profile  

// Tech Planning or Enginnering Planning

// 2 Microservices -> FE and BE
// BE => NodeJS , MongoDB | FE => React
// and much more

// Before starting Codding we'll do LLD


// LLD 
// # DB Design :
// _Collections
// -User -> firstname,lastname,emailID,password,age,gender,...
// -ConnectionRequests -> fromUserId,toUserId,status => pending default, then rejected or accepted/approved or ignored/cancelled or blocked

// API Design {REST API}

// Rest API -> (Representational State Transfer) is an architectural
// GET, POST, PUT,  PATCH, DELETE

// POST /signup
// POST /login
// GET /profile
// POST /profile
// PATCH /profile
// Delete /profile
// POST /sendRequest - ignore - interested
// POST /reviewRequest - accept - reject
// GET /requests
// GET /connections

