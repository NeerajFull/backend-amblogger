const express = require("express");
const session = require("express-session");
const router = express.Router();
const Post = require("../model/Post");
const { cloudinary } = require("../cloudinary/index");

router.get("/", (req, res) => {
    Post.find({ postedBy: req.session.user._id }, (err, posts) => {
        if (err) {
            console.log(err);
        } else {

            res.render("deleteVideoes", { posts, id: req.session.user._id });
        }
    })

});

router.post("/", (req, res) => {
    const fileName = req.body.fileName;
    Post.findOneAndDelete({ fileName }, (err, deleted) => {
        if (err) {
            console.log(err);
        } else {
            cloudinary.uploader.destroy(fileName, { resource_type: "raw" })
            console.log("Deleted video successfully");
            res.redirect("/deleteVideoes");
        }
    })

})

module.exports = router;