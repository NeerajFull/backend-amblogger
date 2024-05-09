const express = require("express");
const router = express.Router();
const session = require("express-session");
const Post = require("../model/Post");
const User = require("../model/User");

router.get("/", (req, res) => {
    res.redirect("/videocollection");
})

router.post("/", async (req, res) => {
    const username = req.body.username;
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            Post.find({ postedBy: user._id }, (err, posts) => {
                if (err) {
                    console.log(err);
                    res.render("videoCollection");
                } else {
                    console.log(posts)

                    res.render("videoCollection", { posts, id: req.session.user._id, user_id: posts.length > 0 ? posts[0].postedBy : "" });


                }
            })
        }
    })


});



module.exports = router;