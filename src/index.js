const express = require("express");
const Task = require("./models/Task");
require('dotenv').config();
const User = require("./models/User");
require("./db/mongoose");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post("/users", async(req, res) => {
    try{
        const user = await new User(req.body);
        await user.save();
        res.send(user);
    }catch(error){
        res.status(400).send(error.message);
    };
});

app.get("/users", async(req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(500).send(err.message);
    };
});

app.get("/user/:id", async(req, res) => {
    try{
        const {id}= req.params;
        const user = await User.findById(id);
        if(!user) return res.status(404).send();
        res.send(user);
    }catch(err) {
        res.status(500).send(err.message);
    };
});

app.post("/tasks", async(req, res) => {
    try{
        const task = await new Task(req.body);
        await task.save();
        res.send(task);
    }catch(error){
        res.status(400).send(error.message);
    }
});

app.get("/tasks", async(req, res) => {
    try{
        const tasks = await Task.find({});
        res.send(tasks);
    }catch(err){
        res.status(500).send(err.message);
    };
});

app.get("/task/:id", async(req, res) => {
    try{
        const {id}= req.params;
        const task = await Task.findById(id);
        if(!task) return res.status(404).send();
        res.send(task);
    }catch(err){
        res.status(500).send(err.message)
    };
});

app.listen(port, () => {
    console.log(`Server is up ${port}`)
});

