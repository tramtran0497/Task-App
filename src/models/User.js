const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const jwt = require("jsonwebtoken");

const userScheme = new mongoose.Schema({
    // TO DO: refactoring _id 
        id: {
            type: String,
            unique: true,
        },
        name:{
            type: String,
            required: true,
            minlength: [4, "Your name is too short, at least having 4 characters."],
            trim: true,
        },
        email:{
            type: String,
            unique: true,
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
        },
        tokens: [{
            type: String,
        }]
    }
);

userScheme.methods.createAuthToken = async function(){
    const user = this;

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {expiresIn: "3 days"});
    // adding a token in tokens array
    user.tokens.push(token);
    await user.save();

    return token;
};

userScheme.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email});

    if(!user) throw new Error("Unable to login! Try again.");

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("User Invalid!")

    return user;
};

userScheme.pre("save", async function(next) {
    //user shows created user
    const user = this;
    const saltRounds = 10;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, saltRounds);
    };
    next();
});

const User = mongoose.model("User", userScheme);



module.exports = User;