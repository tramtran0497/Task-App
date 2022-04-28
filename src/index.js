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

app.patch("/user/:id", async(req, res) => {
    const {id} = req.params;

    // if changes are not including
    const allowUpdate = ["name", "email", "password", "phone"];
    const updates = Object.keys(req.body);
    
    const isValidOperation = updates.every(update => allowUpdate.includes(update));
    if(!isValidOperation) return res.status(400).send("Invalid Updates!");
    try{
        const newUser = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        if(!newUser) return res.status(404).send();
        res.send(newUser);
    }catch(error) {
        res.status(500).send(error.message);
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
        res.status(500).send(err.message);
    };
});

app.patch("/task/:id", async(req, res) => {
    const {id} = req.params;

    // if changes are not including
    const allowUpdate = ["name", "description", "isCompleted"];
    const updates = Object.keys(req.body);
    
    const isValidOperation = updates.every(update => allowUpdate.includes(update));
    if(!isValidOperation) return res.status(400).send("Invalid Updates!");
    try{
        const newTask = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        if(!newTask) return res.status(404).send();
        res.send(newTask);
    }catch(error) {
        res.status(500).send(error.message);
    };
});

app.listen(port, () => {
    console.log(`Server is up ${port}`)
});

