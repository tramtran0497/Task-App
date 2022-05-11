const mongoose = require('mongoose');
const User = require("../models/User");
// Connect MongoDB Cloud
mongoose.connect(`mongodb+srv://tramtran0497:${process.env.PASSWORD}@cluster0.ogj7n.mongodb.net/TaskApp?retryWrites=true&w=majority`)
    .then(() => console.log("Database is connected!"))
    .catch(err => console.log("Database connects error!", err))

// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true, 
// });

