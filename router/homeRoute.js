const express = require("express");
const router = express.Router();
const session = require("express-session");
const Post = require("../model/Post");
const User = require("../model/User");


router.get("/", async (req, res) => {
    Post.find({})
        .populate("postedBy", "_id username")
        .exec((err, posts) => {
            if (err) {
                console.log("error in getting user posts", err)
                res.render("home", { errorMessage: "Can't Find Post" });
            } else {
                // console.log(posts)
                res.render("home", { posts, id: req.session.user._id });
            }
        })
});

// router.post("/home/search",(req,res)=>{
//     const search = req.body.search;
//     User.find({},(err,users)=>{
//         if(err){
//             console.log("Error in searching user",err);
//         }else{
//             res.render("search",{users});
//         }
//     })

    
// })

module.exports = router;