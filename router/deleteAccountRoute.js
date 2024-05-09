const express = require("express");
const session = require("express-session");
const User = require("../model/User");
const Post = require("../model/Post");
const router = express.Router();
const { cloudinary } = require("../cloudinary/index");


router.get("/", (req, res) => {
    const id = req.session.user._id;
    User.findByIdAndDelete(id, (err, data) => {
        if (err) {
            console.log("error in deleting", err)
        } else {
            console.log("Account Deleted");
            Post.find({ postedBy: id }, (err, posts) => {
                if (err) {
                    console.log(err);
                } else {
                    posts.forEach(post => {
                        cloudinary.uploader.destroy(post.fileName, { resource_type: "raw" });
                    });
                    Post.deleteMany({ postedBy: id })
                        .then(() => {
                            console.log("deleted Posts");
                            req.session.destroy();
                            res.render("login", { errorMessage: "Your Account has been Deleted Permanantly" });
                        }).catch(err => {
                            console.log(err);
                        });
                }
            });


        }
    });
});

module.exports = router;