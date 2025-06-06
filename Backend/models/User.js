const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto=require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"],
    },
    avatar: {
        public_id: String,
        url: String,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

    resetPasswordToken :String,
    resetPasswordExpire:Date,
});

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10); // ✅ Corrected
    }
    next();
});

// 🔑 Compare password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password); // ✅ Corrected
};

// 🔐 Generate JWT
userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET); // ✅ Ensure JWT_SECRET is set in .env
};

userSchema.method.getResetPasswordToken= function(){
const resetToken= crypto.randomBytes(20).toString("hex");


this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest("hex");

this.resetPasswordExpire= Date.now()  + 10 * 60  * 1000;


return resetToken;




}


module.exports = mongoose.model("User", userSchema);

