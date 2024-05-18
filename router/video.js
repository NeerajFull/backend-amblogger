const express = require("express");
const router = express.Router();
const session = require("express-session");
const { cloudinary } = require("../cloudinary/index");
const Post = require("../model/Post");


router.get("/", (req, res) => {
    res.render("video", { id: req.session.user._id });
})

router.post("/", async (req, res) => {
    try {
        const fileName = req.file.filename;
        const caption = req.body.caption;
        const video = req.file.path;

        const data = {
            video, caption, fileName,
            postedBy: req.session.user
        };

        const posts = await Post.create(data)
        if (posts) {
            return res.status(201).send({ message: "Video has Posted", status: true });
        } else {
            throw { error: "Video Could not post", statusCode: 500 };
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }



})

module.exports = router;