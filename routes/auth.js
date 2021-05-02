// routes for authentication
// export it

const router = require("express").Router();

router.post("/register", (res, req) => {
  res.send("register");
});



module.exports = router;
