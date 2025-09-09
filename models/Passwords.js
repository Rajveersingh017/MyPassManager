/**
 * Password Model
 * ----------------
 * Stores user credentials for different websites.
 * Each password entry belongs to a specific user (via user_id).
 * All fields are required and schema is timestamped.
 * Passwords are hashed using crypto(iv and content are being stored as string).
 */
const mongoose = require("mongoose");

const PasswordSchema =  mongoose.Schema(
  {
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    username: {
      type: String,
      required: [true, "Username is required!"],
    },
    websiteURL: {
      type: String,
      required: [true, "Website URL is required!"],
    },
    websiteName: {
      type: String,
      required: [true, "Website name is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Password", PasswordSchema);