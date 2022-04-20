const query = require("./_query");

exports.updateInstructorTitle = function (username, title) {
    return query("UPDATE INSTRUCTOR SET title = ? WHERE username = ?", [title, username]);
};

