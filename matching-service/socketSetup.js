const userSockets = {}; // Store user sockets by username

function initializeSocketManager(io) {
  io.on('connection', (socket) => {
    console.log("Socket connected")

    socket.on('login', (user) => {
      // Store the socket ID associated with the username
      userSockets[user.username] = socket.id;
      console.log(`socket setup for ${user.username} done`);
      console.log(userSockets)
    });

    socket.on('disconnect', () => {
      console.log("Socket disconnected")
      // Remove the socket entry when a user disconnects
      const username = Object.keys(userSockets).find(
        (key) => userSockets[key] === socket.id
      );
      if (username) {
        delete userSockets[username];
      }
    });
  });
}

function getUserSocket(username) {
  return userSockets[username];
}

module.exports = {
  initializeSocketManager,
  getUserSocket,
};
