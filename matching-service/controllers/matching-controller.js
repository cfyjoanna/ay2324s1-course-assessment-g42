const createConnection = require("../cloudampq.js");
let connection;

async function publishMatchMessage(req, res) {
  try {

    const { username, difficulty } = req.body;

    if (!connection) {
      connection = await createConnection();
    }
    const channel = await connection.createChannel();

    const queueName = `${difficulty}-match-queue`;
    const message = JSON.stringify({ username: username });

    await channel.assertQueue(queueName, { durable: false });
    await channel.sendToQueue(queueName, Buffer.from(message));

    console.log(`${username } sent a match message sent to ${queueName}`);
  } catch (error) {
    console.error('Error publishing match message:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { publishMatchMessage };
