const express = require("express");
const router = express.Router();
const Post = require("../model/Post");


router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({}).populate("postedBy", "_id username")

        if (!posts) {
            throw { error: "Posts not found", statusCode: 404 };
        } else {
            res.status(200).send({ posts, id: req.session.user._id, status: true });
        }

    } catch (error) {
        console.log("get all posts: ", error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }

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