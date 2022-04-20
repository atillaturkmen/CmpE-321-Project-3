const mysql = require('mysql2');
require('dotenv').config(); // read environment variables from .env

// default port is 3306
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
    port: process.env.MYSQL_PORT,
    multipleStatements: true,
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

const query = function (sql, params = []) {
    return new Promise(function (resolve, reject) {
        db.query(
            sql,
            params,
            function (err, results) {
                if (err)
                    reject(err);
                else
                    resolve(results);
            }
        );
    });
};

module.exports = query;
