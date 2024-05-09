
const express = require("express");
const session = require("express-session");
const router = express.Router();
const User = require("../model/User");
const Post = require("../model/Post");

router.post("/", (req, res) => {
    const follow = req.body.follow;
    User.findOneAndUpdate({ username: follow }, { $pull: { followers: req.session.user._id } }, { new: true }, (err, result) => {
        if (err) {
            console.log("Error In Following", err);
        } else {
            User.findByIdAndUpdate(req.session.user._id, { $pull: { following: result._id } }, { new: true }, (err, result2) => {
                if (err) {
                    console.log(err);
                } else {
                    Post.find({ postedBy: result._id }, (err, posts) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render("profile", { profilePic: result.profilePic, backgroundPic: result.backgroundPic, bio: result.bio, profileName: result.username, posts, following: result.following, followers: result.followers, button: "none", display: "", unfollow: "none" })
                        }
                    })
                }
            })

        }

    })

})



module.exports = router;