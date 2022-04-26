const { student } = require("../util/user-types");
const query = require("./_query");

exports.getAllInstructors = function () {
    return query(`SELECT I.username, name, surname, email, department_id, title
    FROM Instructor I JOIN User U ON U.username=I.username;`);
}

exports.getInstructorCourses = function (username) {
    return query(`SELECT course_id, name, C.classroom_id, Cl.campus, slot
    FROM Classroom Cl
    INNER JOIN Course C ON C.classroom_id=Cl.classroom_id
    WHERE instructor_username=?;`, [username]);
}

exports.getAllStudentsOrderedByCredits = function () {
    return query(`SELECT S.username, completed_credits, gpa, name, surname, email, department_id 
    FROM Student S JOIN User U ON U.username=S.username ORDER BY completed_credits ASC;`);
}

exports.getStudentGrades = function (id) {
    return query(`SELECT C.course_id, C.name, grade 
    FROM Grades G 
    INNER JOIN Course C ON C.course_id=G.course_id 
    WHERE student_id=?;`, [id]);
}

exports.getCourseAverageGrade = async function (id) {
    let arr = await query(`SELECT C.name, C.course_id, AVG(grade) AS average 
    FROM Grades G JOIN Course C ON C.course_id=G.course_id 
    WHERE G.course_id=?;`, [id]);
    return arr[0];
}

exports.getInstructorCoursesOrderedByCourseID = async function (username){
    let arr = await query(`SELECT course_id, name, C.classroom_id, slot, quota
        FROM Classroom Cl
        INNER JOIN Course C ON C.classroom_id=Cl.classroom_id
        WHERE instructor_username=?
        ORDER BY course_id ASC;`, [username]);
    return arr;
}

exports.getAllCourses = async function(){
    let arr = await query(`SELECT course_id, C.name, U.surname, D.name, credits, classroom_id, slot, quota
        FROM Course C
        INNER JOIN User U ON C.instructor_username=U.username
        INNER JOIN Department D ON U.department_id = D.department_id;`);
    return arr;
}

exports.getCourseName = async function(course_id){
    let course_name = await query(`SELECT name FROM Course C WHERE C.course_id = ?;`, [course_id]);
    for (let i = 0; i < course_name.length; i++) {
        course_name[i] = course_name[i]["name"];
    }
    return course_name;
}

exports.getEnrolledCourses = async function(student_id){
    let arr = await query(`SELECT C.course_id, name, G.grade 
        FROM Course C
        INNER JOIN Grades G ON G.course_id=C.course_id
        WHERE G.student_id = ?;`, [student_id]);
    return arr;
}

exports.getStudentID = async function(username){
    let student_id = await query(`SELECT student_id FROM Student S WHERE S.username = ?;`, [username]);
    for (let i = 0; i < student_id.length; i++) {
        student_id[i] = student_id[i]["student_id"];
    }
    return student_id;
}

exports.getPreqs = async function (courseID) {
    let arr = await query(`SELECT prq FROM prerequisites WHERE prq_for=?;`, [courseID]);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i]["prq"];
    }
    return arr;
}
