const express = require("express");
const router = express.Router();
const db = require("../db/db-utils");
const sha256 = require("../util/sha256");
const userTypes = require("../util/user-types");

router.get('/login', async (req, res) => {
    res.render("login/login-selection");
});

router.get('/login/manager', async (req, res) => {
    res.render("login/login-manager");
});

router.post('/login/manager', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let exists = await db.dbManagerExists(username);
    if (!exists) {
        return res.send("wrong username");
    }
    let hashedPass = sha256(password);
    let correctPass = await db.dbManagerPassCorrect(username, hashedPass);
    if (correctPass) {
        // manager logged in
        req.session.userType = userTypes.manager;
        req.session.username = username;
        res.redirect("/");
    } else {
        res.send("wrong password");
    }
});

module.exports = router;
