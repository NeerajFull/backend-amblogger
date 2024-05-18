const express = require("express");
const session = require("express-session");
const router = express.Router();
const Post = require("../model/Post");

router.post("/", async (req, res) => {

    try {
        const likeID = req.body.like;
        const id = req.session.user._id;
        const result = await Post.findByIdAndUpdate(likeID, { $pull: { like: id } }, { new: true });
        if (!result) {
            throw { error: "Not able to find post", statusCode: 500 };
        } else {
            res.status(200).send({ message: "Successfully disliked.", status: true });
        }

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }

});

module.exports = router;