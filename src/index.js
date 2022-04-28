const express = require("express");
const Task = require("./models/Task");
require('dotenv').config();
const User = require("./models/User");
require("./db/mongoose");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post("/users", (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.send(user1);
    }).catch(error => {
        res.status(400).send(error.message);
    })
});

app.get("/users", (req, res) => {
    User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err.message));
});

app.get("/user/:id", (req, res) => {
    const {id}= req.params;
    User.findById(id)
    .then((user) => {
        if(!user) return res.status(404).send();
        res.send(user);
    })
    .catch(err => res.status(500).send(err.message));
});

app.post("/tasks", (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.send(task);
    }).catch(error => {
        res.status(400).send(error.message);
    })
});

app.listen(port, () => {
    console.log(`Server is up ${port}`)
});

