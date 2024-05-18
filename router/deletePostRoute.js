const express = require("express");
const router = express.Router();
const session = require("express-session");
const Post = require("../model/Post");
const { cloudinary } = require("../cloudinary/index");

router.post("/", async (req, res) => {
    try {
        const postId = req.body.postId;
        console.log(postId)
        const deletedItem = await Post.findOneAndDelete({ _id: postId });
        if (deletedItem) {
            cloudinary.uploader.destroy(deletedItem.fileName, { resource_type: "raw" });
            res.status(200).send({ message: "Successfully deleted the post.", status: true });
        } else {
            throw { error: "Unable to delete post", statusCode: 500 };
        }



    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }

});
module.exports = router;