const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const User = require("../model/User");


// router.get("/", async (req, res) => {

//     const username = req.session.user.username;
//     const bio = req.session.user.bio;
//     const profilePic = req.session.user.profilePic;
//     const backgroundPic = req.session.user.backgroundPic;


//     Post.find({ postedBy: req.session.user._id })
//         .populate("postedBy", "_id")
//         .exec((err, posts) => {
//             if (err) {
//                 console.log("error in getting user posts", err)
//             } else {
//                 User.findById({ _id: req.session.user._id }, (err, result) => {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         // console.log(posts)
//                         res.render("profile", { profileName: username, bio, profilePic, backgroundPic, posts, following: result.following, followers: result.followers, display: "none", unfollow: "none", button: "", id: req.session.user._id });
//                     }
//                 })
//             }
//         });
// });

router.get("/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const data = await User.findById(id);

        if (data) {
            const id = data._id;
            const posts = await Post.find({ postedBy: id }).populate("postedBy", "_id");

            if (!posts) {
                throw { error: "Error in fetching posts", statusCode: 500 };
            } else {
                res.status(200).send({ posts, backgroundPic: data.backgroundPic, profilePic: data.profilePic, profileName: data.username, bio: data.bio, followers: data.followers, following: data.following, id: req.session.user._id, status: true });
            }
        } else {
            throw { error: "User not found", statusCode: 404 };
        }
    } catch (error) {
        console.log("profile", error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }

})


module.exports = router;
