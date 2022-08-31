## Part 1
#### We are going to set up our app in this part

- After creating a react app we made a new folder in it called "`backend`"
- Now we installed some npm pakages namely:
```
npm install mongoose
npm install express
```
- We then installed `mongodb` and `mongodb compass` in our computer
- We copied URI from `mongodb compass` and wrote a function to connect our app to mongodb in "`db.js`"
- We exported the function and imported it in our "`index.js`" file to start a connection (by require function)
- We then copied getting started template from express.js website and pasted it in index.js exactly
- Now to start our server we installed "`nodemon`"
```
npm i -D nodemon
```
- Now we started server by 
```
npm nodemon ./index.js
```
- The server got started on the port we gave in our "`index.js`" file 

    ***ijyou***

## Part 2
#### We are going to make routes and models for our app and join them

- First we are going to create 2 new folder `models` and `routes` in out backend folder

- Let's set up our `models` folder first
 - We create 2 new files in `models` folder **Notes.js** and  **User.js** 
    > *Note that the name of model files should start with a capital letter*

 - **Notes.js**
    - We are goint to import *mongoose* and create a new *Schema*
        ```
        import mongoose from "mongoose";
        const { Schema } = mongoose;
        ```
    - Now we create a *New Schema*
        ```
        const notesSchema = new Schema({
            title: { type: String, required: true },
            description: { type: String, required: true },
            tag: { type: String, default: "General" },
            date: { type: Date, default: Date.now }
        })
        ```
    - Finally we export our model by
        ```
        module.exports = mongoose.model("notes", notesSchema)
        ```

 - **User.js**
    - The process is almost same as we created **Notes** model
    - Here is code for **User.js**
        ```
        const mongoose = require("mongoose");
        const { Schema } = mongoose;

        const userSchema = new Schema({
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            date: { type: Date, default: Date.now }
        });

        module.exports = mongoose.model("user", userSchema)
        ```
 
- Now we are goint to create `routes` for the models we just created
    - We are goint to create two routes namely **auth.js** and **notes.js**

    - Let's start with **auth.js**
        - To create a route first we need to import `express` in our file
            ```
            const Express = require("express")
            ```
            > Also remember to not use import statement in route files

        - Now we will define our **router**
            ```
            const router = Express.Router()
            ```
        
        - In the next step we write a get function to send our output
            ```
            router.get("/", (req, res) => {
                obj = {
                    name: "light",
                    age: 20
                }
                res.json(obj)
            })
            ```

        - Finally make sure to export the `router`
            ```
            module.exports = router
            ```
    
    - The process of creating our **notes** route is exactily same as **auth** route
    
    - Here is the code

        ```
        const Express = require("express");
        const router = Express.Router();

        router.get("/", (req, res) => {
            res.json([])
        })

        module.exports = router
        ```
- Finally we are going to connect the *routes* with our app in *index.js* 
    ```
    app.use("/api/auth", require("./routes/auth"))
    app.use("/api/notes", require("./routes/notes"))
    ```
## Part 3
#### We are going to validate user input for loging in and store the data in mongo database
- Before doing anything let's connect our console to the terminal by this single line of code
    ```
    app.use(express.json()) // connects console to our terminal?
    ```
- Now let's set up our `auth.js` file
 - To validate user input we are going to use **express-validator** so let's download it using npm
   ```
   npm i --save express-validator
   ```
 - Now import `User` model and `express-validator` in `auth.js` file
    ```
    const User = require("../models/User") // User model
    const { body, validationResult } = require('express-validator'); // To validate the user input ne
    ```
 - Now we are going to change our **router.get** to **router.post** in `auth.js` for better data protection

 - In the next step we are going to apply `express-validator` function

 - So the second argument in the **router.post** function is going to be a list in which we are going to set up validation requirements for user input (You can find reference for this at https://express-validator.github.io/docs/)
    ```
    router.post("/", [
        body('email', "Please enter a valid email").isEmail(), // second value in body is the error message
        body('name', "Name length should be > 3").isLength({ min: 3 }),
        body('password', "Password length should be > 5").isLength({ min: 5 }),
        ],
    ```

 - Now we are going to make some changes in our `(req, res)` function so that we can use `express-validator` functions 
    ```
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
    ```
 - What **User.create** is doing in the above code is it's storing the user's data in **mongoDb**
 - Surely this will keep user from going ahead in case of bad input but if we leave it this way our app will crash in case of wrong or bad input
 - To keep the app from crashing we are going to use **catch** function in javascript. Let's look at the code
    ```
    // catch function is handling the error due to invalid input and keeping the app from crashing
        .catch(err => {
            console.log(err),
                res.json({
                    error: "unexpected error oh no",
                    message: err.message
                })
        })
    ```
 - Well this is it. Now we are all set up to store user's data in our database 

## Part 4
#### Today we are going to encrypt our password before saving it in database using **bcrypt**. Then we are going to create a authentication token using **jwt**
- First let's do the encryption process
    - First of all install `bcrypt` using npm
        ```
        npm i bcrypt
        ```
    - Import bcrypt in `auth.js`
        ```
        const bcrypt = require("bcrypt");
        ```
    - Now let's generate **salt** to further strengthen the pass
        ```
        const salt = await bcrypt.genSalt(10)
        ```
    - Moving on to encrypt the password
        ```
        const encryptedPass = await bcrypt.hash(req.body.password, salt)
        ```
    - That's it, don't forget to store the user with the encrypted password in the databse
        ```
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPass,
        })
        ```
- Now let's generate the **authentication token** using **gwt**
    - First install **gwt** with npm
        ```
        npm i jsonwebtoken
        ```
    - import in `auth.js`
        ```
        const jwt = require("jsonwebtoken")
        ```
    
    - Make sure you have a **secret** to sign the data. For now let's assume the secret to be following
        ```
        const verySecret = "korewahimitsu";
        ```
    - Now we need to decide what parameter we are going to provide token to user
    based on. I will go for `userId` so...
        ```
        jwtData = {id:user.id}
        ```
    - Now just use jwt.sign to assign the token
        ```
        const authToken = jwt.sign(jwtData, verySecret)
        ```
    - That's it