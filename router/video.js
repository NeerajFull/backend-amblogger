const express = require("express");
const router = express.Router();
const session = require("express-session");
const { cloudinary } = require("../cloudinary/index");
const Post = require("../model/Post");


router.get("/", (req, res) => {
    res.render("video", { id: req.session.user._id });
})

router.post("/", (req, res) => {
    const fileName = req.file.filename;
    const caption = req.body.caption;
    const video = req.file.path;

    const data = {
        video, caption, fileName,
        postedBy: req.session.user
    };

    Post.create(data)
        .then((posts) => {
            console.log("Video Posted");
            res.render("video", { message: "Video has Posted", id: req.session.user._id });
        })
        .catch(err => {
            console.log("error in posting video", err)
            res.render("video", { errorMessage: "Video Could not post", id: req.session.user._id });
        })


})

module.exports = router;