
const express = require("express");
const session = require("express-session");
const router = express.Router();
const User = require("../model/User");
const Post = require("../model/Post");

router.post("/", async (req, res) => {


    try {
        const follow = req.body.follow;
        const result = await User.findOneAndUpdate({ username: follow }, { $pull: { followers: req.session.user._id } }, { new: true });
        if (!result) {
            throw { error: "Something went wrong", statusCode: 500 };
        } else {
            const result2 = await User.findByIdAndUpdate(req.session.user._id, { $pull: { following: result._id } }, { new: true });
            if (!result2) {
                throw { error: "Something went wrong", statusCode: 500 };
            } else {
                const posts = await Post.find({ postedBy: result._id });
                if (err) {
                    throw { error: "Unable to find post", statusCode: 500 };
                } else {
                    res.status(200).send({ message: "Successfully deleted the post.", status: true, data: { profilePic: result.profilePic, backgroundPic: result.backgroundPic, bio: result.bio, profileName: result.username, posts, following: result.following, followers: result.followers } });
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }

})



module.exports = router;