const express = require("express");
const session = require("express-session");
const router = express.Router();
const Post = require("../model/Post");

router.post("/", (req, res) => {
    const likeID = req.body.like;
    const where = req.body.where;
    const id = req.session.user._id;
    Post.findByIdAndUpdate(likeID, { $push: { like: id } }, { new: true }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (where == "home") {
                res.redirect("/");
            } else {
                res.redirect(`/profile/${result.postedBy._id}`);
            }
        }
    })

});

module.exports = router;