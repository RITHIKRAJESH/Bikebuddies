const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const http = require('http'); // <- Add this
const socketIo = require('socket.io'); // <- And this
const dbConnect = require('./models/dbconnect');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dbConnect();

// Routers
const userRouter = require('./router/userRouter');
app.use('/user', userRouter);

const riderRouter = require('./router/riderRouter');
app.use('/rider', riderRouter);

const adminRouter = require('./router/adminRouter');
app.use('/admin', adminRouter);
const { addSocketForUser, removeSocketBySocketId } = require('./socketmanager'); 
// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // set to frontend URL in production
  }
});
global._io = io
// Socket.IO setup
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('riderConnected', (userId) => {
    addSocketForUser(userId, socket.id); 
    console.log(userId)
    console.log(`Rider ${userId} connected with socket ID: ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    removeSocketBySocketId(socket.id); 
  });
});
// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
