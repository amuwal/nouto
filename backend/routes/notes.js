const Express = require("express");
const router = Express.Router();

router.get("/", (req, res) => {
    res.json([])
})

module.exports = router