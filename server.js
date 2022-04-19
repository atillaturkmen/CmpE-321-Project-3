const express = require('express');

const app = express();
const port = 80;

app.set("view engine", "ejs");

//necessary for taking form data
app.use(express.urlencoded({
    extended: false
}));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

const routes = require("./routes/index");
app.get("*", routes);
app.post("*", routes);
