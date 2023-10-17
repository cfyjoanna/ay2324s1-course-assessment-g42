const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

const { initializeSocketManager } = require('./socketSetup');
const consumeMessages = require('./consumeMessages'); // Require consumeMessages module

app.use(
  cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes for matching behaviour
app.use("/match", require('./routes/matching-route'));

// Initialize the socket manager
initializeSocketManager(io);

// Consume from CloudAMQP
consumeMessages(io);

server.listen(80, () => console.log("Matching server Started on Port 80"));

// TODO: add socket disconnection if server is terminated/restarted