const express = require("express");
//import express from 'express'
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
// const multer = require("multer");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
// app.use("/user/Images", express.static(path.join(__dirname, "uploads")));
// app.use("/user/Images", express.static(__dirname + "/uploads"));
app.use("/uploads", express.static(__dirname + "/uploads"));

const userRouter = require("./modules/user/router");
const authRouter = require("./modules/authentication/router");
const adminRouter = require("./modules/admin/router");
const blogpostRouter = require("./modules/blogpost/router");
const savedpostRouter = require("./modules/savedpost/router")
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/blogpost", blogpostRouter);
app.use("/savedpost", savedpostRouter);
app.get("", (req, res) => {
  res.send("Backend is working");
});

app.listen(8888, async (req, res) => {
  console.log("App is running on 8888");
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.pgvxv3c.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database is connected");
  } catch (e) {
    console.log(e);
  }
});