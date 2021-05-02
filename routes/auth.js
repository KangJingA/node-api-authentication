// routes for authentication
// export it

const router = require("express").Router();

router.post('/register', (req, res) => {
  res.send("register");
});



module.exports = router;
