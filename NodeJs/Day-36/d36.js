// Day-36

// Date: 21/04/2026
// Task: Completed playlist as watched remained videos as learned about $bucket, $lookup, $project, capped collection, Authentication and Authorization in mongoDB, replication and Sharding, Transactions, ACID operations and meanings, Date operation and read Docs, did task to write multiple queries.

// _____________________________________________________


// _________________ $bucket

// Syntax ->
// {
//     $bucket: {
//         groupBy: <expression>,
//         boundaries: [<boundary1>,<boundary2>,...],
//         default: <expression>,
//         output: {
//             <outputField>: {<accumulator>:<expression>}
//         }
//     }
// }

// when  ? -> when you want to categorize into discrete groups based on specified boundaries.

// ? -> categorize male teachers based on their ages into three buckets ages less than 30, ages between 30 and 40, and ages greater than 40

// db.teachers.aggregate([{ $match: { gender: "male" } }, { $bucket: { groupBy: "age", boundaries: [0, 30, 40], default: "Greater than 40 wala group", output: { count: { $sum: 1 }, names: { $push: "$name" } } } }]);


// _________________ $lookup (Left Outer Join)
// Syntax ->
// {
//     $lookup: {
//         from: "foreignCollection",
//         localField: "localField",
//         foreignField: "foreignField",
//         as : "outputArray"
//     }
// }


// the $lookup is an aggregation pipeline stage that allows you to perform  a left outer join between two collection

// db.customer.aggregate([{ $lookup: { from: "orders", localField: "_id", foreignField: "cutomer_id", as: "orders" } }]).pretty();

// for right outer join just  switch details
// db.orders.aggregate([{ $lookup: { from: "cust", localField: "customer_id", foreignField: "_id", as: "customerDetails" } }]);

// for Inner Join we need to chain match condition like below

// db.cust.aggregate([{ $lookup: { from: "orders", localField: "_id", foreignField: "customer_id", as: "orderDetails" } }, { $match: { orderDetails: { $ne: [] } } }]);

// for full outer join read docs


// _________________ $project

// $project stage is used in the aggregation pipeline to reshape documents, include or exclude fields, and create computed fields.

// It allows you to customize the output of your aggragation query by specifieng which fields to include or exclude, appliying expressions to existing fields, and renaming fields.

// db.emp.aggregate([ {$project: {firstname:1,lastName:1, _id:0}}]);

// db.emp.aggregate([{ $project: { _id: 0, dept: "$department" } }]).pretty();
// on above only dept will be shown with inheriting values from $department

// db.emp.aggregate([{ $project: { _id: 0, firstName: 1, lastName: 1, monthlySalary: "$salary", annualSalary: { $multiply: [12, "$salary"] } } }]).pretty();


// _________________ Capped Collection

// capped will limits you collection on max numbers of entries or max size, which will be hit first then the oldest document will be removed.

// Collection which is already exists can not be converted into capped collection

// db.createCollection("order_logs",{capped:true,max:4,size:100000});
// size is in bytes -> here one lakh bytes;

// in rugular collections the order is not inherintely maintained but in capped collection the order of documents will be maintained


// _________________ Authentication and Authorisation

// Enabling authentication in MongoDB involves making configuration changes

// On windows -> C:\Program Files\MongoDB\Server\<version>\bin\mongod.cfg
// add below lines exactly
// security:
//     authorization: enabled

// Now restart the service on windows
// Run, Windows + R -> service.msc;

// To create user use admin


// db.getUsers();

// db.createUser({ user: "adminUser",pwd : "password",roles: ["userAdminAnyDatabase","dbAdminAnyDatabase"]});

// To login

// db.auth("adminUser","password"); //first will be username, and second will be password

// if returned/shown 1 then successfully logged in!

// Total Roles ->________

// ||||     read
// ||||     readWrite

// ||||     dbAdmin
// ||||     userAdmin
// ||||     dbOwner

