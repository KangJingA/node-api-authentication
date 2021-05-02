// routes for authentication
const router = require("express").Router();
// grab schema
const User = require("../model/User");
// validation functions
const { registerValidation, loginValidation } = require("../validation");
// hashing
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  // validate data before creating user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create user
  // check out REST API video to understand this
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  // store user
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    // set response status to 400, send error
    res.status(400).send(error);
  }
});

router.post("/login", async(req,res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email }); // understand how to destructure
  console.log(user);
  if (!user) return res.status(400).send("Email does not exist");

  // check password is correct
  // compare body password vs password in database
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send("Invalid password")
  
  res.send("log in success");
})


module.exports = router;
