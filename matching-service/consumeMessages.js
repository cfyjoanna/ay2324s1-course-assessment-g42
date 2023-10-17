const { getUserSocket } = require('./socketSetup');
const createConnection = require('./cloudampq.js');
const queueName = 'easy-match-queue';

let connection; // Variable to store the RabbitMQ connection
let channel;

const easyQueue = [];

async function consumeMessages(io) {
  if (!connection) {
    connection = await createConnection(); // Create the connection only if it doesn't exist
  }
  if (!channel) {
    channel = await connection.createChannel(); // Create the channel only if it doesn't exist
    await channel.assertQueue(queueName, { durable: false });
    console.log(`Consumer is waiting for messages in the ${queueName} queue.`);
  }

  channel.consume(queueName, async (message) => {
    const messageContent = JSON.parse(message.content.toString());

    // Add the user to the waiting list
    easyQueue.push({ username: messageContent.username, message: message });

    // Attempt to match any waiting users
    if (easyQueue.length >= 2) {
      const user1 = easyQueue.shift();
      const user2 = easyQueue.shift();

      // Log the matched usernames to the console
      console.log(`Matched users: ${user1.username} and ${user2.username}`);

      io.to(getUserSocket(user1.username)).emit('matched', user2.username);
      io.to(getUserSocket(user2.username)).emit('matched', user1.username);
    }

    // Acknowledge the message to remove it from the queue
    channel.ack(message);
  });
}

module.exports = consumeMessages;
