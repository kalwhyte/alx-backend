import redis from 'redis'
import { promisify } from 'util'

// create and connect redis client to local instance.
const client = redis.createClient();

client.on('connect', () => {
	console.log('Redis client connected to the server');
});

/* handle errors */
client.on('error', (err) => {
	console.log('Redis client not connected to the server: ERROR_MESSAGE');
});

/* Promisify the Redis get method */
const getAsync = promisify(client.get).bind(client);

/* setNewSchool(schoolName, value)
	-  that redis set key schoolName with the value.
*/
async function setNewSchool(schoolName, value) {
	try {
		const res = await getAsync(schoolName);
		console.log(`Value for ${schoolName} is ${res}`);
	} catch (err) {
		console.log(`Error setting value for ${schoolName}: ${err}`);
	}
}

/* displaySchoolValue(schoolName)
	-  that redis get key schoolName
	-  and print it.
*/
function displaySchoolValue(schoolName) {
	client.get(schoolName, (err, res) => {
		if (err) {
			console.log(`Error getting value for ${schoolName}: ${err}`);
		} else {
			console.log(`Value for ${schoolName} is ${res}`);
		}
	});
}

/* call both functions */
displaySchoolValue('Holberton');
setNewSchool('HolbertonSchoolsSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
