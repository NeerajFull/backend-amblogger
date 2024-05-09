const express = require("express")
const session = require("express-session");
const router = express.Router();
const Post = require("../model/Post");
const { cloudinary } = require("../cloudinary/index");

router.get("/", (req, res) => {
    res.render("createPost", { id: req.session.user._id });
});

router.post("/", async (req, res) => {
    const photo = req.file.path;
    const fileName = req.file.filename;
    const caption = req.body.caption;

    const data = {
        photo, caption, fileName,
        postedBy: req.session.user
    };
    await Post.create(data)
        .then((posts) => {
            console.log("Post Created");
            // req.session.user = posts;
            res.render("createPost", { message: "Your Post has been created", id: req.session.user._id });
        })
        .catch(err => {
            console.log("error in Creating Post", err)
            res.render("createPost", { errorMessage: "Could not Upload Your post" });
        })

});



module.exports = router;