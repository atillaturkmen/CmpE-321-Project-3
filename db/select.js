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

exports.getCourseAverageGrade = function (id) {
    return query(`SELECT C.name, C.course_id, AVG(grade) AS average 
    FROM Grades G JOIN Course C ON C.course_id=G.course_id 
    WHERE G.course_id=?;`, [id]);
}

exports.getInstructorCoursesOrderedByCourseID = async function (username){
    let arr = await query(`SELECT course_id, name, C.classroom_id, slot, quota
        FROM Classroom Cl
        INNER JOIN Course C ON C.classroom_id=Cl.classroom_id
        WHERE instructor_username=?
        ORDER BY course_id ASC;`, [username]);
    return arr;
}

exports.getPreqs = async function (courseID) {
    let arr = await query(`SELECT prq FROM prerequisites WHERE prq_for=?;`, [courseID]);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i]["prq"];
    }
    return arr;
}
