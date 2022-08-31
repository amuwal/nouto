const jwt = require("jsonwebtoken")
const verySecret = "korewahimitsu"


const fetchuser = (req, res, next) => {
    const token = req.header("auth-token")
    if (!token) {
        res.status(401).send("Unauthorised Token")
    }
    try {
        const data = jwt.verify(token, verySecret)
        console.log(data)
        req.user = data;
        next();
    } catch (error) {
        res.status(401).send("Unauthorised Token")
    }
}

module.exports = fetchuser