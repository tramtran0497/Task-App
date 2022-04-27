const mongoose = require('mongoose');
const User = require("../models/User");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});


// const user1 = new User({
//     name: "Tram",
//     email: "tram@gmail.com",
//     phone: 12345890,
//     password: "tram3",
// });

// user1.save().then(() => console.log(user1)).catch(err => console.log(err));