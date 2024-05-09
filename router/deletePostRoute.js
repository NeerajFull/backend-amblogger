const express = require("express");
const router = express.Router();
const session = require("express-session");
const Post = require("../model/Post");
const { cloudinary } = require("../cloudinary/index");

router.post("/", (req, res) => {
    const postId = req.body.postId;
    console.log(postId)
    Post.findOneAndDelete({ _id: postId }, (err, deletedItem) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Post Deleted")
            cloudinary.uploader.destroy(deletedItem.fileName
                , { resource_type: "raw" })
            res.redirect("/");
        }
    })
});
module.exports = router;