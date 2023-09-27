/**
 * Subscriber
 * 
 * A subscriber is a function that is passed to the subscribe method of an observable.
 * 
 * The subscriber defines how to obtain or generate values or messages to be published.
 * 
 * A subscriber also defines how to handle the notifications it receives.
 * 
 * The subscriber function receives an observer object with 3 methods:
 * - next: The next method is used to send notifications to the observer.
 * - error: The error method is used to send error notifications.
 * - complete: The complete method is used to send a completion notification.
 * 
 * The subscriber function can also return a function to unsubscribe from the notifications.
 * 
 * create a redis client.
 * On connect, it should display the message Redis client connected to the server.
 * On error, it should display the message Redis client not connected to the server: ERROR_MESSAGE.
 * it should subscribe to the channel holberton school channel.
 * When it receives on the channel holberton school channel, it should display the message
 * when the message is KILL_SERVER, it should unsubscribe and quit.
 */
import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
}
);

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
}
);

client.subscribe('holberton school channel');

client.on('message', (channel, message) => {
    console.log(message);
    if (message === 'KILL_SERVER') {
        client.unsubscribe(channel);
        client.quit();
    }
}
);
