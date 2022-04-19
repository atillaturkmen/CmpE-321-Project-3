const express = require("express");
const router = express.Router();

router.get('/login', async (req, res) => {
    res.render("login-selection");
});

router.get('/login/manager', async (req, res) => {
    res.render("login-manager");
});

router.post('/login/manager', async (req, res) => {
    console.log(req.body);
    res.send("ok");
});

module.exports = router;
