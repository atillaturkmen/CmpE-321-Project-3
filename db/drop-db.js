const mysql = require('mysql2');
require('dotenv').config(); // read environment variables from .env

// default port is 3306
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    multipleStatements: true,
});

db.connect(function (err) {
    if (err) throw err;
    db.query("DROP DATABASE 2019400216_2018400147;", (err, result) => {
        db.destroy();
    });
});
