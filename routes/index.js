const express = require("express");
const db = require("../db/db-utils");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await db.insertDatabaseManager("username", "password");
    } catch (error) {
        console.log(error);
    }
    try {
        await db.selectEveryDatabaseManager();
    } catch (error) {
        console.log(error);
    }
    res.send('Hello World!');
});

module.exports = router;
