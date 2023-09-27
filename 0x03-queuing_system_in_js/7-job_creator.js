// create an array jobs with the following data:

const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

// create a queue with kue
const kue = require('kue');
const queue = kue.createQueue();

//  write a loop that will go through the array jobs and for each object:
//  create a queue named push_notification_code_2 with the job data
const jobData = {
	phoneNumber: '4153518780',
	message: 'This is the code 1234 to verify your account'
};

const job = queue.create('push_notification_code_2', jobData).save((err) => {
	if (!err) console.log(`Notification job created: ${job.id}`);
});

//  On job cmpletion, print out Notification job created JOB_ID
job.on('complete', () => console.log(`Notification job ${job.id} completed`));

//  On job failure, print out Notification job JOB_ID failed
job.on('failed', (err) => console.log(`Notification job ${job.id} failed: ${err}`));

//  On job progress, print out Notification job JOB_ID PERCENTAGE_COMPLETE%
job.on('progress', (progress) => console.log(`Notification job ${job.id} ${progress}% complete`));