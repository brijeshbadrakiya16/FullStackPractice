// Day-37

// Date: 22/04/2026
// Task: Read stages of aggregation pipeline as learned about match, group, project, sort, limit, skip, unwind, addFields, lookup, bucket, and about operators as abs, add, sum, count, subtract, mutliply, divide, addToSet, push, and, or, not, floor, ceil, cmp, concat, cond, dateToString, first, last, gt, gte, lt, lte, eq, ne, in, max, min, and learned about watch in mongoose and how object id made in mongoDB, transactions and one-to-one, one-to-many and many-to-many relations to make in schema, write queries for the task given by sir.

// _______________________________________________________

// watch
// how oid made
// transaction
// relations
// replicaSet and sharding




// to rename any folder from terminal use move

// *** Watch

// can be used both with mongodb package or mongoose package in mongoDB watch is used to open a change Stream so you can so you can listen for real-time changes in a collection, databasem or deployment. When using Mongoose, you can call .watch() directly on a model to observe changes.

// const mongoose = require("mongoose");

// const uri = "mongodb://127.0.0.1:27017/testdb" // or cloud url
// const userSchema = new mongoose.Schema({ name: String, email: String, age: Number });

// const User = mongoose.model("User", userSchema);

// async function main() {
//     try {
//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });

//         console.log("conneted to MongoDB");

//         const changeStream = User.watch();

//         changeStream.on("change", (change) => {
//             console.log('🔄 Change detected:', change);
//         })
//     }catch(err){
//         console.log(err);
//     }
// }
// main();

// Note to watch work, you compulsory need your collection to be replicated and or sharded to work.
// in local you have to atleast make two nodes of replica set to see working watch


// *** How ObjectId made in mongoDB

// oid is of 12-byte unique identifierand and it generates in a way as it ensures uniqueness across machines

// oid -> 12 bytes(96 bits) -> represented in 24-chars hex
// Breakdown
// 4 bytes - Timestamp - (current UTC time in seconds)
// 5 bytes - Random value - (gen frin mac address hash or process ID )
// 3 bytes - Counter - (counter that increments for each oid gen in the same second)


// *** transaction
// suppose we have two schema models

// now do we have mongoose instance
// const mongoose = require("mongoose");
// const User = require("User"); // importing user model
// const Order = require("Order"); //importing order model

// // now where we writing queries, write below code before that
// const session = await mongoose.startSession();

// session.startTransaction();

// // now our queries
// try{

//     const user = new User({
//         //some data to store
//     })

//     await user.save({session}); //important to pass session

//     const order = new Order({
//         // some order data to store
//     })

//     await order.save({session});

//     // Commit Transaction
//     await session.commitTransaction();
// }catch(err){
//     await session.abortTransaction();
// }finally{
//     session.endSession();
// }


// *** Relations

// _______________ One to One
// const profileSchema = new mongoose.Schema({projects:[String],url:Stirng});
// const userSchema = new mongoose.Schema({name:String,email:String,profile:{type:mongoose.Schema.Types.ObjectId,ref:"Profile",unique:true}});


// _______________ One to Many
// const userSchema = new mongoose.Schema({name:{type:String, required:true}});
// const User = mongoose.model("User",userSchema);
// const postSchema = new mongoose.Schema({ title: {type:String, required: true},content: String,author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}})
// Like one user have multiple post but a post will ref to single user

// _______________ Many to Many
// const studentSchema = new mongoose.Schema({name:String,courses: [{type:mogoose.Schema.Types.ObjectId,ref:"Course"}]})

// const courseSchema = new mongoose.Schema({title:String,students:[{type:mongoose.Schema.Types.ObjectId,ref:"Student"}]})

// here you have pass ref in object inside a array
// Like multiple student have multiple courses
// like on single userid he have multiple course id, and on single course he have multiple student id.


// *** replicaSet and sharding







// _______________________________________________________

// #################### STAGES ######################

// All stages can be applicable to aggregate pipeline

// Stages are processed sequentially
// Order matter for performance ( $match, and $sort early= better performance)

// --------------------- $match


// **MongoDB Aggregation Pipeline — Complete Guide**
// *Detailed Explanation with Examples, Use Cases, Specifications & Best Practices*

// ---

// ### **Introduction**