// ||||     readAnyDatabase
// ||||     readWriteAnyDatabase
// ||||     userAdminAnyDatabase
// ||||     dbAdminAnyDatabase

// ||||     clusterManager
// ||||     clusterMonitor
// ||||     hostManager
// ||||     clusterAdmin

// ||||     dbOwner
// ||||     userAdmin
// ||||     userAdminAnyDataBase
// ||||     root

// ||||     backup
// ||||     restore

// to Logout

// db.logout();

// you can not modify username , password or any details after creating, show we sometimes just need to drop user with it's userName

// db.dropUser("adminUser");

// db.createUser({ user: "admin", pwd: "admin", roles: [{ role: "read", db: "customer" }, { role: "readWrite", db: "school" }] });

// here above if we won't provide any db option then db will by default which where we in current like after use admin then running query then default will be admin

// to login from cmd if you'd have installed mongo server

// mongo --authenticationDatabase admin -u admin -p admin

// here admin before -u is db name if not provided then mongo will try to find provided user to search if in which db and where is user, here admin after -u is username and after -p is password



// _________________ Replication and Sharding

// What is Replication?

// ->  suppose client is request on db server, now whenever if the dbserver is not available/blocked/crashed then user/client will not able to get the response, show what we do we just build three or more servers and store all the data meaning duplicating over main interaction server, this duplication called replication.

// -> suppose now we schedule the replication time like after 3 min or at specific time check the main server to if it have new data or changes then copy it, so now if main is blocked still client request forwaded to which is available and it will get the response back

// ### Replication is an Asynchronous

// Benifits:
// 1. Fault Tolerence:
// 2. If multiple request then you'll devide in the server to make response fast and other requests to be non-blocking


// Sharding

// What is sharding?

// -> Now suppose your server is on system which has storage of 1 TB, now your application grows and 1 TB is not sufficient for your application then you'll increase it to 10 TB of storage, suppose still not enogh then again you'll increses but at certain level it won't be good to do that. this is the verticle scalling we doing,

// -> Now think you'll use 3 systems of 10 TB now if your total data is 3 TB then it will devided into 1TB each, then it won't be problem, the client will get the data from where it present, so this is called Sharding.
// It is the horizontal scalling.

// For this to work, mongo has provided a router named "mongos", it will decide to query to go on which system or db.

// sample:
// {
//     _id:1,
//     name:"Vipul",
//     age:60,
// }

// now see you want to devide the 3 db interms of name

// you'll write
// sh.shardCollection("<database_name>.<collection_name>",{"<sharding_key>":1});

// if we put "name" as "sharding_key" then mongo understand that it need to shard it on base of names

// ## choose the sharding key carefully, -> like from above example we wanted to devide into 3 collections then sharding key must be can gruoped in three collection, here if we provide name then it will try to devide all names by character to if start with a-I (just example) then it will go in first otherwise check for other, but total alphabates 26/3 cannot able to equally devide the collection in three collections.

// but it is half true, as mongodb just tries to balance the collections which being made not to the equally devide, so interms of names -> it will devide A-H,I-Q,R-Z.
// but generely it will shard based on hash and distributes them evenly across shards.


// How to do replication on local?
// Replica set is collection of servers
// Open the config file from the
// C:\Program Files\MongoDB\Server\<version>\bin\mongod.cfg
// see storage : dbPath:

// copy it
// on cmd run as administrator
// cd copied path
// create three folders db1,db2,db3

// open three terminals

// run command          (paste path below with foldername)
// mongod --port 27018 --dbpath /var/lib/mongo/db1 --replSet rs1
// for db1

// mongod --port 27019 --dbpath /var/lib/mongo/db2 --replSet rs1
// for db2

// mongod --port 27020 --dbpath /var/lib/mongo/db3 --replSet rs1
// for db3

// now open another teminal
// run mongo --port 27018
// shows nothing for the first time if not intiated

