const Express = require("express")
const router = Express.Router() // Capital R in router and call it
const User = require("../models/User") // User model
const { body, validationResult } = require('express-validator'); // To validate the user input ne
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fetchuser = require("../middleware/fetchuser")

// temporary
const verySecret = "korewahimitsu"


// Route 1
// Creating a user using "POST /api/auth" (Doesn't require authentication)
// router.post >> router.get (for data protection?)
router.post("/createuser", [
        body('email', "Please enter a valid email").isEmail(), // second value in body is the error message
        body('name', "Name length should be > 3").isLength({ min: 3 }),
        body('password', "Password length should be > 5").isLength({ min: 5 }),
    ],
    // checkout https://express-validator.github.io/docs/ for reference
    async(req, res) => {
        // Validate input and if something is wrong send error message
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Create a user and save it into the database
            let user = await User.findOne({ email: req.body.email }) // Check if user already exists
            if (user) {
                return res.status(400).json({ error: "User with this email already exists" })
            }

            const salt = await bcrypt.genSalt(10)
            const encryptedPass = await bcrypt.hash(req.body.password, salt)


            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: encryptedPass,
            })

            const jwtData = { id: user.id }
            const authToken = jwt.sign(jwtData, verySecret)

            res.json(authToken)
            console.log(authToken, encryptedPass)

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some error occurred. Now your fault though")
        }
    })


// Route 2
// To authenticate a user. No login required
router.post("/login", [
        body('email', "Please enter a valid email").isEmail(), // Check for valid email
        body("password", "Password can't be blank").exists()
    ],

    async(req, res) => {
        // Validate input 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Find a user with the email provided
            const email = { "email": req.body.email }
            const user = await User.findOne(email)
                // Send error message if user not found
            if (!user) {
                return res.status(400).json("Please check your entries and try again")
            }

            // match the password provided from the password in database
            const match = await bcrypt.compare(req.body.password, user.password)
                // Send error msg if password doen't match
            if (!match) {
                return res.status(400).json("Please check your entries and try again")
            }

            // At this point we know provided input is valid so we provide a auth token in return
            const jwtData = { id: user.id }
            const token = jwt.sign(jwtData, verySecret)

            res.json(token)

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Sorry bro")
        }
    })

// Route 3
router.post("/fetchuser", fetchuser, async(req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("OH no")
    }
})

module.exports = router