// The **Aggregation Pipeline** is MongoDB’s most powerful way to process data. It is an array of **stages**, where each stage transforms the documents and passes the output to the next stage.

// ```js
// db.collection.aggregate([
//   { $stage1: { ... } },
//   { $stage2: { ... } },
//   ...
// ], { allowDiskUse: true })
// ```

// **Key Points:**
// - Stages are processed sequentially.
// - Order matters for performance (`$match` and `$sort` early = better performance).
// - You can use **expressions** (`$add`, `$cond`, `$sum`, etc.) inside most stages.

// ---

// ## **1. AGGREGATION STAGES**

// ### **1. $match**
// **Purpose**: Filters documents (like `find()` but can be used anywhere in the pipeline).

// **Syntax**:
// ```js
// { $match: { <query> } }
// ```

// **Features**:
// - Can use all query operators (`$gt`, `$in`, `$regex`, `$elemMatch`, etc.).
// - **Best Practice**: Put `$match` as early as possible (especially before `$lookup`, `$unwind`, `$group`).
// - Can be used multiple times in a pipeline.

// **Example**:
// ```js
// db.orders.aggregate([
//   { $match: {
//       status: "completed",
//       orderDate: { $gte: ISODate("2024-01-01") },
//       "items.quantity": { $gt: 3 }
//   }}
// ])
// ```

// ---

// ### **2. $group**
// **Purpose**: Groups documents by a key and performs aggregation (most important stage).

// **Syntax**:
// ```js
// {
//   $group: {
//     _id: <expression>,           // Group by field or expression
//     fieldName: { <accumulator>: <expression> }
//   }
// }
// ```

// **Common Accumulators**:
// - `$sum`, `$avg`, `$min`, `$max`, `$count` (v4.2.3+), `$push`, `$addToSet`, `$first`, `$last`, `$stdDevPop`, `$stdDevSamp`

// **Examples**:

// **Basic grouping**:
// ```js
// { $group: {
//     _id: "$customerId",
//     totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
//     orderCount: { $count: {} },
//     itemsSold: { $push: "$items.productId" }
// }}
// ```

// **Grouping by multiple fields**:
// ```js
// { $group: {
//     _id: {
//       year: { $year: "$orderDate" },
//       month: { $month: "$orderDate" }
//     },
//     totalSales: { $sum: "$totalAmount" }
// }}
// ```

// ---

// ### **3. $project**
// **Purpose**: Reshapes documents (include/exclude fields, compute new ones, rename, etc.).

// **Syntax**:
// ```js
// { $project: {
//     field: 1,                    // include
//     field: 0,                    // exclude
//     newField: <expression>,
//     renamedField: "$oldField"
// }}
// ```

// **Important**:
// - By default, `_id` is included unless you set `_id: 0`.
// - Use `$project` when you want to **remove most fields**.

// **Example**:
// ```js
// { $project: {
//     orderNumber: 1,
//     customerId: 1,
//     totalAmount: { $sum: { $map: {
//         input: "$items",
//         as: "item",
//         in: { $multiply: ["$$item.price", "$$item.quantity"] }
//     }}},
//     orderYear: { $year: "$orderDate" },
//     _id: 0
// }}
// ```

// ---

// ### **4. $sort**
// **Syntax**: `{ $sort: { <field>: 1 or -1, ... } }`

// **Features**:
// - `1` = ascending, `-1` = descending.
// - Can sort by multiple fields.
// - Use `allowDiskUse: true` for very large sorts.

// **Example**:
// ```js
// { $sort: { totalRevenue: -1, orderDate: -1 } }
// ```

// ---

// ### **5. $limit** & **6. $skip**

// - `$limit: <number>` — Limits number of documents.
// - `$skip: <number>` — Skips documents.

// **Best Practice**: Usually used together for pagination (`$skip` before `$limit`).

// **Example (Pagination)**:
// ```js
// { $skip: 20 },   // Page 3 with 10 items per page
// { $limit: 10 }
// ```

// ---

// ### **7. $unwind**
// **Purpose**: Deconstructs an array field into separate documents.

// **Syntax**:
// ```js
// { $unwind: "$items" }                    // Basic
// { $unwind: {
//     path: "$items",
//     preserveNullAndEmptyArrays: true,   // Keep documents with no array
//     includeArrayIndex: "arrayIndex"     // Add index
// }}
// ```