// now run
// rs.initiate({
//     _id:"rs1",
//     member: [
//         {_id:0,host:"localhost:27018"},
//         {_id:1,host:"localhost:27019"},
//         {_id:2,host:"localhost:27020"},
//     ]
// })

// now we see rs1:SECONDARY>

// run rs.status(); to see status of replicaSet

// if you exit and run again the first one /27018 then you'll see

// rs1:PRIMARY>

// now if error in other servers as "not master and slaveOk=false" while running any query
// then run
// use Admin
// db.getMongo().setSecondaryOk();

// now you can run queries.abs

// #### you can just read in secondary not can write it will show error "not Master"


// _________________ Transaction

// A transaction is a set of operations that are executed as a single, atomic unit.

// Suppose, A have 500 rs and B have 0 rs,
// Now A wants to send 100 rs to B
// The whole task have two operations
// Op1 - A-100
// Op2 - B+100

// Now suppose after doing the op1 the dbServer is crashed and now what will we think as happend, we have no logs, the amount is deducted from the A but B haven't received yet, but here where comes transaction, transaction is full unit as one, if any operations fail in-between then whole transaction will be reverted.

// Transactions provide data consistency by ensuring that either all the operations within the transaction are commited to the database, or none of them are.

// Transactions are designed to provide ACID properties.

// ACID ->

// Atomicity -> Atomicity guarantees that a transaction is treated as a single indivisible unit of work. Either all the operations within the transaction are successfully completed and committed, or none of them are. If any part of the transaction fails, all changes made by the transaction are rolled back, leaving the data in its original state.

// Consistency -> Consistency ensures that a transaction brings the database from one valid state to another. It enforces any integrity constraints defined on the data, such as referential integrity or uniquemess constraint. If a transaction violates any constraints, the entire transaction is rolled back, preserving data integrity.
// Meaning, suppose if you have put some validations or constraints on some fields of your collection, Consitency ensures that any transaction will not break your defined rules.

// Isolation -> Isolation ensures that each transaction operates independently of other concurrent transactions. It prevents interference between concurrent transactions, preserving data integrity and preventing unintended side effects. Isolation levels define different leveles of concurrency control, allowing developers to choose the appropriate level of isolation for their use case.
// Suppose TO check Isolation, a person have 500 in bank, he goes to ATM now he ready as he done all pin and entry task, now he share 500 online to friend, he hits button on both mobile and ATM to send at same time, now what you think like one scenario is, you have succefully deducted 200 rs from atm and given 500 to friend but net transaction does not match net balance, but this not happens, what the real bank system do, which ever task has commed up first the sytem will process only and only on that untill it will not be commited till that it will lock the transaction process so other have to wait in queue, by doing this it will isolate each transaction.

// Durability -> Durability guarantees that once a transaction is committed, its changes are permanently stored and will survive any subsequent system failure. Commited transactions are made durable by writing their changes to disk or other persistent storage. This ensures that the data is not lost and can be recovered in the event of a crash or failure.


// When it comes to transactions, replication is crucial for maintaining the consistency and durability guarantees across multiple documents and collections involved in a transaction.


// This is how we can do transactions.

// var session = db.getMongo().startSession();
// session.startTransaction();
// var cust = session.Database('bank').cust;
// cust.updateOne({_id:1},{$inc:{bal:-100}});
// cust.updateOne({_id:2},{$inc:{bal:100}});
// session.commitTransaction(); // session.abortTransaction();
// session.endSession();



// _________________  Dates:

// db.students.insertOne({_id:1,name:"Ram",dob:ISODate("2000-01-30")});

// db.students.find().pretty();
// we can see date in ISO formate ("2000-01-30T00:00:00Z");

// here T is seperator which seperators time from date
// here Z is UTC Time zone indicator

// creating date
// ISODate("2000-01-25T14:20:23Z");
// ISODate("2005-02-14T14:20:23+02:00");
// here means we provided that local timezone is ahead 2 hrs of UTC timezone, we are providing offset to it
// if we find and see data stored
// we get ISODate("2005-02-14T12:20:23Z");
// as it will automatically adjust time according to UTC as we provided

