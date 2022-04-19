const express = require("express");
const router = express.Router();
const userTypes = require("../util/user-types");

router.get('/', async (req, res) => {
    if (req.session.userType == userTypes.manager) {
        res.send("manager");
    } else {
        res.redirect("/login");
    }
});

const login = require("./login");
router.get("/login*", login);
router.post("/login*", login);

module.exports = router;
