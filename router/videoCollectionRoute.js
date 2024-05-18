const express = require("express");
const router = express.Router();
const session = require("express-session");
const Post = require("../model/Post");
const User = require("../model/User");

router.get("/", (req, res) => {
    res.redirect("/videocollection");
})

router.post("/", async (req, res) => {
    try {
        const username = req.body.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            throw { error: "User not found", statusCode: 404 };
        } else {
            const posts = await Post.find({ postedBy: user._id });
            if (!posts) {
                throw { error: "Post not found", statusCode: 404 };
            } else {
                return res.status(200).send({ message: "Fetched posts", status: true });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }

});



module.exports = router;