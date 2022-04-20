const query = require("./_query");

exports.addStudent = function (username, password, name, surname, email, department) {
    return query(`
    INSERT INTO User VALUES (?, ?, ?, ?, ?, ?);
    INSERT INTO Student (username) VALUES (?);
    `, [username, password, name, surname, email, department, username]);
};
