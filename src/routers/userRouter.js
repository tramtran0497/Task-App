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

router.post("/users/login", async(req, res) => {
    const {password, email} = req.body;
   try{
        // from findByCredentials() return user 
        const user = await User.findByCredentials(email, password);
        res.send(user);
   }catch(err) {
       res.status(400).send(err.message);
   }
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
        // find user in DB
        const user = await User.findById(id);
        // update changes
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        if(!user) return res.status(404).send();
        res.send(user);
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