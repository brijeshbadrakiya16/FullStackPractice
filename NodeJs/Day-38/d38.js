// Day-38

// Day: 23/04/2026
// Task: Read insert, update, search queries from the mongodb docs. Completed all queries which of aggregate, and also wrote all queries for the task given by sir today, as gained more undestanding for aggregate, bucket, unwind, and conditional expressions such ifNull and $convert, and did a dataEntry task given by hiten sir as entered 12 games data to yudiz portafolio.

// ______________________________________________________


// 18. Skip movies with a specific keyword (e.g., "vampire") in their plot.
// db.movies.aggregate([
//     {
//         $project: {
//             _id: 0,
//             title: 1,
//             plot: 1,
//             keys: { $split: ["$plot", " "] }
//         }
//     },
//     {
//         $match: {
//             $expr: {
//                 $not: {
//                     $in: ["vampire", { $ifNull: ["$keys", []] }]
//                 }
//             }
//         }
//     }
// ])

// 19. Unwind the cast array field to create separate documents for each cast member.
// db.movies.aggregate([{ $unwind: "$cast" }]);


// __________ ? __________
// 20. Set a new field finalReview by subtracting the viewer field from critic.
// db.movies.updateMany({}, [
//     {
//         $set: {
//             finalReview: {
//                 rating: {
//                     $abs: {
//                         $subtract: [
//                             {
//                                 $ifNull: [
//                                     "$tomatoes.critic.rating",
//                                     0
//                                 ]
//                             },
//                             {
//                                 $ifNull: [
//                                     "$tomatoes.viewer.rating",
//                                     0
//                                 ]
//                             }
//                         ]
//                     }
//                 },
//                 numReviews: {
//                     $abs: {
//                         $subtract: [
//                             {
//                                 $ifNull: [
//                                     "$tomatoes.critic.numReviews",
//                                     0
//                                 ]
//                             },
//                             {
//                                 $ifNull: [
//                                     "$tomatoes.viewer.numReviews",
//                                     0
//                                 ]
//                             }
//                         ]
//                     }
//                 },
//                 meter: {
//                     $abs: {
//                         $subtract: [
//                             {
//                                 $ifNull: [
//                                     "$tomatoes.critic.meter",
//                                     0
//                                 ]
//                             },
//                             {
//                                 $ifNull: [
//                                     "$tomatoes.viewer.meter",
//                                     0
//                                 ]
//                             }
//                         ]
//                     }
//                 },
//             }
//         }
//     }
// ])

// 21. Unset the tomatoes field from the movie documents.
// db.movies.updateMany({},{$unset:{tomatoes:1}});

// 22. Add a new field titleLength with the length of the movie title using $strLenCP.
// db.movies.updateMany({}, [{ $set: { titleLength: { $strLenCP: "$title" } } }]);

// 23. Match movies with a specific actor (e.g., "Brad Pitt") in the cast array.
// db.movies.aggregate([
//     {
//         $match: {
//             cast: "Brad Pitt"
//         }
//     }
// ])

// _____________________________________________________

// _________________ NEW TASK ___________________


// 1. Find the top 10 movies with the highest IMDB rating and sort them by their runtime in descending order.
// db.movies.aggregate([
//     {
//         $project: {
//             _id: 0,
//             title: 1,
//             runtime: 1,
//             rating: {
//                 $convert: {
//                     input: "$imdb.rating",
//                     to: "double",
//                     onError: 0,
//                     onNull: 0
//                 }
//             }
//         }
//     },
//     {
//         $sort: {
//             rating: -1
//         }
//     },
//     { $limit: 10 },
//     {
//         $sort: {
//             runtime: -1
//         }
//     }
// ])

// 2. Calculate the average IMDB rating for movies in each genre and sort the genres by their average rating in descending order.
// db.movies.aggregate([
//     { $unwind: "$genres" },
//     {
//         $group: {
//             _id: "$genres",
//             avgRating: {
//                 $avg: {
//                     $convert: {
//                         input: "$imdb.rating",
//                         to: "double",
//                         onError: 0,
//                         onNull: 0
//                     }
//                 }
//             }
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             genre: "$_id",
//             avgRating: 1
//         }
//     },
//     {
//         $sort: {
//             avgRating: -1
//         }
//     }
// ])

