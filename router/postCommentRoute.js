const express = require("express");
const session = require("express-session");
const router = express.Router();
const Post = require("../model/Post");
const User = require("../model/User");

router.get("/", (req, res) => {
    res.redirect("/")
})

router.post("/", (req, res) => {
    const postId = req.body.postId;
    const comments = req.body.comment;
    if (comments.trim().length == 0) {
        res.redirect("/postcomment")
        return;
    }
    User.findOne({_id:req.session.user._id },(err,user)=>{
        if(err){
            console.log(err);
        }else{
            const username = user.username;
            Post.findOneAndUpdate({ _id: postId }, { $push: { comment: username } }, { new: true }, (err, post) => {
                if (err) {
                    console.log(err);
                } else {
                    Post.findOneAndUpdate({ _id: postId }, { $push: { commentText: comments } }, { new: true }, (err, posts) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(posts)
                            res.redirect("/postcomment");
                        }
                    })
        
                }
            })
        }
    })
    
    
})

module.exports = router;