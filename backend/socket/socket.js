import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; //userId: socketId
const activeChatUsers = new Set(); // Track users currently on "/chat"

export const getRecipientSocketId = (recipientId) => {
  return userSocketMap[recipientId] || null;
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    socket.userId = userId; // ✅ Store userId inside socket
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ✅ Handle User Entering Chat Page
  socket.on("userInChatPage", (userId) => {
    if (userId) activeChatUsers.add(userId);
  });

  // ✅ Handle User Leaving Chat Page
  socket.on("userLeftChatPage", (userId) => {
    if (userId) activeChatUsers.delete(userId);
  });

  socket.on("typing", ({ conversationId, userId }) => {
    const recipientSocketId = getRecipientSocketId(userId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("userTyping", { conversationId });
    }
  });

  socket.on("stopTyping", ({ conversationId, userId }) => {
    const recipientSocketId = getRecipientSocketId(userId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("userStoppedTyping", { conversationId });
    }
  });

  socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
    try {
      await Message.updateMany(
        { conversationId: conversationId, seen: false },
        { $set: { seen: true } }
      );
      await Conversation.updateOne(
        { _id: conversationId },
        { $set: { "lastMessage.seen": true } }
      );
      io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    if (socket.userId) {
      delete userSocketMap[socket.userId];
      activeChatUsers.delete(socket.userId);
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, server, app, activeChatUsers };
