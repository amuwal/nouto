const Express = require("express")
const router = Express.Router()

router.get("/", (req, res) => {
    obj = {
        name: "light"
    }
    res.send(obj) // whatever is inside res.send will be shown when we go the endpoint connected
    console.log(req.body)
})

module.exports = router