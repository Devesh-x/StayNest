import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ CORS configuration for socket server
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'https://stay-nest-nu.vercel.app',
  'https://staynest-client.vercel.app',
  'https://stay-nest-git-main-devesh-xs-projects.vercel.app'
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  },
});

// In-memory storage
let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

// Socket events
io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);
  
  socket.on("newUser", (userId) => {
    console.log(`👤 New user online: ${userId}`);
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`📨 Message sent to: ${receiverId}`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔌 User disconnected: ${socket.id}`);
    removeUser(socket.id);
  });
});

// ✅ Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    message: "Socket server is running", 
    timestamp: new Date().toISOString(),
    onlineUsers: onlineUser.length,
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ Dynamic port for Render or fallback for localhost
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✅ Socket.IO server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Allowed origins: ${allowedOrigins.join(', ')}`);
});
