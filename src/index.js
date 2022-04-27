const express = require("express");
require('dotenv').config();
const User = require("./models/User");
require("./db/mongoose");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post("/task", (req, res) => {
    const user1 = new User(req.body);
    res.send(user1);
});

app.listen(port, () => {
    console.log(`Server is up ${port}`)
});

