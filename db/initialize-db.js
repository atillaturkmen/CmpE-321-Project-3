const mysql = require('mysql2');
require('dotenv').config(); // read environment variables from .env

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL database.");
});

module.exports = db;
