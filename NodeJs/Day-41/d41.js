// Day-41

// Date: 28/04/2026
// Task: Completed Redis docs as read about all needed datatypes with it's methods such as string,list,set,sortedset,hash,json,stream, as also tried to test the cloud db with help of zRange method of sortedSet to get 250000 data of leader board on single api as got avg response in 2seconds, also tried working on subscribe and publish methods of pub/sub topic. Also did multiple games entry in the Yudiz portfolio as hiten sir asked.


// ______________________________________________________

// Redis

// allDatatypes

// String


(async () => {
    const { createClient } = require('redis');
    const client = createClient({
        username: 'default',
        password: 'CXw2gPLTj2LbvhmA4FGazo4yphqLk4Km',
        socket: {
            host: 'redis-11899.c330.asia-south1-1.gce.cloud.redislabs.com',
            port: 11899
        }
    });

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    // expire
    // await client.sAdd("anything",["member1","member2","member2"]);
    // const result = await client.sMembers('anything');
    // const count = await client.sCard("anything");
    // const random = await client.sRandMember("anything");
    // console.log(result,count,random)  // >>> bar

    // await client.zAdd('leaderboard', {
    //     score: 1250,
    //     value: 'player:789'
    // });

    // await client.zAdd('leaderboard', [
    //     { score: 980, value: 'player:101' },
    //     { score: 1500, value: 'player:202' }
    // ]);

    // await client.zIncrBy('leaderboard', 100, 'player:789');

    // Read
    // const top10 = await client.zRangeWithScores('leaderboard', 0, 9, { REV: true }); // Top 10 descending
    // console.log("top 10 :",top10);
    // const byRank = await client.zRange('leaderboard', 0, 4,{REV:true});                         // By rank
    // console.log("by rank :",byRank);
    // const rank = await client.zRank('leaderboard', 'player:789');
    // console.log("rank :",rank);
    // const score = await client.zScore('leaderboard', 'player:789');
    // console.log("score :",score);
    // const count = await client.zCard('leaderboard');
    // console.log("count :",count);
    // // Range by score
    // console.log(await client.zRangeByScore('leaderboard', 0, 50));

    // // Remove
    // await client.zRem('leaderboard', 'player:101');
    // await client.zRemRangeByRank('leaderboard', 100, 200);

    // const id = await client.xAdd("game","*",{
    //     name:"Brijesh",
    //     points:"0"
    // });

    // const events = await client.xRange("game","-","+",{COUNT:10});

    // console.log(events);

    // await client.xGroupCreate()

    // JSON

    // await client.json.set("product:456","$",{
    //     name:"Laptop",
    //     price: 999,
    //     stock: 50,
    //     tags: ["gaming","tech"],
    //     otherDetails:{
    //         category: ["tech","electronics"],
    //         info:{
    //             company:"Lenovo"
    //         }
    //     }
    // })

    // await client.json.numIncrBy("product:456","$.price",-299);

    // const jsonDoc = await client.json.get("product:456",{path:"$"});
    // console.log(JSON.stringify(jsonDoc,null,4));

    // const multi = client.multi();
    // multi.set("a",1);
    // multi.incr('counter');
    // const results = await multi.exec();
    // console.log(results);

    // let result = await client.get("counter");
    // console.log(result);

    // const totalKeys = await client.scan("0");
    // console.log(totalKeys);

    console.log(await client.ping()); // returns pong if no thing provided or if any string argument provided then it will return the provided argument 
    // client.pSubscribe("channel1",true);

    let c1 = createClient({
        username: 'default',
        password: 'CXw2gPLTj2LbvhmA4FGazo4yphqLk4Km',
        socket: {
            host: 'redis-11899.c330.asia-south1-1.gce.cloud.redislabs.com',
            port: 11899
        }
    });

    let c2 = createClient({
        username: 'default',
        password: 'CXw2gPLTj2LbvhmA4FGazo4yphqLk4Km',
        socket: {
            host: 'redis-11899.c330.asia-south1-1.gce.cloud.redislabs.com',
            port: 11899
        }
    });

    let c3 = createClient({
        username: 'default',
        password: 'CXw2gPLTj2LbvhmA4FGazo4yphqLk4Km',
        socket: {
            host: 'redis-11899.c330.asia-south1-1.gce.cloud.redislabs.com',
            port: 11899
        }
    });

    let c4 = createClient({
        username: 'default',
        password: 'CXw2gPLTj2LbvhmA4FGazo4yphqLk4Km',
        socket: {
            host: 'redis-11899.c330.asia-south1-1.gce.cloud.redislabs.com',
            port: 11899
        }
    });


    await c1.connect();
    await c2.connect();
    await c3.connect();
    await c4.connect();


    // await c1.subscribe("news",true);
    // await c1.subscribe("news", (message) => { console.log("C1 listening", message) });
    await c2.subscribe("news", (message) => { console.log("C2 listening", message) });
    await c3.subscribe("news", (message) => { console.log("C3 listening", message) });
    await c4.subscribe("news", (message) => { console.log("C4 listening", message) });

    await c1.publish("news", "Got the message");

    await c1.quit();
    await c2.quit();
    await c3.quit();
    await c4.quit();

    setTimeout(async () => {
        // const result = await client.get("foo");
        // console.log(result);
        // let temp = await client.strLen('foo');
        // console.log(temp);


        // await client.flushDb('ASYNC');

        await client.close();
    }, 5500);

    // setEx(key: RedisArgument, seconds: number, value: RedisArgument): Promise < "OK" >

})();


// _________________________________________________


// const { createClient } = require("redis");
// const expr = require("express");
// const app = expr();
// let client;

// app.get("/", async (req, res) => {
//     res.send(await client.zRangeWithScores("leaderboard", 0, 250000, { REV: true }));
// });

// (async () => {
//     client = createClient({
//         username: 'default',
//         password: 'CXw2gPLTj2LbvhmA4FGazo4yphqLk4Km',
//         socket: {
//             host: 'redis-11899.c330.asia-south1-1.gce.cloud.redislabs.com',
//             port: 11899
//         }
//     });
//     await client.connect();
//     // await client.flushDb();

//     const initialLeaderboard = [];

//     // for (let i = 1; i <= 287200; i++) {
//     //     const score = Math.floor(24500 - (i * 17) + Math.random() * 800); // Decreasing trend with randomness

//     //     client.zAdd("leaderboard",{
//     //         score: Math.max(1200, score),
//     //         value: `${i}`,
//     //     }).then(()=>{
//     //         console.log(i);
//     //     });
//     // }
//     client.json.arrPop("",{path:"$.data"});
//     // 287252
//     client.on('error', err => console.log('Redis Client Error', err));

//     await app.listen(3000, () => { console.log("all thing running on 3000") });
// })();
