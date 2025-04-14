let userSocketMap = {};
let socketUserMap = {}; // Reverse map: socketId => userId

const getSocketIdForUser = (userId) => {
  return userSocketMap[userId.toString()];
};

const addSocketForUser = (userId, socketId) => {
  userSocketMap[userId.toString()] = socketId;
  socketUserMap[socketId] = userId;
};

const removeSocketBySocketId = (socketId) => {
  const userId = socketUserMap[socketId];
  if (userId) {
    delete userSocketMap[userId];
    delete socketUserMap[socketId];
  }
};

module.exports = {
  getSocketIdForUser,
  addSocketForUser,
  removeSocketBySocketId
};
