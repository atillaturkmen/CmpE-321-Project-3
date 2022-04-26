const query = require("./_query");

exports.addStudent = function (username, password, name, surname, email, department) {
    return query(`
    INSERT INTO User VALUES (?, ?, ?, ?, ?, ?);
    INSERT INTO Student (username) VALUES (?);
    `, [username, password, name, surname, email, department, username]);
};

exports.addInstructor = function (username, password, name, surname, email, department, title) {
    return query(`
    INSERT INTO User VALUES (?, ?, ?, ?, ?, ?);
    INSERT INTO Instructor (username, title) VALUES (?, ?);
    `, [username, password, name, surname, email, department, username, title]);
};

exports.takeCourse = function (username, courseID) {
    return query(`INSERT INTO Grades VALUES 
    ((SELECT student_id FROM Student WHERE username=?), ?, NULL);`, [username, courseID]);
};

exports.addCourse = function (course_id, name, credits, quota, slot, classroom_id, instructor_username) {
    return query(`INSERT INTO Course VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [course_id, name, credits, quota, slot, classroom_id, instructor_username]);
};

exports.addPrq = function (prq_for, prq) {
    return query(`INSERT INTO Prerequisites VALUES (?, ?);`,
    [prq_for, prq]);
};
