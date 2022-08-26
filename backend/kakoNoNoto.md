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
        import mongoose from 'mongoose';
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