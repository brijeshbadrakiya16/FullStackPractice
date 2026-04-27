// Day-40

// Date: 27/04/2026
// Task : Started reading Redis docs as learned about how connect to database(local/cloud) with js using both 'node-redis' and 'ioredis' module, also started learning about datatypes which can be used to storedata into redis as read about strings, lists, set, hash, with most of it's crud methods, understand in which scenario will it be use and learned about FLUSHALL abd FLUSHDB method as how it can clear entire database. Entered 10 Games data into Yudiz portfolio as the task given by Hiten sir.

// ______________________________________________________

// ___________________ Redis


// npm install redis

// ##### Connect to client

// localhost on port 6379

// import { createClient } from 'redis';
// const client = createClient();
// client.on('error',err => console.log("Redis Client Error : ",err));

// await client.connect();


// store and retrieve a simple string

// await client.set("key","Value");
// const value = await client.get("key");
// console.log(value); -- "Value"

// Store and retrieve a map

// await client.hSet("user-session:123",{
//     name: "John",
//     surname: "Smith",
//     company: "Redis",
//     age: 29
// })

// let userSession = await client.hGetAll('user-session:123');

// console.log(JSON.stringify(userSession)); //{"name":"John","surname":"Smith","company":"Redis","age":"29"}


// to connect to a different host or port use a connection string in below format
// redis[s]://[[username][:password]@][host][:port][/db-number]

// createClient({
//     url: 'redis://alice:foobared@awesome.redis.server:6380'
// })

// close connection by

// await client.quit()



// ______________________________________________________

// _________________ ioredis  (javascript)

// npm install ioredis

// import {Redis} from 'ioredis';

// const redis = new Redis();

// await redis.set('key','value');
// const value = await redis.get('key');
// console.log(value); 'value'

// await redis.hset('user-session:123',{name:"John",age:29})

// const userSession = await redis.hgetall("user-session:123");
// console.log(JSON.stringify(userSession,null,2));

// redis.disconnect();


// ------ Datatypes :

// String
// Hash
// List
// Set
// Sorted set
// Vector set
// Stream
// Bitmap
// Bitfield
// Geospatial
// JSON
// Probabilistic data types
// Time series

// ____________________________________________

// String

// CLI ->
// > SET bike:1 Deimos
// OK
// > GET bike:1
// "Deimos"

// JavaScript(node-redis) ->
// const res1 = await client.set("bike:1","Deimos");
// console.log(res1); //OK
// const res2 = await client.get("bike:1");
// console.log(res2); //Deimos

// values can be strings (including binary data) of every kind, for instance you can store a jpeg image inside a value.
// A value can't be bigger than 512 MB.

// there some options to provide in it if you want something different happen according that option

// NX : if the key not exists in redis then and then it will add
// XX : if the key already exists in redis then and then it will add

// const res3 = await client.set("bike:1", "bike", {'NX': true});
// console.log(res3);  // null
// console.log(await client.get("bike:1"));  // Deimos
// const res4 = await client.set("bike:1", "bike", {'XX': true});
// console.log(res4);  // OK

// other function like mSet and mGet for retrieving of adding multiple key value pair at single time

// const res5 = await client.mSet([
//     ["bike:1", "Deimos"],
//     ["bike:2", "Ares"],
//     ["bike:3", "Vanth"]
// ]);

// console.log(res5);  // OK
// const res6 = await client.mGet(["bike:1", "bike:2", "bike:3"]);
// console.log(res6);  // ['Deimos', 'Ares', 'Vanth']

// Strings as counters

// await client.set("total_crashes", 0);
// const res7 = await client.incr("total_crashes");
// console.log(res7); // 1
// const res8 = await client.incrBy("total_crashes", 10);
// console.log(res8); // 11


// _____________________________________________________


// Lists
// Treat a list like a queue (first in, first out):

// const res1 = await client.lPush('bikes:repairs', 'bike:1');
// console.log(res1);  // 1

// const res2 = await client.lPush('bikes:repairs', 'bike:2');
// console.log(res2);  // 2

// const res3 = await client.rPop('bikes:repairs');
// console.log(res3);  // bike:1

// const res4 = await client.rPop('bikes:repairs');
// console.log(res4);  // bike:2

// Treat a list like a stack (first in, last out):

// const res5 = await client.lPush('bikes:repairs', 'bike:1');
// console.log(res5);  // 1

// const res6 = await client.lPush('bikes:repairs', 'bike:2');
// console.log(res6); // 2

// const res7 = await client.lPop('bikes:repairs');
// console.log(res7);  // bike:2

// const res8 = await client.lPop('bikes:repairs');
// console.log(res8);  // bike:1

// Check the length of a list:
// const res9 = await client.lLen('bikes:repairs');
// console.log(res9); // 0

// Atomically pop an element from one list and push to another:
// const res10 = await client.lPush('bikes:repairs', 'bike:1');
// console.log(res10);  // 1

// const res11 = await client.lPush('bikes:repairs', 'bike:2');
// console.log(res11);  // 2

// const res12 = await client.lMove('bikes:repairs', 'bikes:finished', 'LEFT', 'LEFT');
// console.log(res12);  // 'bike:2'

// const res13 = await client.lRange('bikes:repairs', 0, -1);
// console.log(res13);  // ['bike:1']

// const res14 = await client.lRange('bikes:finished', 0, -1);
// console.log(res14);  // ['bike:2']

// To limit the length of a list you can call LTRIM:

// ____________________________________________________

// const { createClient } = require('redis');

// (async () => {
//     const client = createClient({
//         username: 'default',
//         password: 'CXw2gPLTj2LbvhmA4FGazo4yphqLk4Km',
//         socket: {
//             host: 'redis-11899.c330.asia-south1-1.gce.cloud.redislabs.com',
//             port: 11899
//         }
//     });

//     client.on('error', err => console.log('Redis Client Error', err));

//     await client.connect();

//     await client.del('foo');
//     const result = await client.get('foo');
//     console.log(result)  // >>> bar

//     client.close();
// })();

// if i used  common js style but not wrapped code in iife's then still it is throwing me error like you have to us es syntax only but although i haven't wrote type:"module" still it stopping me to running comman js code,
// should it happened because the redis is es module type or i can not write await openly if i wrote then node will auto consider it as es module

// question it self has answer

