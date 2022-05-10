const express = require("express");
const Task = require("./models/Task");
require('dotenv').config();
const User = require("./models/User");
require("./db/mongoose");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

const app = express();
const port = process.env.PORT;

// checking upload
const multer = require("multer")
const upload = multer({
    dest: "images"
})

app.post("/upload", upload.single("upload"), (req, res) => {
    res.send()
})

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server is up ${port}`)
});

