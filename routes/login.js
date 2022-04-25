const express = require("express");
const router = express.Router();
const db = require("../db/db-utils");
const sha256 = require("../util/sha256");
const userTypes = require("../util/user-types");

// logged in users cannot see login pages
router.use((req, res, next) => {
    if (req.session.userType != undefined) {
        res.redirect("/");
    } else {
        next();
    }
});

router.get('/login', (req, res) => {
    res.render("login/login-selection");
});

router.get('/login/manager', (req, res) => {
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
        res.redirect("/manager");
    } else {
        res.send("wrong password");
    }
});

router.get('/login/instructor', (req, res) => {
    res.render("login/login-instructor");
});

router.post('/login/instructor', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let exists = await db.dbInstructorExists(username);
    if (!exists) {
        return res.send("wrong username");
    }
    let hashedPass = sha256(password);
    let correctPass = await db.dbInstructorPassCorrect(username, hashedPass);
    if (correctPass) {
        // instructor logged in
        req.session.userType = userTypes.instructor;
        req.session.username = username;
        res.redirect("/instructor");
    } else {
        res.send("wrong password");
    }
});


router.get('/login/student', (req, res) => {
    res.render("login/login-student");
});

router.post('/login/student', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let exists = await db.dbStudentExists(username);
    if (!exists) {
        return res.send("wrong username");
    }
    let hashedPass = sha256(password);
    let correctPass = await db.dbStudentPassCorrect(username, hashedPass);
    if (correctPass) {
        // student logged in
        req.session.userType = userTypes.student;
        req.session.username = username;
        res.redirect("/student");
    } else {
        res.send("wrong password");
    }
});



module.exports = router;
