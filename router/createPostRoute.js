const express = require("express")
const router = express.Router();
const Post = require("../model/Post");

router.post("/", async (req, res) => {
    try {
        const photo = req.file.path;
        const fileName = req.file.filename;
        const caption = req.body.caption;

        const data = {
            photo, caption, fileName,
            postedBy: req.session.user
        };
        const posts = await Post.create(data);
        if (posts) {
            res.status(201).send({ message: "Your Post has been created", status: true });
        } else {
            throw { error: "Could not Upload Your post", statusCode: 500 };
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }

});



module.exports = router;