// now if we want to group by year

// db.students.aggregate([{$group:{_id:{$year:"$dob"}}}]);

// if we want names

// db.students.aggregate([{group:{_id:{$year:"$dob"},names:{$push:"$name"}}}]);

// to extract different values from date;
// $year
// $dayOfMonth
// $month
// $dayOfYear
// $hour
// $minute
// $second
// $millisecond

// if we want to provide milliseconds in ISODate
// ISODate("2000-01-14T14:20:24.773Z");
// writing 773 after dot of seconds means milliseconds

// if we want to give current date with time then simple just write | new Date() | in dob

// db.students.aggregate([{ $project: { name: 1, _id: 0, dob: { $dateToString: { format: "%d/%m/%y %H:%M:%S", date: "$dob" } } } }])


// _________________ MongoDB Atlas

// Benefits:

// Fully Managed Service
// Scalability
// High Availability
// Security
// Monitoring and Analytics
// Global Deployment
// Integration with Other Cloud Services



// _____________________________________________________

// MongoDB Docs

// $currenntDate: {}

// ###### in update query
// db.collectionName.updateMany(filter, { $set: { anything }, $currentDate: { lastModified: true } });

// currentDate will check if lastModified field is present then update it to current time and if not then first create it and update it to now



// ###### replaceOne(filter, new Document);


// ######


// ____________________________________________________

// task

// use task;

// Create a new collection called anime.
// ----  db.createCollection("anime")

// Insert a single anime document into the anime collection with the following fields:
// title: Attack on Titan
// genre: Action, Fantasy, Drama
// rating: 9.0
// episodes: 75
// ----  db.anime.insertOne({title:"Attack on Titan",genre:["Action","Fantasy","Drama"],rating:9.0,episodes:75});

// Insert multiple dummy anime data (at least 15) into the anime collection using insertMany.
// ----  db.anime.insertMany([
//     { title: "Fullmetal Alchemist: Brotherhood", genre: ["Action", "Adventure", "Fantasy"], rating: 9.2, episodes: 64 },
//     { title: "Death Note", genre: ["Mystery", "Supernatural", "Thriller"], rating: 8.7, episodes: 37 },
//     { title: "Naruto", genre: ["Action", "Adventure", "Comedy"], rating: 8.3, episodes: 220 },
//     { title: "Naruto: Shippuden", genre: ["Action", "Adventure", "Drama"], rating: 8.6, episodes: 500 },
//     {
//         title: "One Piece",
//         genre: ["Action", "Adventure", "Comedy"],
//         rating: 8.9,
//         episodes: 1000
//     },
//     {
//         title: "Dragon Ball Z",
//         genre: ["Action", "Adventure", "Martial Arts"],
//         rating: 8.5,
//         episodes: 291
//     },
//     {
//         title: "Demon Slayer: Kimetsu no Yaiba",
//         genre: ["Action", "Supernatural", "Drama"],
//         rating: 8.7,
//         episodes: 26
//     },
//     {
//         title: "Jujutsu Kaisen",
//         genre: ["Action", "Supernatural", "Dark Fantasy"],
//         rating: 8.6,
//         episodes: 24
//     },
//     {
//         title: "My Hero Academia",
//         genre: ["Action", "Comedy", "Superhero"],
//         rating: 8.4,
//         episodes: 138
//     },
//     {
//         title: "Tokyo Ghoul",
//         genre: ["Action", "Horror", "Supernatural"],
//         rating: 7.9,
//         episodes: 24
//     },
//     {
//         title: "Bleach",
//         genre: ["Action", "Supernatural", "Adventure"],
//         rating: 8.2,
//         episodes: 366
//     },
//     {
//         title: "Hunter x Hunter (2011)",
//         genre: ["Action", "Adventure", "Fantasy"],
//         rating: 9.0,
//         episodes: 148
//     },
//     {
//         title: "Code Geass: Lelouch of the Rebellion",
//         genre: ["Action", "Mecha", "Drama"],
//         rating: 8.7,
//         episodes: 50
//     },
//     {
//         title: "Sword Art Online",
//         genre: ["Action", "Adventure", "Sci-Fi"],
//         rating: 7.7,
//         episodes: 96
//     },
//     {
//         title: "Steins;Gate",
//         genre: ["Sci-Fi", "Thriller", "Drama"],
//         rating: 9.1,
//         episodes: 24
//     },
//     {
//         title: "Neon Genesis Evangelion",
//         genre: ["Mecha", "Psychological", "Drama"],
//         rating: 8.5,
//         episodes: 26
//     }
// ]);

