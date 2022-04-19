const express = require("express");
const router = express.Router();
const db = require("../db/db-utils");
const userTypes = require("../util/user-types");

router.use((req, res, next) => {
    if (req.session.userType != userTypes.manager) {
        res.redirect("login");
    } else {
        next();
    }
});

router.get('/manager', async (req, res) => {
    res.send("manager");
});

module.exports = router;
