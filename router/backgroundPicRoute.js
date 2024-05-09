const express = require("express");
const router = express.Router();
const session = require("express-session");
const User = require("../model/User");
const { cloudinary } = require("../cloudinary/index");


router.get("/", async (req, res) => {
    res.send("backgroundPic",{id:req.session.user._id});
});


router.post("/", (req, res) => {
    const backgroundPic = req.file.path;
    const backFileName = req.file.filename;

    const prevFileName = req.session.user.backImgFileName;

    User.findByIdAndUpdate(req.session.user._id, { backgroundPic, backImgFileName: backFileName }, { new: true }, (err, data) => {
        if (err) {
            console.log(err)
            return res.render("backgroundPic", { errorMessage: "Couldn't update Photo" });
        } else {
            console.log("Updated User Background Pic");
            req.session.user = data;
            cloudinary.uploader.destroy(prevFileName);
            res.render("backgroundPic", { message: "Background Pic Successfully Updated", id: req.session.user._id });
        }
    })
});

module.exports = router;