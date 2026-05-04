const { createClient } = require("redis");

let client;

const connectRedis = async () => {
    client = createClient({
        username: 'default',
        password: 'CXw2gPLTj2LbvhmA4FGazo4yphqLk4Km',
        socket: {
            host: 'redis-11899.c330.asia-south1-1.gce.cloud.redislabs.com',
            port: 11899
        }
    });
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
}

module.exports({ connectRedis, client });