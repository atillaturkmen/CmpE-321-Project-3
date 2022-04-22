const query = require("./_query");

exports.dbManagerExists = async function (username) {
    let arr = await query("SELECT 1 FROM Database_Manager WHERE username = ?;", [username]);
    return arr.length != 0;
};

exports.dbManagerPassCorrect = async function (username, password) {
    let arr = await query("SELECT 1 FROM Database_Manager WHERE username = ? AND password = ?;", [username, password]);
    return arr.length != 0;
};

exports.studentExists = async function (username) {
    let arr = await query("SELECT 1 FROM Student WHERE username = ?;", [username]);
    return arr.length != 0;
};

exports.studentPassCorrect = async function (username, password) {
    let arr = await query(`SELECT 1 FROM Student S
    JOIN User U ON S.username=U.username
    WHERE U.username = ? AND password = ?;`, [username, password]);
    return arr.length != 0;
};

exports.getAllStudentsOrderedByCredits = function () {
    return query(`SELECT S.username, completed_credits, gpa, name, surname, email, department_id 
    FROM Student S JOIN User U ON U.username=S.username ORDER BY completed_credits ASC;`);
}

exports.getStudentGrades = function (id) {
    return query(`SELECT C.course_id, C.name, grade FROM Grades G 
    INNER JOIN Course C ON C.course_id=G.course_id 
    WHERE student_id=?;`, [id]);
}

exports.getCourseAverageGrade = function (id) {
    return query(`SELECT C.name, C.course_id, AVG(grade) AS average 
    FROM Grades G JOIN Course C ON C.course_id=G.course_id 
    WHERE G.course_id=?;`, [id]);
}
