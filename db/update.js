const query = require("./_query");

exports.updateInstructorTitle = function (username, title) {
    return query("UPDATE INSTRUCTOR SET title = ? WHERE username = ?", [title, username]);
};

exports.updateCourseName = function (course_id, name) {
    return query("UPDATE COURSE SET name = ? WHERE course_id = ?", [name,course_id]);
};

exports.giveGrade = function (grade, course_id, student_id) {
    return query("UPDATE Grades SET grade=? WHERE course_id=? AND student_id=?;", [grade, course_id, student_id]);
};
