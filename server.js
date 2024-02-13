const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const blogRoute = require("./routes/blog");

const app = express();
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRoute);

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
