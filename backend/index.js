const connectToMongo = require("./db") // function we created in db.js
const express = require('express')

connectToMongo(); // don't forget to connect to the databse
const app = express() // define app
const port = 5000

app.use(express.json()) // connects console to our terminal?

// Our Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})