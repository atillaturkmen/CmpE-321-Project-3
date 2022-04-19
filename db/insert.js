const query = require("./_query");

exports.insertDatabaseManager = function (username, password) {
    return query("INSERT INTO Database_Manager VALUES (?, ?);", [username, password]);
};
