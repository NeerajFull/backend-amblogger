const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/instagram-clone-images/image/upload/v1612110200/sumkxhi1z6qiuvvmrdzw.png"
    },
    backgroundPic: {
        type: String,
        default: "https://res.cloudinary.com/instagram-clone-images/image/upload/v1612248561/wvo7jqpgg6s7qffraowh.png"
    },
    imgFileName: {
        type: String
    },
    backImgFileName: {
        type: String
    },
    bio: {
        type: String,
        default: "No Bio Available",
        trim: true
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

});


const User = mongoose.model("User", userSchema);

module.exports = User;