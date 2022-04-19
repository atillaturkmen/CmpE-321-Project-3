const express = require("express");
const router = express.Router();
const db = require("../db/db-utils");

router.get('/login', async (req, res) => {
    res.render("login-selection");
});

router.get('/login/manager', async (req, res) => {
    res.render("login-manager");
});

router.post('/login/manager', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let auth = await db.authDbManager(username, password);
    if (auth.length == 0) {
        res.send("auth error");
    } else {
        res.send("ok");
    }
});

module.exports = router;
