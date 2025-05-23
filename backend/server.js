import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";

import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import geminiRoutes from "./routes/geminiRoute.js";
import { v2 as cloudinary } from "cloudinary";
import { app, io, server } from "./socket/socket.js";
import job from "./cron/cron.js";

connectDB();
job.start(); // adding crons features( make a get request every 14 minutes)

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/gemini", geminiRoutes);

// This part is for Deployment::::::::::::::::::::::::::::::::::::
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
//////////////////////////////////////////////////////////////

server.listen(PORT, () =>
  console.log(`🚀 Server started at http://localhost:${PORT}`)
);

/////// Deployment::::
// "scripts": {
//   "dev": "cross-env NODE_ENV=development nodemon backend/server.js",
//   "start": "cross-env NODE_ENV=production node backend/server.js",
//   "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"
// },

// Development::::::::::
// "scripts": {
//     "dev": "nodemon server.js",
//     "start": "node server.js"
//   },
