// Day-35

// Date: 20/04/2026
// Task: Watched episodes 1 to 29 from mongoDB playlist from youtube as learned about, find queries, projection options, diff between find and findOne, insert queries, delete queries and update queries with all options as $set,$unset and upsert, learned about schema validations , write concerns, datatypes in mongoDB, learned about comparison operators, logical operators and other operators such as $exists, $type, $expr, $regex, $jsonSchema, $mod, $text, $and, $all, $size, .sort(), $inc, $mul, $min, $max, $unset, and learned to handle nested objects, arrays and it's operators such as $push, $pull, $pop, and also learned about indexing such as single, multiple, partial, compound, text, and it's pros and cons, also learned aggregate function as did multiple queries with using, $group, $$ROOT, $match, $unwind, $sum, $avg, $sort, and also learned about $filter, as understand about pipeline in aggregate.

// ________________________________________________________

// To manually start mongoDB
// net start mongodb
// to stop -> net stop mongoDb

// to create db or to use it
// use "db name"

// to create new collection in current db
// db.createCollection("collectionName");

// to use any query inside your collection
// db.CollectionName.anyQueryMethod


// insert
// db.student.insertOne({Name:"Brijesh",Age:20});
// db.student.insertMany([{},{},{}])


// update
// db.student.update({name:"Ram"},{$set : {idCards: {hasPanCard:false,hasAdhaarCard:true}}});

// find
// db.student.find({}); / find();

// db.student.find({hobbies:"value"}); //if hobbies is array

// if student have nested object
// db.student.find({"idCards.hasPanCard":anyValue}); or '.'

// find
// always returns cursor //
// like doing db.student.find({nofiled:true}); //entering the field which is not in any document of our collection
// it will return "       ", we see empty space without any quotes, becuse it is returning a cursor
// like we have thousands of data if we do db.student.find(); then we'll definetly not see all thousands of data in one go in mongo shell, it shows some 10 to 20 documents and asks to enter 'it' for next 10 to 20 documents

// we can invoke any function like skip(), limit(), forEach() or count() at the end of find query because it is returning the cursor but we can't do that in  fincOne as it does return document instead


// findOne
// always returns a document or null if no document found

// create or add document

// insertOne or insertMany
// db.student.insertOne({});

// one thing is that we can insert empty object also with below query
// db.student.insertOne({});
// db.student.insertMany({});

// update
// db.students.updateOne(filter,set);
// db.students.updateMany(filter,set);

// we want to update age 13 whose age is 12
// db.student.updateMany({age:12},{$set:{age:13}});

// we provided any field in $set which is not available in our document then it will simply insert it

// delete
// db.students.deleteOne({name:"Brijesh"});
// db.students.deleteMany({age:13});

// to delete all documents from collection
// db.collectionName.deleteMany({});

// projections
// db.students.find({},{name:1,_id:1});
// possible comninations (w.r.t car)
// {_id:0,maker:1,model:1}
// {maker:1,model:1,_id:0}
// {maker:0} to just show all fields without maker
// {maker:0,model:0}
// {maker:-1} // or {maker:8} any number instead of 0 works as 1
// Not possible
// {maker:0,model:1,_id:0}
// {_id:0,maker:1,model:0}

// DataTypes in mongoDB

// Text
// Boolean
// Number -> Integer (int32)
//        -> NumberLong (int64)
//        -> NumberDecimal
// ObjectId
// ISODate
// Timestamp
// Array
// Embedded document

// we can use typeof on any field to check the datatype
// like below
// typeof db.student.findOne({name:"Brijes"}).age;
// number
// or string, boolean or object for array,data,timestamp

// to delete database or collection

// show dbs or show databases

// to drop specific collection
// db.collectionName.drop();

// to drop all collections
// db.dropDatabase();

// order
// if do like
// db.books.insertMany([{_id:"A",name:"A"},{_id:"B","name","B"}]);
// then tried
// db.books.insertMany([{_id:"C"},{_id:"A"},{_id:"E"}]);
// we'll get error at "A"
// but if we check that documents with find
// then we get
// [{_id:"A"},{_id:"B"},{_id:"C"}];
// but "E" is not inserted because insertMany works synchronously and adds documents in one by one order
// to change it we can pass ordered option in options
// db.insertMany([{},{},{}],{ordered:false}); //Now all valid are been added

