const express = require("express");
const db = require("../db/db-utils");

const router = express.Router();

router.get('/', async (req, res) => {
    res.render("login-selection");
});

module.exports = router;
