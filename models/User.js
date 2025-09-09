/**
 * User Model
 * ----------------
 * Stores user credentials for signup/login.
 * All fields are required and schema is timestamped.
 * Passwords are hashed using bcrypt
 */
const mongoose = require("mongoose");

const User = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
            unique: [true, "username is taken. Please try with a diferent username."],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: [true, "email already exists."],
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
    }, {
    timestamps: true,
    } 
);

module.exports = mongoose.model("User", User);