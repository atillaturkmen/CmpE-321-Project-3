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
    return query(`
    INSERT INTO Grades VALUES 
    ((SELECT student_id FROM Student WHERE username=?), ?, NULL);
    `, [username, courseID]);
};
