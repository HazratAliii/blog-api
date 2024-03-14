const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
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

let logs = [];

morgan.format("myformat", (tokens, req, res) => {
  const logEntry = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

  console.log(logEntry);
  logs.push(logEntry);
  return logEntry;
});
app.use(morgan("myformat"));
app.get("/logs", (req, res) => {
  res.status(200).json(logs);
});

app.use("/uploads", express.static("uploads"));
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
