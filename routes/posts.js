const router = require("express").Router();
const verify = require("../verification/verifyToken"); // verification middleware

router.get('/', verify, (req,res) => {
    res.send(req.user) // get userid
    // User.findbyOne({_id:req.user})
    // res.json({posts: {title: "my first post", 
    //                 description: "random data"}});
})
module.exports = router;
