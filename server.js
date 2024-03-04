const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoute = require("./routes/auth");
const blogRoute = require("./routes/blog");
const categoryRoute = require("./routes/category");
const commentRoute = require("./routes/comment");
const tagRoute = require("./routes/tag");
const userRoute = require("./routes/user");

const app = express();
require("dotenv").config();
const port = process.env.PORT;
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    allowedHeaders: "X-Requested-With, Content-Type, Authorization",
    methods: "GET, POST, PATCH, PUT, POST, DELETE, OPTIONS",
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/user", userRoute);

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
