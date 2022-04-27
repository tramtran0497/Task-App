const mongoose = require('mongoose');
const validator = require('validator');


const User = mongoose.model("User", {
    name:{
        type: String,
        required: true,
        minlength: [4, "Your name is too short, at least having 4 characters."],
        trim: true,

    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true, 
        validate(value) {
            if(!validator.isEmail(value)) throw new Error("Email is not valid, please try again.")
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: [7, "Your password is too short, at least having 7 characters."],
        validate(value) {
            if(value.toLowerCase().includes("password")) throw new Error("Password can not contain 'password', please change your password.")
        }
    },
    phone:{
        type: Number,
        trim: true,
        required: true,
    }
});

module.exports = User;