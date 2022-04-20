const express = require("express");
const router = express.Router();
const db = require("../db/db-utils");
const userTypes = require("../util/user-types");
const sha256 = require("../util/sha256");

// only managers can see these pages
router.use((req, res, next) => {
    if (req.session.userType != userTypes.manager) {
        res.redirect("/login");
    } else {
        next();
    }
});

router.get('/manager', (req, res) => {
    res.render("manager/manager-menu");
});

router.get('/manager/add-student', (req, res) => {
    res.render("manager/add-student");
});

router.post('/manager/add-student', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let surname = req.body.surname;
    let email = req.body.email;
    let department = req.body.department;
    let hashedPassword = sha256(password);
    let result = await db.addStudent(username, hashedPassword, name, surname, email, department);
    res.send(result);
});

router.get('/manager/add-instructor', (req, res) => {
    res.render("manager/add-instructor");
});

router.post('/manager/add-instructor', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let surname = req.body.surname;
    let email = req.body.email;
    let department = req.body.department;
    let title = req.body.title;
    let hashedPassword = sha256(password);
    let result = await db.addInstructor(username, hashedPassword, name, surname, email, department, title);
    res.send(result);
});

module.exports = router;
