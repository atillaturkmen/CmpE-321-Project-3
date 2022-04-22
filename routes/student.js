const express = require("express");
const router = express.Router();
const db = require("../db/db-utils");
const userTypes = require("../util/user-types");
const sha256 = require("../util/sha256");

// only students can see these pages
router.use((req, res, next) => {
    if (req.session.userType != userTypes.student) {
        res.redirect("/login");
    } else {
        next();
    }
});

router.get('/student', (req, res) => {
    res.render("student/student-menu");
});

router.get('/student/add-course', (req, res) => {
    res.render("student/add-course");
});

router.post('/student/add-course', (req, res) => {
    let id = req.body.id;
    res.send(id);
});

module.exports = router;