// **Warning**: Can cause **Cartesian explosion** — use after `$match` when possible.

// **Example**:
// ```js
// db.orders.aggregate([
//   { $unwind: "$items" },
//   { $group: {
//       _id: "$items.productId",
//       totalSold: { $sum: "$items.quantity" }
//   }}
// ])
// ```

// ---

// ### **8. $set** / **9. $unset** (MongoDB 4.2+)

// - `$set`: Adds or updates fields (does **not** remove existing ones).
// - `$unset`: Removes fields.

// **Example**:
// ```js
// { $set: {
//     totalAmount: { $sum: { $map: { ... }} },
//     lastUpdated: new Date()
// }}

// { $unset: ["items", "tags"] }
// ```

// ---

// ### **10. $addFields**
// Alias of `$set` (older name). Same behavior.

// ---

// ### **11. $lookup** (Join)

// **Purpose**: Performs left outer join with another collection.

// **Syntax (Simple)**:
// ```js
// { $lookup: {
//     from: "products",
//     localField: "items.productId",
//     foreignField: "_id",
//     as: "productDetails"
// }}
// ```

// **Syntax with Pipeline (Recommended - MongoDB 3.6+)**:
// ```js
// { $lookup: {
//     from: "products",
//     let: { prodId: "$items.productId", qty: "$items.quantity" },
//     pipeline: [
//       { $match: { $expr: { $in: ["$_id", "$$prodId"] } } },
//       { $project: { name: 1, price: 1, category: 1 }}
//     ],
//     as: "products"
// }}
// ```

// ---

// ### **12. $facet**
// **Purpose**: Run multiple independent pipelines in one stage (great for dashboards).

// **Example**:
// ```js
// { $facet: {
//     revenueByMonth: [
//       { $group: { _id: { $month: "$orderDate" }, revenue: { $sum: "$total" } }}
//     ],
//     topCustomers: [
//       { $group: { _id: "$customerId", total: { $sum: "$total" } }},
//       { $sort: { total: -1 } },
//       { $limit: 5 }
//     ],
//     orderStats: [
//       { $group: { _id: "$status", count: { $count: {} } }}
//     ]
// }}
// ```

// ---

// ### **13. $replaceRoot**
// **Purpose**: Promotes an embedded document to be the new root.

// **Syntax**:
// ```js
// { $replaceRoot: { newRoot: "$productDetails" } }
// ```

// Very useful after `$lookup` when you want to flatten the joined document.

// ---

// ### **14. $bucket**
// **Purpose**: Categorizes documents into buckets (like SQL `GROUP BY` with ranges).

// **Example**:
// ```js
// { $bucket: {
//     groupBy: "$price",
//     boundaries: [0, 50, 100, 200, 500],
//     default: "500+",
//     output: {
//       count: { $count: {} },
//       items: { $push: "$name" }
//     }
// }}
// ```

// ---

// ### **15. $graphLookup**
// **Purpose**: Performs recursive search on hierarchical data (trees, org charts, bill of materials).

// **Example** (Employee hierarchy):
// ```js
// { $graphLookup: {
//     from: "employees",
//     startWith: "$reportsTo",
//     connectFromField: "reportsTo",
//     connectToField: "_id",
//     as: "hierarchy",
//     maxDepth: 3,
//     depthField: "level"
// }}
// ```

// ---

// ## **2. AGGREGATION OPERATORS**

// ### **Arithmetic Operators**

// | Operator     | Use Case                        | Example |
// |-------------|----------------------------------|-------|
// | `$abs`      | Absolute value                   | `{ $abs: "$profitLoss" }` |
// | `$add`      | Add numbers/dates                | `{ $add: ["$price", 10] }` |
// | `$subtract` | Subtract                         | `{ $subtract: ["$revenue", "$cost"] }` |
// | `$multiply` | Multiply                         | `{ $multiply: ["$price", "$quantity"] }` |
// | `$divide`   | Divide                           | `{ $divide: ["$total", 3] }` |
// | `$floor`    | Round down                       | `{ $floor: "$rating" }` |
// | `$ceil`     | Round up                         | `{ $ceil: "$rating" }` |

// ---

// ### **Array Accumulators**

