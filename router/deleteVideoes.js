const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const { cloudinary } = require("../cloudinary/index");

router.post("/", async (req, res) => {
    try {
        const fileName = req.body.fileName;
        const deleted = await Post.findOneAndDelete({ fileName });

        if (!deleted) {
            throw { error: "Post not found", statusCode: 404 };
        } else {
            cloudinary.uploader.destroy(fileName, { resource_type: "raw" })
            console.log("Deleted video successfully");
            res.redirect("/deleteVideoes");
            return res.status(200).send({ message: "Deleted video", status: true });
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }


})

module.exports = router;