// --- how to add schema validations in mongoDB

// db.createCollection("collectionName",{
//     validator:{
//         $jsonSchema:{
//             required: ["name","price"],
//             properties:{
//                 name:{
//                     bsonType:'string',
//                     description:"must be a string and required"
//                 },
//                 price:{
//                     bsonType:'number',
//                     description: "must be a number and required"
//                 }
//             }
//         }
//     },
//     validationAction:"error" //or warn also for just warning
// })

// if we want to add validation on existing collection

// db.runCommand({
//     callMod:"collectionName",
//     validator: {
//         $jsonSchema:{
//             required: ["name","price","author"],
//             properties:{
//                 name:{
//                     bsonType:'string',
//                     description:"must be a string and required"
//                 },
//                 price:{
//                     bsonType:'number',
//                     description: "must be a number and required"
//                 },
//                 author:{
//                     bsonType:"array",
//                     description:"must be an array and is  required",
//                     items:{
//                         bsonType:"object",
//                         required:["name","email"],
//                         properties:{
//                             name:{
//                                 bsonType:"string"
//                             },
//                             email:{
//                                 bsonType:"string"
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// })

// ______________ write concern
// we can use this option in both insertOne and insertMany

// db.books.insertOne({name:"B",price:2},{writeConcern:{w:0}})
// we see acknowledged :false
// because w = 0 means don't wait as it is successfully inserted or not

// db.books.insertOne({name:"B",price:2},{writeConcern:{w:0,j:true}});
// slight slower but usefull if mongodb server crashes

// db.books.insertOne({name:"B",price:2},{writeConcern:{w:0,j:true,wtimeout:500}});
// meaning how much time to wait a document to be written if exceed then do not write it


// Atomicity in mongoDB

// if suppose you are inserting a document and inbetween server crashes then that won't happen like your only half of document was inserted, as mongoDB ensures atomicity the document will either fully be added or not added

// in insert many if we are serving 10 documents to insert and suppose 5 inserted and server crashes then 5 whole inserted document will remain same as it is in db


// ________ now if we want to import any json file and insert in our db then we need mongoimport

// go to mongodb database tools
// download MongoDB Command Line Database Tools Download
// ensure on what path it is installed / copy it
// go to that path in your system
// like C://ProgramFiles//MongoDB//Tools//100//bin (untill you see mongoimport.exe)
// now copy it full path
// windoow, write env, click environment variables, sytem variables, click on new , paste copied path

// now you can use mongoimport in your cmd
// copy full path of json file of data

// open cmd and write below thing
// mongoimport "filepath" -d college -c students --jsonArray --drop
// -d => database name => college => if not available then it will created
// -c => collection name => students => if not available then created
// --jsonArray => if we have data informate of [{},{},{}] if we do not write it then mongo will create whole data as one json object
// --drop => if any existing data is present then clear it then add it



// ##################################################



// ___ Comparison operators

// {field:{$operator:value}}

// $eq : value (equal)
// $ne : value (not equal)
// $lt : value (less than)
// $gt : value (greater than)
// $lte : value (less than or equal)
// $gte : value (greater than or equal)
// $in : array (if in then true else false)
// $nin : array (if not in then true else false)

// ___ Logical Operators

// {$operater : [ {}, {} , {} ] }
// $and:  if both true
// $or: if any one true
// $not: inverse, not this
// $nor: if both false

// ___ Element Query Operators

// {fieldname : {$operator:value}}

// $exists : {$exists :true}
// $type : {$type : 'bool' or 8 } this 8 number is for boolean you can also check other datatypes number or string comparison in $type operator from Available Types from the docs

// ___ Evalution Query Operators

// $expr : Allows use of aggregation expression within the query language
// exa - it will check for the field one is greater then field two or not , if then return it
// db.collectionName.find({
//     $expr: {
//         $gt : ["field1","field2"]
//     }
// });

// $jsonSchema: like previous when we are setting our schema

