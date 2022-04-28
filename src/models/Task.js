const mongoose = require('mongoose');
const validator = require('validator');


const Task = mongoose.model("Task", {
    name:{
        type: String,
        required: true,
        minlength: [4, "Your task name is too short, at least having 4 characters."],
        trim: true,

    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    isCompleted:{
        type:  Boolean,
        default: false,
        trim: true,
    },
});

module.exports = Task;