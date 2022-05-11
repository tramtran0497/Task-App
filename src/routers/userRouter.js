const express = require("express");
const User = require("../models/User");
const router = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error("Please upload file with extension jpeg, png, jpg"));
        }
        cb(undefined, true);
    }
});

router.post("/users", async(req, res) => {
    try{
        const user = await new User(req.body);
         // create token
         const token = await user.createAuthToken();
        res.send({user, token});
    }catch(error){
        res.status(400).send({error: error.message});
    };
});

router.post("/user/username/avatar", auth, upload.single("avatar"), async(req, res) => {
    // it shows binary form, so hiding avatar when showing data after getting users
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send(req.user);
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
});

router.post("/users/login", async(req, res) => {
    const {password, email} = req.body;
   try{
        // from findByCredentials() return user 
        const user = await User.findByCredentials(email, password);
        // create token
        const token = await user.createAuthToken();
        res.send({user, token});
   }catch(error) {
       res.status(400).send({error: error.message});
   }
});

router.post("/logout", auth, async(req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send("Log out");
    } catch(error) {
        res.status(400).send({error: error.message});
    }
});

router.get("/users", async(req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }catch(error){
        res.status(500).send({error: error.message});
    };
});

router.get("/user/username", auth, async(req, res) => {
    try{
        const user = await User.findById(req.user._id);
        // await user.populate("tasks");
        res.send(user);
    }catch(error) {
        res.status(500).send({error: error.message});
    };
});

router.patch("/user/username", auth, async(req, res) => {
    const allowUpdate = ["name", "email", "password", "phone"];
    const updates = Object.keys(req.body);
    
    const isValidOperation = updates.every(update => allowUpdate.includes(update));
    if(!isValidOperation) return res.status(400).send("Invalid Updates!");
    try{
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user)
    }catch(error) {
        res.status(500).send({error: error.message});
    };
});

router.delete("/user/username", auth, async(req, res) =>{
    try{
        await req.user.remove();
        res.send("Successful delete!");
    }catch(error) {
        res.status(500).send({error: error.message});
    }
});

router.get("/user/:id", auth, async(req, res) => {
    const {id}= req.params;

    try{
        const user = await User.findById(id);
        if(!user) return res.status(404).send();
        res.send(user);
    }catch(error) {
        res.status(500).send({error: error.message});
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
        res.status(500).send({error: error.message});
    };
});

router.delete("/user/username", auth, async(req, res) =>{
    try{
        await User.findByIdAndDelete(req.user._id);
        res.send("Successful delete!");
    }catch(error) {
        res.status(500).send({error: error.message});
    }
});

router.delete("/user/username/avatar", auth, async(req, res) => {
    try{
        req.user.avatar = undefined;
        await req.user.save();
        res.send("Successful Delete Avatar")
    } catch(error) {
        res.status(500).send({error: error.message});
    }
});

module.exports = router;