const express = require('express');
const session = require('express-session');

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

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

const routes = require("./routes/index");
app.get("*", routes);
app.post("*", routes);
