const Express = require("express")
const router = Express.Router() // Capital R in router and call it
const User = require("../models/User") // User model

// Creating a user using "POST /api/auth" (Doesn't require authentication)

// router.post >> router.get (for data protection?)
router.post("/", (req, res) => {
    const user = User(req.body) // req.body is json data
    user.save() // save user in our database (mongodb)

    res.send(req.body) // output
    console.log(req.body)
})

module.exports = router