// $mod : modulo operator can be applicable to any number field - [devider, remainder]
// exa - { age : {$mod : [2,0]}} this will find all documents with even age

// $regex : regular expression

// $text : this operator can be used only on and after you did indexing on certain text fields
// exa - after indexing
// db.products.find({
//     $text: {
//         $search: "red shirt"
//     }
// })

// $where : satisfies javascript expression


// for array of objects just do same like nested object for finding
// for getting length of array

// $size : value, like we have array of objects of experience field then we can do like db.find({experience: {$size : 3}});
// we can't do like {experience: {$size: {$gte: 3}}};
// instead use $expr
// {$expr : { $gte : [{$size:"$experience"},3]}},
// works but if some documents do not have any experience field then we need to do this
// { $and: [{ experience: { $exists: true } }, { $expr: { $gte: [{ $size: "$experience" }, 3] } }] }

// $all : [] , if all of the array is present in field like below
// db.collection.find({hobbies:{$all : ["Walking","Reading"]}});

// if we have field like
// products : [
//     {name: "apple", quantity: 10},
//     {name: "orange",quantity: 5},
//     {name: "banana",quantity:20}
// ]

// now supose if we want to find entry with having atleast one product named apple and whoes quantity is gt 11

// but we do this with help of $and and "product.quantity" it will show this result also because product.quantity is trying to find in whole array

// so use instead use below

// {products: {$elemMatch: {quantity: {$gt :11},name:"apple"}}}

// it will find for specific element

// ____________
// .sort() method on cursor
// db.collection.find().sort(age:1)
// if :1 then ascending order means first one will be lowest
// if :-1 then descending order means first one will be highest
// compound
// {age:1,name:1}, means first sorts with age if found multiple documents with same age then sort it with name
// sort will also return cursor

// _____________

// $inc : inc by value
// db.collection.updateMany({},{$inc:{$age:1}}); inc by 1
// if we want to decrease then simply put like -2 for decreasing by 2

// $min : if we want to decrease from now
// $max : if we want to increase from now
// like we want to set age to 50 if sita's age is less then 50
// db.collection.updateOne({name:"sita"},{$max:{age:50}});
// if now<50 then set to 50
// db.collection.updateOne({name:"sita"},{$min:{age:23}});
// if now>23 then set to 23

// $mul :
// db.collection.updateOne({name:"sita"},{$mul:{age:2}})
// simply multiplies the age with 2 if we want to devide by three then simply pass 1/3 or 0.333 to mul

// $unset :
// if we want to delete field
// db.collection.updateOne({name:"sita"},{$unset:{age:anyvalue}})
// deletes age from "sita"

// $rename : if we want to rename any field
// db.collection.updateMany({},{$rename:{age:"studentAge"}});
// it will rename "age" to "studentAge";

// upsert : if not then insert
// db.students.updateOne({name:"Golu"},{$set:{age:100}},{upsert:true});


//###################################################


// ____ updating in array

// suppose now it is same as previous experience query
// if we want to check that who have experience duration less than or equal to 1 then add new field to that particular element

// we can do like
// db.collection.updateMany({experience:{$elemMatch:{duration: {$lte: 1}} }},{$set:{"experience.$":{neglect:true}}});
// this will change the whole element value to {neglect:true}
// but we don't want to do that we just want to add that field
// so do like below
// db.collection.updateMany({experience:{$elemMatch:{duration: {$lte: 1}} }},{$set:{"experience.$.neglect":true}});
// exerience.$ will get the first match element
// we want in all elements then we just need to do like
// db.collection.updateMany({experience:{$elemMatch:{duration: {$lte: 1}} }},{$set:{"experience.$[].neglect":true}});
// experience.$[] will work for all element

// but we want only matched elements then we need do

// db.collection.updateMany({experience:{$elemMatch:{duration: {$lte: 1}} }},{$set:{"experience.$[e].neglect":true}},{ArrayFilters:[{"e.duration":{$lte:1}}]});

// experience.$[e] here e will be variable then we filtering out from it

// $push : if we want to push an element
// db.collection.updateOne({name:"ram"},{$push:{experience:{company:"Meta",duration:2}}});
// $addToSet : same as push

