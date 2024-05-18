const express = require("express");
const router = express.Router();
const session = require("express-session");
const User = require("../model/User");
const { cloudinary } = require("../cloudinary/index");



router.post("/", async (req, res) => {
    try {
        const backgroundPic = req.file.path;
        const backFileName = req.file.filename;

        const prevFileName = req.session.user.backImgFileName;

        const user = await User.findByIdAndUpdate(req.session.user._id, { backgroundPic, backImgFileName: backFileName }, { new: true })
        if (!user) {
            throw { error: "Couldn't update Photo", statusCode: 500 };
        } else {
            req.session.user = data;
            cloudinary.uploader.destroy(prevFileName);
            res.status(201).send({ message: "Background Pic Successfully Updated", status: true });
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }


});

module.exports = router;