const express = require("express");
const router = express.Router();
const db = require("../db/db-utils");
const userTypes = require("../util/user-types");
const sha256 = require("../util/sha256");

// only managers can see these pages
router.use((req, res, next) => {
    if (req.session.userType != userTypes.manager) {
        res.redirect("/");
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
    let student_id = req.body.student_id;
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let surname = req.body.surname;
    let email = req.body.email;
    let department = req.body.department;
    let hashedPassword = sha256(password);
    await db.addStudent(username, hashedPassword, name, surname, email, department, student_id);
    res.redirect("/manager/view-students");
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
    await db.addInstructor(username, hashedPassword, name, surname, email, department, title);
    res.redirect("/manager/view-instructors");
});

router.get('/manager/delete-student', (req, res) => {
    res.render("manager/delete-student");
});

router.post('/manager/delete-student', async (req, res) => {
    let id = req.body.id;
    await db.deleteStudent(id);
    res.redirect("/manager/view-students");
});
router.get('/manager/update-instructor', (req, res) => {
    res.render("manager/update-instructor");
});

router.post('/manager/update-instructor', async (req, res) => {
    let username = req.body.username;
    let title = req.body.title;
    await db.updateInstructorTitle(username, title);
    res.redirect("/manager/view-instructor");
});

router.get('/manager/view-students', async (req, res) => {
    let students = await db.getAllStudentsOrderedByCredits();
    res.render("manager/view-students", {students: students});
});

router.get('/manager/view-instructors', async (req, res) => {
    let instructors = await db.getAllInstructors();
    res.render("manager/view-instructors", {instructors: instructors});
});

router.get('/manager/view-student-grades', async (req, res) => {
    res.render("manager/view-student-grades-form");
});

router.post('/manager/view-student-grades', async (req, res) => {
    let id = req.body.id;
    let grades = await db.getStudentGrades(id);
    res.render("manager/view-student-grades-table", {grades: grades});
});

router.get('/manager/view-instructor-courses', async (req, res) => {
    res.render("manager/view-instructor-courses-form");
});

router.post('/manager/view-instructor-courses', async (req, res) => {
    let username = req.body.instructor_username;
    let courses = await db.getInstructorCourses(username);
    res.render("manager/view-instructor-courses-table", {courses: courses});
});

router.get('/manager/view-course-grade', async (req, res) => {
    res.render("manager/view-course-grade-form");
});

router.post('/manager/view-course-grade', async (req, res) => {
    let course_id = req.body.id;
    let averageGrade = await db.getCourseAverageGrade(course_id);
    res.render("manager/view-course-grade-table", {averageGrade: averageGrade});
});

module.exports = router;
