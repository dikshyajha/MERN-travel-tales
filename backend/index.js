require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Create HTTP server for socket support
const http = require("http").createServer(app);

// Initialize socket.io
const io = require("socket.io")(http, {
  cors: {
    origin: "*", // you can restrict to your frontend URL in production
  },
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(__dirname + "/uploads"));

// Routers
const userRouter = require("./modules/user/router");
const authRouter = require("./modules/authentication/router");
const adminRouter = require("./modules/admin/router");
const blogpostRouter = require("./modules/blogpost/router");
const savedpostRouter = require("./modules/savedpost/router");

// Use routers
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/blogpost", blogpostRouter);
app.use("/savedpost", savedpostRouter);

// Root route
app.get("", (req, res) => {
  res.send("Backend is working");
});

// ⬇️ SOCKET.IO CHAT FEATURE (Private messaging support)
const onlineUsers = {}; // userId => socketId

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Register user when they connect
  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("Online users:", onlineUsers);
  });

  // Listen for chat messages
  socket.on("chatMessage", ({ from, to, text }) => {
    const time = new Date().toLocaleTimeString();

    // Send to receiver only if online
    const receiverSocket = onlineUsers[to];
    if (receiverSocket) {
      io.to(receiverSocket).emit("chatMessage", { from, text, time });
    }

    // Optionally send back to sender so it appears immediately
    socket.emit("chatMessage", { from, text, time });
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // Remove user from onlineUsers
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }
    console.log("Online users:", onlineUsers);
  });
});

const PORT = process.env.PORT || 8888;
const MONGODB_URL = process.env.MONGODB_URL;

// Start backend + connect DB
http.listen(PORT, async () => {
  console.log("Server with Socket.io running on port 8888");
  try {
    await mongoose.connect(
      MONGODB_URL
    );
    console.log("Database connected");
  } catch (e) {
    console.log("Database Error:", e);
  }
});
