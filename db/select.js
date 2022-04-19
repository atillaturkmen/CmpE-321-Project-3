const query = require("./_query");

// binary for case sensitive search
exports.authDbManager = function (username, password) {
    return query("SELECT * FROM Database_Manager WHERE username = BINARY ? AND password = BINARY ?;", [username, password]);
};
