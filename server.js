const express = require('express');
const session = require('express-session');
require('express-async-errors'); // for handling all promise rejects

const app = express();
const port = 80;

app.set("view engine", "ejs");

// for taking form data
app.use(express.urlencoded({
    extended: false
}));

// for storing login sessions
app.use(session({
    secret: "random",
    resave: false,
    saveUninitialized: false,
}
));

// for serving the public folder
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

const routes = require("./routes/index");
app.get("*", routes);
app.post("*", routes);

// If there is an error this function is fired
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    if (err.sqlMessage) {
        return res.send(err.sqlMessage);
    }
    next(err);
});
