const express = require("express");
const router = express.Router();
const User = require("../model/User");
const session = require("express-session")


router.get("/", async (req, res) => {
    res.render("bio",{id:req.session.user._id});
})

router.post("/", async (req, res) => {
    const bio = req.body.bio.trim();
    User.findByIdAndUpdate(req.session.user._id, { bio: bio }, { new: true }, (err, data) => {
        if (err) {
            console.log(err)
            return res.render("bio", { errorMessage: "Couldn't update" });
        } else {
            console.log("Updated User Bio");
            req.session.user = data;
            res.render("bio", { message: "Bio Successfully Updated",id: req.session.user._id });
        }
    })

});


module.exports = router;