const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
// connect to DB
const uri = process.env.uri;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("connected to DB")
);

// import routes
const authRoute = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("this is working");
});

// route middleware
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("server is working"));
