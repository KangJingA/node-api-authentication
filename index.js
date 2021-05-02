const express = require('express');
const app = express();

// import routes
const authRoute = require('./routes/auth');

app.get('/', (req,res)=> {
    res.send("this is working");
})

// route middleware
app.use('./api/user',authRoute)


app.listen(3000, ()=> console.log("server is working"))