/**
 * 1. Redis Hashes
 * Redis hashes are maps between string fields and string values.
 * Hence, they are the perfect data type to represent objects.
 * 
 * In this exercise, you will store a user object in Redis using the
 * hset command.
 * 
 * The key of hash should be HolbertonSchools.
 * The user object should have the following fields:
 * - Portland=50
 * - Seattle=80
 * - New York=20
 * - Bogota=20
 * - Cali=40
 * - Paris=2
 * 
 * use redis.print for each hse
 * 
 * Display the whole hash using hgetall and redis.print
 */

const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
}
);

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
}
);

const hash = {
    Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2
};

for (const key in hash) {
    client.hset('HolbertonSchools', key, hash[key], redis.print);
}

client.hgetall('HolbertonSchools', (err, res) => {
    console.log(res);
});
