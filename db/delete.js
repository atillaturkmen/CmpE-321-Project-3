const query = require("./_query");

exports.deleteStudent = function (id) {
    return query(`DELETE FROM User WHERE username=(SELECT username FROM Student WHERE student_id=?);`, [id]);
}
