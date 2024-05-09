const express = require("express");
const session = require("express-session");
const router = express.Router();
const User = require("../model/User");


router.get("/", (req, res) => {
    const id = req.session.user._id;
    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
        } else {
            User.findOne({ _id: id }, (err, user) => {
                if (err) {
                    console.log(err);
                } else {
                    const name = user.username;
                    console.log(name)
                    res.render("chat", { users, name });
                }
            });
        }
    });
});


module.exports = router;