// - `$push`: Adds all values to an array (preserves duplicates and order).
// - `$addToSet`: Adds values to array **without** duplicates.

// **Example**:
// ```js
// { $group: {
//     _id: "$customerId",
//     allProducts: { $push: "$product" },
//     uniqueProducts: { $addToSet: "$product" }
// }}
// ```

// ---

// ### **Boolean Operators**

// - `$and`, `$or`, `$not`

// **Example**:
// ```js
// { $project: {
//     isProfitable: {
//       $and: [
//         { $gt: ["$revenue", 1000] },
//         { $lt: ["$cost", 600] }
//       ]
//     }
// }}
// ```

// ---

// ### **Comparison Operators**

// | Operator | Meaning          | Returns |
// |---------|------------------|--------|
// | `$cmp`  | Compare          | -1, 0, 1 |
// | `$eq`, `$ne` | Equal, Not Equal | boolean |
// | `$gt`, `$gte`, `$lt`, `$lte` | Greater/Less | boolean |
// | `$in`   | In array         | boolean |

// **Example**:
// ```js
// { $project: {
//     isExpensive: { $gt: ["$price", 100] },
//     comparison: { $cmp: ["$price", 50] }
// }}
// ```

// ---

// ### **String & Date Operators**

// - `$concat`: Concatenate strings
// - `$dateToString`: Format dates

// **Example**:
// ```js
// { $project: {
//     monthYear: {
//       $dateToString: {
//         format: "%Y-%m",
//         date: "$orderDate"
//       }
//     },
//     fullName: { $concat: ["$firstName", " ", "$lastName"] }
// }}
// ```

// ---

// ### **Conditional Operator: `$cond`**

// **Syntax** (Ternary):
// ```js
// { $cond: {
//     if: <boolean-expression>,
//     then: <true-value>,
//     else: <false-value>
// }}
// ```

// **Example**:
// ```js
// { $project: {
//     discountLevel: {
//       $cond: {
//         if: { $gte: ["$total", 1000] },
//         then: "VIP",
//         else: "Regular"
//       }
//     }
// }}
// ```

// ---

// ### **Array Filtering: `$filter`**

// **Example**:
// ```js
// { $project: {
//     highValueItems: {
//       $filter: {
//         input: "$items",
//         as: "item",
//         cond: { $gte: ["$$item.price", 50] }
//       }
//     }
// }}
// ```

// ---

// ### **Accumulators (Group Stage)**

// - `$first`, `$last`
// - `$max`, `$min`
// - `$sum`, `$count`
// - `$mergeObjects` (very useful)

// **`$mergeObjects` Example**:
// ```js
// { $group: {
//     _id: "$customerId",
//     data: { $mergeObjects: "$customerDetails" }
// }}
// ```

// ---

// ### **Final Tips & Best Practices**

// 1. **Performance Order** (Golden Rule):
//    `$match` → `$sort` → `$group` → `$project`/`$addFields` → `$unwind`

// 2. Use `explain("executionStats")` to analyze performance.

// 3. Use `$lookup` with **pipeline** version instead of simple `localField`.

// 4. Prefer `$addFields`/`$set` over `$project` when you want to keep most fields.

// 5. Use `$facet` for analytical dashboards.

// ---


// db.aggregate({ $group: { _id: "$fuel_type", cars: { $push: { $concat: ["$maker", " - ", "$model"] } } } })
// db.car.aggregate({ $group: { _id: "$fuel_type", totalCars: { $sum: 1 } } });
// db.car.aggregate({ $group: { _id: "$fuel_type", avgCC: { $avg: "$engine.cc" } } });
// db.car.aggregate({ $group: { _id: "$fuel_type", avgTorque: { $avg: { $toInt: { $arrayElemAt: [{ $split: ["$engine.torque", " "] }, 0] } } } } });


// db.car.aggregate({ $group: { _id: "$fuel_type", cars: { $push: { $concat: ["$maker", " - ", "$model"] } }, totalCars: { $sum: 1 }, avgCC: { $avg: "$engine.cc" }, avgTorque: { $avg: { $toInt: { $arrayElemAt: [{ $split: ["$engine.torque", " "] }, 0] } } } } });


// _____________________________________________________

// task:


