const query = require("./_query");

exports.selectEveryDatabaseManager = function () {
    return query("SELECT * FROM Database_Manager;");
};
