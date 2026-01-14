const express = require("express");
const app = express();
port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routers"));

app.listen(port, (req, res) => {
    console.log(`Example app listening at http://localhost:${port}`);
});
