const express = require("express");
const router = express.Router();
const db = require("../db/db-utils");
const userTypes = require("../util/user-types");
const addPrerequisites = require("../util/add-prerequisites");

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

router.get('/student/list-courses', async (req, res) => {
    let courses = await db.getAllCourses();
    await addPrerequisites(courses);
    res.render("student/list-courses", {courses: courses});
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
    // check prerequisites
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
    // all prerequisites are satisfied
    // quota requirement is checked with a trigger
    await db.takeCourse(username, id);
    res.redirect("/student/view-enrolled-courses");
});

router.get('/student/view-enrolled-courses', async (req, res) => {
    let username = req.session.username;
    let student_id = await db.getStudentID(username);
    let courses = await db.getEnrolledCourses(student_id);
    res.render("student/view-enrolled-courses", {courses: courses});
});

router.get('/student/search-course', (req, res) => {
    res.render("student/search-course");
});

router.post('/student/search-course', async (req, res) => {
    let keyword = req.body.keyword;
    let courses = await db.searchCourse(keyword);
    await addPrerequisites(courses);
    res.render("student/list-courses", {courses: courses});
});

module.exports = router;
