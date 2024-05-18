const express = require("express");
const router = express.Router();
const session = require("express-session");
const User = require("../model/User");


router.get("/", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.user._id });

        if (!user) {
            throw { error: "User not found", statusCode: 404 };
        } else {
            var username = user.username;
            const users = await User.find({});
            if (!users) {
                throw { error: "No user found", statusCode: 404 };
            } else {
                return res.status(200).send({ message: "Bio Successfully Updated", data: { ...users, username }, status: true });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }


});



module.exports = router;