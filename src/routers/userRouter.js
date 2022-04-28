const express = require("express");
const User = require("../models/User");
const router = new express.Router();

router.post("/users", async(req, res) => {
    try{
        const user = await new User(req.body);
        await user.save();
        res.send(user);
    }catch(error){
        res.status(400).send(error.message);
    };
});

router.get("/users", async(req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(500).send(err.message);
    };
});

router.get("/user/:id", async(req, res) => {
    const {id}= req.params;

    try{
        const {id}= req.params;
        const user = await User.findById(id);
        if(!user) return res.status(404).send();
        res.send(user);
    }catch(err) {
        res.status(500).send(err.message);
    };
});

router.patch("/user/:id", async(req, res) => {
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

router.delete("/user/:id", async(req, res) =>{
    const {id}= req.params;

    try{
        await User.findByIdAndDelete(id);
        res.send("Successful delete!");
    }catch(error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;