// $pull : remove element that matches
// db.collecion.updateOne({name:"ram"},{$pull:{experience:{company:"Meta",duration:2}}});

// $pop : if we just to remove element from last or first element
// for last element
// db.collection.updateOne({name:"ram"},{$pop:{experience:1}});
// for first element write {experience:-1};


//_______________________________________________________


// ___ indexing

// suppose you have an collection of documents with certain fields then if you search any field then mongo db will go through document by document and linearly search for your query to be resolved (COLLSCAN) and it will take time, but after indexing mongo db will do binary search on your query so it will reduce the searching time (IXSCAN)

// when we do indexing mongodb creates a differenct DataStructure that have two things index and pointer to particular document if the index is matched then pointer will immediately return you document from the database

// indexing will create (balanced)b-tree

// the TRADE_OFF
// suppose you think you'll made all field index and then your db become so fast for all, but here is challenge, it will require more ammount of storage as indexing will create an entire new datastructure, and write operation will be time heavy because every time when you enter any new element then mongodb index will add it and rebalance it's tree for indexing.

// so use for search intensive tasks only and minimal

// types of indexing
// 1. Single field indexes
// 2. Compound indexes
// 3. Text indexes

// we'll use db.colletion.find({field:"Value"}).explain();
// and db.collection.find({}).explain("executionStats");

// creating index
// db.teachers.createIndex({"age":1});
// to get all indexes
// db.teachers.getIndexes()
// to remove any index
// db.teachers.dropIndex("age_1"); // or {"age":1}

// when to not use indexing

// 1. the collection is small
// 2. the collection is frequently updated
// 3. the queries are complex (multiple fields)
// 4. the collection is large (make less indices)

// ##2 compound index
// db.teachers.createIndex({"age":1,"gender":1});
// orderMatters
// first it will sort age then gender

// indexing helps in sorting also
// db.teachers.createIndex({age:1},{unique:true})
// no duplicate will occur

// ### partial Filers

// db.createIndex({age:1},{partialFilterExpression:{age:{$gt:22}}});

// only indexes age of greate then 22

// {expireAfterSeconds:3600} // it will delete automatically index , and only works on date fields and with single field indexing

// Covered Query

// All the fields in the query are part of an Index
// All the fields returned in the query are in the sane index.

// if suppose we have did indexing on name field and we do
// db.teachers.find({name:"mark"},{_id:0,name:1}).explain("executionStats");
// it is called covered query and it won't go in db to search, it will just return from datastructer of indexing
// thus it is so fast


// Multiple Indexes
// in case of multiple indexes mongodb for the first time checks performance of the indexes on sample of documents and the fastest will be used
// for second time it won't again do race for them
// it stores that winning plan in cache

// Cache will be reset after
// 1. After 1000 writes
// 2. Index is reset
// 3. Mongo server is restarted
// 4. Other indexes are manipulated

// explain("allPlansExecution");

// ###  Multi-key Index __

// A multi-key index is an index that can be created on an array field

// db.students.createIndex({Hobbies:1})
// db.students.getIndexes();// Hobbies_1

// MongoDB will create a separate index entry for each value in each array,
// so it can quickly look up documents that match a specific value.

// it will cosume more ammount of space then all


// ### Text Index ----

// single text index per collection
// tokenization and stemming
// relevance score

// how to create
// db.students.createIndex({bio:"text"});
// we can only create single index but we can make that index compound so like below
// db.students.createIndex({name:"text",bio:"text"});

// how to search
// db.students.find({$text:{$search:"anything"}});

// the results are ordered based on their releavance score

// to see the score
// db.students.find({$text:{$search:"youtube"}},{myScore:{$meta:{$textScore}}});

// it will basically add new field to show and get value from textScore from meta and show it

// if we do search like "actor sita", first one is of 0.75 score and second one is 1.1 score but it gives here priority

// we can adjust it
// drop index=> db.students.dropIndex("name_text_bio_text")
// create
// db.students.createIndex({name:"text",bio:"text"},{weights:{name:10000,bio:1}});

