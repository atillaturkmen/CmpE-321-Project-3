const express = require('express');

const app = express();
const port = 80;

app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

const routes = require("./routes/index");
app.get("*", routes);
app.post("*", routes);
