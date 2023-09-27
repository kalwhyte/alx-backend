import { Queue, Job } from "kue";

/**
 * create a function to create push notification
 * @param {*} jobs 
 * @param {*} queue 
 */
export const createPushNotificationsJobs = (jobs, queue) => {
    if (!Array.isArray(jobs)) throw new Error("Jobs is not an array");
    for (const jobData of jobs) {
        const job = queue.create("push_notification_code_3", jobData).save((err) => {
        if (!err) console.log(`Notification job created: ${job.id}`);
        });

        job
            .on("complete", () => console.log(`Notification job ${job.id} completed`))
            .on("failed", (err) => console.log(`Notification job ${newJob.id} failed: ${err}`))
            .on("progress", (progress) => console.log(`Notification job ${job.id} ${progress}% complete`));
    }
};
