const express = require("express");
const router = express.Router();
const db = require("../db/db-utils");
const userTypes = require("../util/user-types");

// only instructors can see these pages
router.use((req, res, next) => {
    if (req.session.userType != userTypes.instructor) {
        res.redirect("/login");
    } else {
        next();
    }
});

router.get('/instructor', (req, res) => {
    res.render("instructor/instructor-menu");
});

router.get('/instructor/add-course', (req, res) => {
    res.render("instructor/add-course");
});

router.post('/instructor/add-course', async (req, res) => {
    let course_id = req.body.id;
    let name = req.body.name;
    let credits = req.body.credits;
    let quota = req.body.quota;
    let slot = req.body.slot;
    let classroom_id = req.body.classroom_id;
    let instructor_username = req.session.username;

    await db.addCourse(course_id, name, credits, quota, slot, classroom_id, instructor_username);
    res.redirect("/instructor/view-courses");

});

router.get('/instructor/view-courses', async (req, res) => {
    let username = req.session.username;
    let courses = await db.getInstructorCoursesOrderedByCourseID(username);
    for (let course of courses){
        let preq = await db.getPreqs(course.course_id);
        course.preq = preq;
    }
    res.render("instructor/view-courses", {courses: courses});
});

router.get('/instructor/update-course-name', async (req, res) => {
    res.render("instructor/update-course-name");
});

router.post('/instructor/update-course-name', async (req, res) => {
    let course_id = req.body.course_id;
    let name = req.body.name;
    let instructor_username = req.session.username;
    let error_check = await db.updateCourseNameCheck(course_id, instructor_username);
    if (error_check == 1) {
        return res.send("Course not found!");
    } else if (error_check == 2) {
        return res.send("This course is given by another instructor!");
    }
    // erronous cases are checked
    await db.updateCourseName(course_id, name);
    res.redirect("/instructor/view-courses");
});





module.exports = router;