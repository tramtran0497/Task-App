const express = require("express");
const Task = require("../models/Task");
const router = new express.Router();

router.post("/tasks", async(req, res) => {
    try{
        const task = await new Task(req.body);
        await task.save();
        res.send(task);
    }catch(error){
        res.status(400).send(error.message);
    }
});

router.get("/tasks", async(req, res) => {
    try{
        const tasks = await Task.find({});
        res.send(tasks);
    }catch(err){
        res.status(500).send(err.message);
    };
});

router.get("/task/:id", async(req, res) => {
    const {id}= req.params;

    try{
        const task = await Task.findById(id);
        if(!task) return res.status(404).send();
        res.send(task);
    }catch(err){
        res.status(500).send(err.message);
    };
});

router.patch("/task/:id", async(req, res) => {
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

router.delete("/task/:id", async(req, res) =>{
    const {id}= req.params;

    try{
        await Task.findByIdAndDelete(id);
        res.send("Successful delete!");
    }catch(error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;