const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const User = require("../model/User");


router.post("/", async (req, res) => {
    try {
        const postId = req.body.postId;

        const post = await Post.findOne({ _id: postId });
        if (!post) {
            throw { error: "Post not found", statusCode: 404 };
        } else {

            const users = post.comment;
            const postedBy = post.postedBy;
            const user = await User.findOne({ _id: postedBy });
            if (!user) {
                throw { error: "User, who posted, not found", statusCode: 404 };
            } else {
                const postUser = user.username;
                const myuser = await User.findOne({ _id: req.session.user._id });
                if (!myuser) {
                    throw { error: "User not found", statusCode: 404 };
                } else {
                    const myUser = myuser.username;
                    const commentText = post.commentText;
                    return res.status(201).send({ message: "Comments fetched", data: { users, commentText, postId, postUser, myUser }, status: true });
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }


})

router.post("/deletecomment", async (req, res) => {

    try {
        const post = await Post.findOneAndUpdate({ _id: req.body.id }, { $pull: { comment: req.body.user } }, { new: true });

        if (!post) {
            throw { error: "Post not found", statusCode: 404 };
        } else {
            const data = await Post.findOneAndUpdate({ _id: req.body.id }, { $pull: { commentText: req.body.commentText } }, { new: true });
            if (!data) {
                throw { error: "Post not found", statusCode: 404 };
            } else {
                return res.status(201).send({ message: "Comment deleted", status: true });
            }
        }

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }

})


module.exports = router;
