const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// import routes
const authRoute = require("./routes/auth");

// grab data from .env
dotenv.config();

// connect to DB
const uri = process.env.uri;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("connected to DB")
);

// middleware

// only for PUT and POST requests
// to recognize the incoming Request Object as a JSON Object 
app.use(express.json());

// route middleware
app.use("/api/user", authRoute);

app.get("/", (req, res) => {
    res.send("this is working");
  });
  

app.listen(3000, () => console.log("server is working"));
