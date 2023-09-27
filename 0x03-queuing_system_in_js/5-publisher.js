import redis from 'redis';
/* create a redis client */
const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
}
);

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: {err}`);
}
);

function publishMessage(message, time) {
    setTimeout(() => {
        console.log(`About to send ${message}`);
        client.publish('holberton school channel', message);
    }, time);
}

function publishMessages() {
    for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) publishMessage(`Holberton Student ${i} start course`, i * 100);
        else publishMessage('Kill Server', i * 300);
    }
}

publishMessages();