// 3. Find the movies with the longest plot summary and project only the title, plot, and fullplot fields.
// db.movies.aggregate([
//     {
//         $project: {
//             _id: 0,
//             title: 1,
//             plot: 1,
//             fullplot: 1,
//             len: {
//                 $strLenCP: {
//                     $ifNull: ["$plot", ""]
//                 }
//             }
//         }
//     },
//     {
//         $sort: {
//             len: -1
//         }
//     },
//     {
//         $project: {
//             len: 0
//         }
//     }
// ])

// 4. Get the count of movies released in each decade and sort the decades by the movie count in descending order.
// 1903-2016
// db.movies.aggregate([
//     {
//         $project: {
//             release: { $ifNull: [{ $year: "$released" }, 1903] }
//         }
//     },
//     {
//         $bucket: {
//             groupBy: "$release",
//             boundaries: [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010],
//             default: "Released from 2010",
//             output: {
//                 count: { $sum: 1 }
//             }
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             range: {
//                 $concat: [
//                     {
//                         $convert: {
//                             input: "$_id",
//                             to: "string"
//                         }
//                     },
//                     " to ",
//                     {
//                         $convert: {
//                             input: {
//                                 $add: [
//                                     {
//                                         $convert: {
//                                             input: "$_id",
//                                             to: "int",
//                                             onError: 2010
//                                         }
//                                     }, 9]
//                             },
//                             to: "string"
//                         }
//                     }
//                 ]
//             },
//             count: 1
//         }
//     }
// ])

// 5. Find the top 5 directors who have directed the most movies and calculate the average IMDB rating of their movies.
// db.movies.aggregate([
//     { $unwind: "$directors" },
//     {
//         $group: {
//             _id: "$directors",
//             count: { $sum: 1 },
//             avgImdbRating: {
//                 $avg: {
//                     $convert: {
//                         input: "$imdb.rating",
//                         to: "double",
//                         onError: 0,
//                         onNull: 0
//                     }
//                 }
//             }
//         }
//     },
//     {
//         $sort: {
//             count: -1
//         }
//     },
//     { $limit: 5 }
// ])

// 6. Calculate the total number of wins and nominations for movies in each genre and sort the genres by the total number of awards wins in descending order.
// db.movies.aggregate([
//     { $unwind: "$genres" },
//     {
//         $group: {
//             _id: "$genres",
//             totalWins: { $sum: "$awards.wins" },
//             totalNominations: { $sum: "$awards.nominations" }
//         }
//     },
//     {
//         $sort: {
//             totalWins: -1
//         }
//     }
// ])

// 7. Get the count of movies released in each year and calculate the average IMDB rating for each year.
// db.movies.aggregate([
//     {
//         $project: {
//             release: { $ifNull: [{ $year: "$released" }, "NA"] },
//             rating: {
//                 $convert: {
//                     input: "$imdb.rating",
//                     to: "double",
//                     onError: 0,
//                     onNull: 0
//                 }
//             }
//         }
//     },
//     {
//         $group: {
//             _id: "$release",
//             count: { $sum: 1 },
//             avgRating: { $avg: "$rating" }
//         }
//     }
// ])

// 8. Find the top 10 movies with the highest Tomatoes viewer rating and sort them by the number of Tomatoes viewer reviews in descending order.
// db.movies.aggregate([
//     {
//         $project: {
//             _id: 0,
//             title: 1,
//             tomatoes: 1
//         }
//     },
//     {
//         $sort: {
//             "tomatoes.viewer.rating": -1
//         }
//     },
//     { $limit: 10 },
//     {
//         $sort: {
//             "tomatoes.viewer.numReviews": -1
//         }
//     }
// ])

// 9. Calculate the average runtime duration for movies in each genre and sort the genres by the average runtime in descending order.
// db.movies.aggregate([
//     { $unwind: "$genres" },
//     {
//         $group: {
//             _id: "$genres",
//             avgRuntime: { $avg: "$runtime" }
//         }
//     },
//     {
//         $sort: {
//             avgRuntime: -1
//         }
//     }
// ])

// 10. Find the movies with the most cast members and project only the title, cast, and num_mflix_comments fields.
// db.movies.aggregate([
//     {
//         $project: {
//             _id: 0,
//             cast: 1,
//             title: 1,
//             num_mflix_comments: 1,
//             castsCount: { $size: { $ifNull: ["$cast", []] } }
//         }
//     },
//     {
//         $sort: {
//             castsCount: -1
//         }
//     },
//     {
//         $project: {
//             castsCount: 0
//         }
//     }
// ])

// 11. Get the count of movies directed by each director and calculate the total IMDB votes for each director's movies.
// db.movies.aggregate([
//     { $unwind: "$directors" },
//     {
//         $group: {
//             _id: "$directors",
//             totalMovies: { $sum: 1 },
//             totalIMDBVotes: { $sum: { $ifNull: ["$imdb.votes", 0] } }
//         }
//     }
// ])

// 12. Calculate the total number of movies released in each country and sort the countries by the movie count in descending order.
// db.movies.aggregate([
//     { $unwind: "$countries" },
//     {
//         $group: {
//             _id: "$countries",
//             movieCount: { $sum: 1 }
//         }
//     },
//     {
//         $sort: {
//             movieCount: -1
//         }
//     }
// ])

// 13. Get the count of movies with each IMDB rating and sort the ratings by the movie count in descending order.
// db.movies.aggregate([
//     {
//         $group: {
//             _id: "$imdb.rating",
//             movieCount: { $sum: 1 }
//         }
//     },
//     {
//         $sort: {
//             movieCount: -1
//         }
//     }
// ])

// 14. Find the movies with the most IMDB votes in each country and project only the title, country, and IMDB votes fields.
// db.movies.aggregate([
//     { $unwind: "$countries" },
//     {
//         $group: {
//             _id: "$countries",
//             movies: { $push: "$title" },
//             totalIMDBVotes: { $sum: { $ifNull: ["$imdb.votes", 0] } }
//         }
//     },
//     {
//         $sort: {
//             totalIMDBVotes: -1
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             Country: "$_id",
//             movies: 1,
//             totalIMDBVotes: 1
//         }
//     }
// ])

// 15. Get the count of movies released in each month and calculate the average IMDB rating for each month.
// db.movies.aggregate([
//     {
//         $group: {
//             _id: { $ifNull: [{ $month: "$released" }, "NA"] },
//             movieCount: { $sum: 1 },
//             avgRating: {
//                 $avg: {
//                     $convert: {
//                         input: "$imdb.rating",
//                         to: "double",
//                         onError: 0,
//                         onNull: 0
//                     }
//                 }
//             }
//         }
//     }
// ])

// 16. Find the top 5 cast members who have appeared in the most movies and calculate the average IMDB rating of their movies.
// db.movies.aggregate([
//     { $unwind: "$cast" },
//     {
//         $group: {
//             _id: "$cast",
//             movies: { $sum: 1 },
//             avgImdbRating: {
//                 $avg: {
//                     $convert: {
//                         input: "$imdb.rating",
//                         to: "double",
//                         onError: 0,
//                         onNull: 0
//                     }
//                 }
//             }
//         }
//     },
//     {
//         $sort: {
//             movies: -1
//         }
//     },
//     { $limit: 5 },
//     {
//         $project: {
//             _id: 0,
//             Cast: "$_id",
//             movies: 1,
//             avgImdbRating: 1
//         }
//     }
// ])

// 17. Get the count of movies with each combination of genre and IMDB rating, and sort the combinations by the movie count in descending order.
// db.movies.aggregate([
//     { $unwind: "$genres" },
//     {
//         $group: {
//             _id: {
//                 genre: "$genres",
//                 imdbRating: {
//                     $convert: {
//                         input: "$imdb.rating",
//                         to: "double",
//                         onError: "NA",
//                         onNull: "NA"
//                     }
//                 }
//             },
//             moviesCount: { $sum: 1 },
//         }
//     },
//     {
//         $sort: {
//             moviesCount: -1
//         }
//     }
// ])

// 18. Get the count of movies with each runtime duration range (e.g., 0–60 minutes, 61–120 minutes, etc.) and sort the ranges by the movie count in descending order.
// db.movies.aggregate([
//     {
//         $bucket: {
//             groupBy: "$runtime",
//             boundaries: [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900],
//             default: "Greater than 900",
//             output: {
//                 movieCount: { $sum: 1 }
//             }
//         }
//     },
//     {
//         $sort: {
//             movieCount: -1
//         }
//     }
// ])