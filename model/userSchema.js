const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [5, "Name should be greater than 4 characters!"],
      unique: [true, "Name should be unique!"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: [true, "Email should be unique!"],  // Corrected message
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password should be greater than 7 characters!"],
      select: false, // Excludes the password from query results by default.
    },
    confirmPassword: {
      type: String,
      minLength: [8, "Password should be greater than 7 characters!"]
    },
  },
  {
    timestamps: true,
  }
);

// defining custom method for JWT :---
/* 
  This method generates a JWT token for the user,
  containing the user's id and email, and signs it.
  The token is valid for 24 hours.
*/
userSchema.methods = {
  jwtToken(){
    return JWT.sign(
      { id: this._id , email: this.email },
      process.env.SECRET,
      { expiresIn: "24h" }
    )
  }
}

const User = mongoose.model("homework_user", userSchema);

module.exports = User;