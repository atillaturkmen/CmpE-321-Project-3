const query = require("./_query");

// binary for case sensitive search

exports.dbManagerExists = async function (username) {
    let arr = await query("SELECT * FROM Database_Manager WHERE username = BINARY ?;", [username]);
    return arr.length != 0;
};

exports.dbManagerPassCorrect = async function (username, password) {
    let arr = await query("SELECT * FROM Database_Manager WHERE username = BINARY ? AND password = BINARY ?;", [username, password]);
    return arr.length != 0;
};

exports.getAllStudentsOrderedByCredits = function () {
    return query(`SELECT * FROM Student S JOIN User U ON U.username=S.username ORDER BY completed_credits ASC;`);
}
