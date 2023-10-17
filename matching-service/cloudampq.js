require('dotenv').config();
const amqp = require('amqplib');

const createConnection = async () => {
  try {
    const connection = await amqp.connect(process.env.CLOUDAMPQ_URL, {
      hostname: process.env.CLOUDAMPQ_URL, // Set the hostname to match the URL
      port: process.env.CLOUDAMPQ_PORT,
      username: process.env.CLOUDAMPQ_USERNAME,
      password: process.env.CLOUDAMPQ_PASSWORD,
    });

    console.log("Connected to CloudAMPQ");
    return connection;
  } catch (err) {
    console.error("Error connecting to CloudAMPQ", err);
    throw err;
  }
};

module.exports = createConnection;
