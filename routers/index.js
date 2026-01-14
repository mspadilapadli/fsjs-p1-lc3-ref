const router = require("express").Router();

router.get("/", (req, res) => {
    res.send(`Init routers`);
});

module.exports = router;
