const mongoose = require('mongoose');
const User = require("../models/User");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

