const express = require("express");
const session = require("express-session");
const User = require("../model/User");
const Post = require("../model/Post");
const router = express.Router();
const { cloudinary } = require("../cloudinary/index");


router.get("/", async (req, res) => {
    //NEED TO DELETE COMMENTS ALSO,,, LIKES DISLIKES... 
    try {
        const id = req.session.user._id;
        const user = await User.findByIdAndDelete(id);

        if (user) {
            const posts = await Post.find({ postedBy: id });
            if (posts) {
                posts.forEach(post => {
                    cloudinary.uploader.destroy(post.fileName, { resource_type: "raw" });
                });
                const post = await Post.deleteMany({ postedBy: id });
                if (post) {
                    req.session.destroy();
                    res.status(200).send({ message: "our Account has been Deleted Permanantly", status: true });
                } else {
                    throw { error: "Not able to delete posts", statusCode: 500 };
                }
            } else {
                throw { error: "Posts not found", statusCode: 404 };
            }

        } else {
            throw { error: "User not found", statusCode: 400 };
        }

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }


});

module.exports = router;