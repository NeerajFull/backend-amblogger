const express = require("express");
const session = require("express-session");
const router = express.Router();
const Post = require("../model/Post");
const User = require("../model/User");


router.post("/", async (req, res) => {
    try {
        const postId = req.body.postId;
        const comments = req.body.comment;


        const user = await User.findOne({ _id: req.session.user._id });
        if (!user) {
            throw { error: "User not found", statusCode: 404 };
        } else {
            const username = user.username;
            const post = await Post.findOneAndUpdate({ _id: postId }, { $push: { comment: username } }, { new: true });
            if (!post) {
                throw { error: "Post not found", statusCode: 404 };
            } else {
                const posts = await Post.findOneAndUpdate({ _id: postId }, { $push: { commentText: comments } }, { new: true });
                if (err) {
                    throw { error: "Post not found", statusCode: 404 };
                } else {
                    return res.status(201).send({ message: "Bio Successfully Updated", status: true });
                }
            }
        }

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }



})

module.exports = router;