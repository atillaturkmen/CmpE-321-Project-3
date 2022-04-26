const query = require("./_query");

exports.dbManagerExists = async function (username) {
    let arr = await query("SELECT 1 FROM Database_Manager WHERE username = ?;", [username]);
    return arr.length != 0;
};

exports.dbManagerPassCorrect = async function (username, password) {
    let arr = await query("SELECT 1 FROM Database_Manager WHERE username = ? AND password = ?;", [username, password]);
    return arr.length != 0;
};

exports.dbInstructorExists = async function (username) {
    let arr = await query("SELECT 1 FROM Instructor WHERE username = ?;", [username]);
    return arr.length != 0;
};

exports.dbInstructorPassCorrect = async function (username, password) {
    let arr = await query(`SELECT 1 FROM Instructor I
    JOIN User U ON I.username=U.username
    WHERE U.username = ? AND password =?;`, [username, password]);
    return arr.length != 0;
};

exports.dbStudentExists = async function (username) {
    let arr = await query("SELECT 1 FROM Student WHERE username = ?;", [username]);
    return arr.length != 0;
};

exports.dbStudentPassCorrect = async function (username, password) {
    let arr = await query(`SELECT 1 FROM Student S
    JOIN User U ON S.username=U.username
    WHERE U.username = ? AND password = ?;`, [username, password]);
    return arr.length != 0;
};

exports.studentTakenCourse = async function (studentUsername, courseID) {
    let arr = await query(`SELECT 1 FROM Grades G 
    JOIN Student S ON S.student_id=G.student_id 
    WHERE S.username=?
    AND G.course_id=?
    AND G.grade IS NOT NULL;`, [studentUsername, courseID]);
    return arr.length != 0;
}

/**
 * For checking course of instructor
 * @param {*} course_id 
 * @param {*} instructor_username 
 * @returns 
 * 1 if course does not exist, 
 * 2 if course is not given by this instructor, 
 * 0 if course exists and given by this instructor
 */
exports.courseInstructorCheck = async function (course_id, instructor_username) {
    let test1 = await query(`SELECT 1 FROM Course C 
    WHERE C.course_id=?;`, [course_id]);
    if (test1 == 0){
        return 1;
    }

    let test2 = await query(`SELECT 1 FROM Course C 
    JOIN Instructor I ON I.username=C.instructor_username
    WHERE I.username=?
    AND C.course_id=?`, [instructor_username, course_id]);
    if(test2 == 0){
        return 2;
    }

    // all prerequisites are satisfied
    return 0;
}