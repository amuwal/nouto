const Express = require("express")
const router = Express.Router() // Capital R in router and call it
const User = require("../models/User") // User model
const { body, validationResult } = require('express-validator'); // To validate the user input ne

// Creating a user using "POST /api/auth" (Doesn't require authentication)

// router.post >> router.get (for data protection?)
router.post("/", [
        body('email', "Please enter a valid email").isEmail(), // second value in body is the error message
        body('name', "Name length should be > 3").isLength({ min: 3 }),
        body('password', "Password length should be > 5").isLength({ min: 5 }),
    ],
    // checkout https://express-validator.github.io/docs/ for reference
    (req, res) => {
        // Validate input and if something is wrong send error message
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a user and save it into the database
        User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }).then(user => res.json(user)) // don't use res.send after this (Ignorable)
            // awateru na kantan na mono de aansu - mukashi no omae
            // catch function is handling the error due to invalid input and keeping the app from crashing
            .catch(err => {
                console.log(err),
                    res.json({
                        error: "unexpected error oh no",
                        message: err.message
                    })
            })

        console.log(req.body)
    })

module.exports = router