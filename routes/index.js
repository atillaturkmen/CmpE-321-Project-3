const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    res.redirect("/login");
});

const login = require("./login");
router.get("/login*", login);
router.post("/login*", login);

module.exports = router;
