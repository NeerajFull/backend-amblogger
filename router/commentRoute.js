const express = require("express");
const session = require("express-session");
const router = express.Router();
const Post = require("../model/Post");
const User = require("../model/User");


router.get("/", (req, res) => {
    res.redirect("/comment");
})

router.post("/", (req, res) => {
    const postId = req.body.postId;

    Post.findOne({ _id: postId }, (err, post) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(post)
            const users = post.comment;
            const postedBy = post.postedBy;
            User.findOne({ _id: postedBy }, (err, user) => {
                if (err) {
                    console.log(err);
                } else {
                  
                    const postUser = user.username;
                    User.findOne({ _id: req.session.user._id }, (err, myuser) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const myUser = myuser.username;
                            // console.log(myuser,myUser)
                            const commentText = post.commentText;
                            console.log("Users array",users)
                            res.render("comment", { users, commentText, id: req.session.user._id, postId, postUser,myUser });
                        }
                    })
                }
            })

        }
    });
})

router.post("/deletecomment", async (req, res) => {


    await Post.findOneAndUpdate({ _id: req.body.id }, { $pull: { comment: req.body.user } }, { new: true }, (err, post) => {
        if (err) {
            console.log(err);
        } else {
            console.log("User deleted from comment");
            Post.findOneAndUpdate({ _id: req.body.id }, { $pull: { commentText: req.body.commentText } }, { new: true }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("DEleted Comment");
                    res.redirect("/");
                }
            })
        }
    })

})


module.exports = router;
