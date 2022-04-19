const express = require("express");
const router = express.Router();
const userTypes = require("../util/user-types");

router.get('/', async (req, res) => {
    if (req.session.userType == userTypes.manager) {
        res.render("manager/manager-menu");
    } else {
        res.redirect("/login");
    }
});

const login = require("./login");
router.get("/login*", login);
router.post("/login*", login);

const manager = require("./manager");
router.get("/manager*", manager);
router.post("/manager*", manager);

module.exports = router;
