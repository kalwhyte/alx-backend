// Create a queue with kue
const kue = require('kue');
const queue = kue.createQueue();

// Create an object containing the job data
const jobData = {
    phoneNumber: '4153518780',
    message: 'This is the code to verify your account'
};

// Create a queue named push_notification_code with the jobData
const job = queue.create('push_notification_code', jobData).save((err) => {
    if (!err) console.log(`Notification job created: ${job.id}`);
});

// If an error occurs, print it
job.on('error', (err) => console.log(`Notification job created: ${job.id}`));

// If the job is assigned the status of complete, print it
job.on('complete', () => console.log('Notification job completed'));

// when the job is failed, print it
job.on('failed', (err) => console.log('Notification job failed'));

// When the queue is finished, close the connection to the Redis server
queue.on('close', () => console.log('Queue is closed'));