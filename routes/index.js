const express = require("express");
const router = express.Router();
const userTypes = require("../util/user-types");

router.get('/', (req, res) => {
    if (req.session.userType == userTypes.manager) {
        res.redirect("/manager");
    } else if (req.session.userType == userTypes.instructor) {
        res.redirect("/instructor");
    } else if (req.session.userType == userTypes.student){
        res.redirect("/student");
    } else {
        res.redirect("/login");
    }
});

router.get('/logout', (req, res) => {
    delete req.session.userType;
    delete req.session.username;
    res.redirect("/login");
});

const login = require("./login");
router.get("/login*", login);
router.post("/login*", login);

const manager = require("./manager");
router.get("/manager*", manager);
router.post("/manager*", manager);

const instructor = require("./instructor");
router.get("/instructor*", instructor);
router.post("/instructor*", instructor);

const student = require("./student");
router.get("/student*", student);
router.post("/student*", student);

module.exports = router;
