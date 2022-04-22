const express = require("express");
const router = express.Router();
const db = require("../db/db-utils");
const userTypes = require("../util/user-types");

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

router.post('/student/add-course', async (req, res) => {
    let id = req.body.id;
    let username = req.session.username;
    let taken = await db.studentTakenCourse(username, id);
    if (taken) {
        return res.send("Student has taken this course!");
    }
    let prerequisites = await db.getPreqs(id);
    let preqsNotTaken = [];
    for (let preq of prerequisites) {
        let preqTaken = await db.studentTakenCourse(username, preq);
        if (!preqTaken) {
            preqsNotTaken.push(preq);
        }
    }
    if (preqsNotTaken.length != 0) {
        return res.send("You need to take these courses first: " + preqsNotTaken);
    }
    res.send("you can take this course");
});

module.exports = router;
