import { createPushNotificationsJobs } from "./8-job";
import kue from "kue";
import sinon from "sinon";
import { expect } from "chai";
import { createQueue } from "kue";
import { after } from "node:test";

/**
 * Import the function createPushNotificationsJobs
 * Create a queue with kue
 * write a test suite for the function createPushNotificationsJobs
 * use queue.testMode to validate which jobs are inside the queue
 */
describe("createPushNotificationsJobs", () => {
  const HELLO = sinon.spy(console);
	const QUEUE = createQueue({ name: 'push_notification_code_test' });

  before(() => {
   	queue.testMode.enter(true);
  });

  after(() => {
 		QUEUE.testMode.clear();
   	QUEUE.testMode.exit();
  });

	afterEach(() => {
	 	HELLO.resetHistory();
	});

  it("display an error message if jobs is not an array", () => {
    expect(
    	createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, QUEUE)
			).toThrow("Jobs is not an array");
  });

	it('adds jos to the queue', (done) => {
		expect(QUEUE.testMode.jobs.length).to.equal(0);
		const jobData = [
			{
				phoneNumber: '4153518780',
				message: 'This is the code 1234 to verify your account'
			},
			{
				phoneNumber: '4153518781',
				message: 'This is the code 4562 to verify your account'
			},
		];
		createPushNotificationsJobs(jobData, QUEUE);
		expect(QUEUE.testMode.jobs.length).to.equal(2);
		expect(QUEUE.testMode.jobs[0].data).to.deep.equal(jobData[0]);
		expect(QUEUE.testMode.jobs[0].type).to.equal('push_notification_code_test_3');
		QUEUE.process('push_notification_code_test_3', () => {
			expect(
				HELLO.log
					.calledWith('Notification job', QUEUE.testMode.jobs[0].id)
			).to.be.true;
			done();
		});
	});
		
	it('register the progress', (done) => {
		QUEUE.testMode.jobs[0].addListener('progress', () => {
			expect(
				HELLO.log
					.calledWith('Notification job, QUEUE.testMode.jobs[0].id, 25% complete')
			).to.be.true;
			done();
		});
		QUEUE.testMode.jobs[0].emit('progress', 25);
	});

	it('register the failed', (done) => {
		QUEUE.testMode.jobs[0].addListener('failed', () => {
			expect(
				HELLO.log
					.calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'failed')
			).to.be.true;
			done();
			});
		QUEUE.testMode.jobs[0].emit('failed');
	});

	it('register the completed', (done) => {
		QUEUE.testMode.jobs[0].addListener('completed', () => {
			expect(
				HELLO.log
					.calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'completed')
				).to.be.true;
				done();
			});
		QUEUE.testMode.jobs[0].emit('completed');
	});
});
