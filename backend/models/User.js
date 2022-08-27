const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// We are making a variable and then exporting the model because it helps in error handling in the next steps
const User = mongoose.model("user", userSchema)
User.createIndexes() // For handling error (I don't know the science behind it as well)
module.exports = User // Ofcourse you export the model
    // You can directily export the model in the newer versions of react but you had to export it like above in the older versions