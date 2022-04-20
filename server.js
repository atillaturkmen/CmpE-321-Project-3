const express = require('express');
const path = require("path");
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

// for serving the static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

const routes = require("./routes/index");
app.get("*", routes);
app.post("*", routes);

// If there is an error this function is fired
app.use((err, req, res, next) => {
    res.status(500);
    if (err.sqlMessage) {
        res.send(err.sqlMessage);
    } else {
        res.send(err);
    }
});