// 1. Match movies with a specific genre (e.g., "Action").
// db.movies.aggregate({ $match: { genres: "Action" } }, { $project: { _id: 0, title: 1 } })

// 2. Group movies by their release year and get the count of movies in each year.
// db.movies.aggregate({ $group: { _id: "$year", count: { $sum: 1 } } })

// 3. Project only the title, genre, and release year of movies.
// db.movies.aggregate([{ $project: { _id: 0, title: 1, genre: "$genres", year: 1 } }])

// 4. Sort movies by their IMDB rating in descending order.
// db.movies.aggregate([{ $project: { _id: 0, title: 1, rating: { $convert: { input: "$imdb.rating", to: "double", onError: 0, onNull: 0 } } } }, { $sort: { rating: -1 } }]);

// 5. Limit the result to the top 5 movies with the highest IMDB rating.
// db.movies.aggregate([{ $project: { _id: 0, title: 1, rating: { $convert: { input: "$imdb.rating", to: "double", onError: 0, onNull: 0 } } } }, { $sort: { rating: -1 } }, { $limit: 5 }]);

// 6. Skip the first 10 movies and return the next 10 movies.
// db.movies.find().skip(10).limit(10);

// 7. Unwind the genres array field to create separate documents for each genre.
// db.movies.aggregate([{ $unwind: "$genres" }]);

// 8. Set a new field isHighlyRated to true for movies with an IMDB rating greater than 8.
// db.movies.updateMany({ "imdb.rating": { $gt: 8 } }, { $set: { isHighlyRated: true } });

// 9. Unset the poster field from the movie documents.
// db.movies.updateMany({}, { $unset: { poster: 1 } });

// 10. Add a new field ratingCategory based on the IMDB rating using $addFields.
// db.movies.aggregate([{ $addFields: { ratingCategory: "$imdb.rating" } }]);

// 11. Use $facet to group movies by genres and calculate the average rating for each genre.
// db.movies.aggregate([{ $unwind: "$genres" }, { $facet: { movies: [{ $group: { _id: "$genres", rating: { $avg: { $convert: { input: "$imdb.rating", to: "double", onError: 1, onNull: 1 } } } } }, { $project: { _id: 0, genre: "$_id", avgRating: "$rating" } }] } }])

// 12. Lookup the comments collection to get the comments for each movie.
// db.movies.aggregate([{ $lookup: { from: "comments", localField: "_id", foreignField: "movie_id", as: "comments" } }])

// 13. Match movies released between 2000 and 2010.
// db.movies.aggregate([{ $match: { year: [{ $gte: 2000 }, { $lte: 2010 }] } }]);

// 14. Group movies by their language and get the total IMDB votes for each language.
// db.movies.aggregate([
//     { $unwind: "$languages" },
//     { $group: { _id: "$languages", votes: { $sum: "$imdb.votes" } } },
//     { $project: { _id: 0, language: "$_id", totalVotes: "$votes" } },
//     { $sort: { totalVotes: -1 } }
// ])

// 15. Project the title, director, and a truncated version of the plot using $substr.
// db.movies.aggregate([{ $project: { _id: 0, title: 1, directors: 1, Plot: { $substr: ["$plot", 0, 10] } } }])

// 16. Sort movies by their runtime in ascending order.
// db.movies.aggregate([{ $project: { _id: 0, title: 1, runtime: 1 } }, { $sort: { runtime: 1 } }])

// 17. Limit the result to movies with a runtime less than 120 minutes.
// db.movies.aggregate([{ $match: { runtime: { $lt: 120 } } }, { $project: { _id: 0, title: 1, runtime: 1 } }])



// ____________Due



// 18. Skip movies with a specific keyword (e.g., "vampire") in their plot.
// db.movies.aggregate([
//   {
//     $match: {
//       $expr: {
//         $in: ["vampire",{$cond:{if:{$isNull:["$plot",""]},then:{$split: ["$plot", " "] },else:[]}} ]
//       }
//     }
//   }
// ])

// 19. Unwind the cast array field to create separate documents for each cast member.


// 20. Set a new field finalReview by subtracting the viewer field from critic.


// 21. Unset the tomatoes field from the movie documents.


// 22. Add a new field titleLength with the length of the movie title using $strLenCP.


// 23. Match movies with a specific actor (e.g., "Brad Pitt") in the cast array.