// when again hit it first time, we get name with 11000 match score and actor with 0.75
// but when trying first time we don't get it in sorted manner, we mannualy have to sort it
// but when we try again then it will drive us in sorted manner

// to sort
// db.students.find({$text:{$search:"actor sita"}},{myScore:{$meta:{$textScore}}}).sort({myScore:{$meta:{$textScore}}});

// when you do indexing on large dataset then it will take sometime and cost as it temporary blocks read/write operations during building indexing, so create it during off-peak hours or during maintainance work and use background : true , reduce slightly the blocking.

// db.students.createIndex({name:"text"},{background:true})
// it will block only the queries which are dependent on index otherwise independed queries will works



// _____________________________________________________

// ____________AGGREGATION

// to write aggregate query -> a pipeline operation
// sequence of operations

// it groups the data from multiple documents into a single document based on the specified expression

// mongoDB provide several built-in aggregation pipeline statges to perform various operations on the data, such as $group, $sum, $avg, $min, $max, etc.

// what is pipeline, -> it is an array of different operations to perform on output

// db.collectionName.aggregate(pipeline,options);

// finding teachers with gender male
// db.teachers.aggregate([ {$match: {gender:"male"}}]);

// group by age
// db.teachers.aggregate([{$group:{_id:"$age "}}])

// $group: in below structure manner
// {
//     _id:expression,
//     field1:expression,
//     field2:expression, ...
// }

// _id will be on which field we want to group
// to show with names

// db.teachers.aggregate([{$group":{_id:"$age",names:{$push:"$name"}}}]);

//group teachers by age and also show complete document per age group

// db.teachers.aggregate([ {$group:{_id:"$age",docs:{$push:"$$ROOT"}}}]);

// ******* as "$age" dollar in string with string represents a particular field name inside that document

// ________ so "$$ROOT" represents whole documents

// now wanted to only male teachers and it's count

// db.teachers.aggregate([{$match:{gender:"male"}},{$group:{_id:"$age",count:{$sum:1}}}])

// it will find all teachers with gender male then group it by their age and then add number field to it
// $sum :1 means for each document of in the group, the value of "number" will be incremented by 1

// now just sorting result in desc order of count

// db.teachers.aggregate([{$match:{gender:"male"}},{$group:{_id:"$age",count:{$sum:1}}},{$sort:{count:-1}}]);

// now just we want to group whole result based on nothing and just count max numberin an age group

// db.teachers.aggregate([{$match:{gender:"male"}},{$group:{_id:"$age",count:{$sum:1}}},{$sort:{count:-1}},{$group:{_id:null,maxCountPerAge:{$max:"$count"}}}]);

// $toDouble: it will convert the specific field value into decimal point value

// find Hobbies per age group

// db.students.aggregat([{$unwind:"$Hobbies"},{$group:{_id:"$age",hobbies:{$push:"$Hobbies"}}}])

// $unwind: it will do convert particular array field as if someone have three entries then it will generate three copies of document in that document and give each a single hobbie

// finding avg age considering all the teachers

// db.teachers.aggregate([{$group:{_id:null,avgAge:{$avg:"$age"}}}]);

// find the total number of hobbies for all the students in a collection

// db.students.aggregate([{$unwind:"$Hobbies"},{$group:{_id:null,count:{$sum:1}}}]);

// or
// db.students.aggregate([{$group:{_id:null,count:{$sum:{$size:{$ifNull:["$Hobbies",[]]}}}}}]);

// or tried by me

// db.students.aggregate([{$unwind:"$Hobbies"},{$group:{_id:"$Hobbies"}},{$group:{_id:null,count:{$sum:1}}}]);

// $ifNull : [,] returns second if first null otherwise returns first

// $push vs $addToSet

// addToSet won't allow duplicates

// $filter: {input:<array expression>,as:<identifier>,cond:<expression>},


// find average of scores for students whose age is greater than 20

// db.students.aggregate([
//     {
//         $group:{
//             _id:null,
//             avgScore: {
//                 $avg: {
//                     $filter: {
//                         input: "$scores",
//                         as: "scores",
//                         cond: {$gt: [ "$age", 20]}
//                     }
//                 }
//             }
//         }
//     }
// ])