// Find all anime with a rating greater than 8.5.
// ----  db.anime.find({rating:{$gt:8.5}},{_id:0,title:1,rating:1});

// Find all anime with the genre Action.
// ----  db.anime.find({genre:"Action"},{_id:0,title:1,genre:1});

// Find all anime with more than 50 episodes.
// ----  db.anime.find({episodes:{$gt:50}},{_id:0,title:1,episodes:1});

// Update the lastWatchedDate of the anime with the title Attack on Titan to the current date.
// ----  db.anime.updateOne({title:"Attack on Titan"},{$set:{lastWatchedDate:new Date()}});

// Increment the number of episodes for all anime by 1.
// ----  db.anime.updateMany({},{$inc:{episodes:1}});

// Set the minimum rating for all anime to 8.0.
// ----  db.anime.updateMany({},{$max:{rating:8.0}});

// Set the maximum episodes for the anime with the title Death Note to 50.
// ----  db.anime.updateOne({title:"Death Note"},{$min:{episodes:50}});

// Multiply the rating of the anime with the title One Piece by 1.2.
// ----  db.anime.updateOne({title:"One Piece"},{$mul:{rating:1.2}});

// Rename the field genre to categories for all anime.
// ----  db.anime.updateMany({},{$rename:{genre:"categories"}});

// Set the status field to ongoing for all anime.
// ----  db.anime.updateMany({},{$set:{status:"ongoing"}});

// Set the createdAt field to the current date if the document is inserted for the first time.
// ----  db.anime.find({ createdAt: { $not: { $exists: true } } }, { $set: { createdAt: new Date() } });


// Unset the rating field for the anime with the title Attack on Titan.
// ----  db.anime.updateOne({title:"Attack on Titan"},{$unset:{rating:1}});

// Add the genres Thriller and Suspense to the categories array of Attack on Titan.
// ----  db.anime.updateOne({title:"Attack on Titan"},{$push:{categories:"Thriller"}});
// db.anime.updateOne({title:"Attack on Titan"},{$push:{categories:"Suspense"}});

// Remove the last genre from the categories array of Death Note.
// ----  db.anime.updateOne({title:"Death Note"},{$pop:{categories:1}});

// Remove all genres matching Comedy from the categories array of One Piece.
// ----  db.anime.updateOne({title:"One Piece"},{$pull:{categories:"Comedy"}});

// Append the genres Adventure and Fantasy to the categories array of Attack on Titan.
// ----  db.anime.updateOne({title:"Attack on Titan"},{$addToSet:{categories:"Action"}});
// db.anime.updateOne({title:"Attack on Titan"},{$addToSet:{categories:"Fantasy"}});

// Limit the categories array of One Piece to contain only 3 elements.
// ----  db.anime.updateOne({title:"One Piece"},{$set:{categories:{$size:3}}});

// Sort the categories array of Attack on Titan in alphabetical order.
// ----  db.anime.find({title:"Attack on Titan"},{_id:0,categories:1}).toArray()[0].categories.sort();
// ----  db.anime.findOne({title:"Attack on Titan"},{_id:0,categories:1}).categories.sort();