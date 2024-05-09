const express = require("express");
const router = express.Router();
const session = require("express-session");
const User = require("../model/User");


router.get("/", (req, res) => {
    User.findOne({ _id: req.session.user._id }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            var username = user.username;
            User.find({}, (err, users) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("userList", { users, username, id: req.session.user._id, show: "", notShow: "none" });
                }
            })
        }
    })

});



module.exports = router;