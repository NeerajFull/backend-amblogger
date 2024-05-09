const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
    res.render("register", { title: "AmBlogger-Register" });
});

router.post("/", async (req, res) => {
    const email = req.body.email.trim();
    const username = req.body.username.trim();
    const password = req.body.password;
    const confPassword = req.body.confPassword;

    if (username && email && password && confPassword) {
        if(password.length<5){
            var errorMessage = "Passwords Length should be more than 5";
            return res.status(200).render("register", { email, errorMessage, title: "AmBlogger-Register" });
        }
        if (password !== confPassword) {
            var errorMessage = "Passwords Do not match";
            return res.status(200).render("register", { email, errorMessage, title: "AmBlogger-Register" });
        }
        

        const user = await User.findOne({
            $or: [{ email }, { username }]
        })
            .catch(error => {
                console.log(error);
                var errorMessage = "Something went Wrong";
                res.status(200).render("register", { username, email, errorMessage, title: "AmBlogger-Register" });
            });

        if (user === null) {
            var data = req.body;

            data.password = await bcrypt.hash(password, 10);

            User.create(data)
                .then(user => {
                    req.session.user = user;
                    return res.redirect("/login");
                });
        }
        else {
            if (email === user.email) {
                var errorMessage = "Email already in use";
            }
            if (username === user.username) {
                var errorMessage = "Username Already Exist";
            }
            res.status(200).render("register", { errorMessage, title: "AmBlogger-Register" });
        }

    }
    else {
        var errorMessage = "Make sure each field is filled";
        res.status(200).render("register", { username, email, errorMessage, title: "AmBlogger-Register" });
    }

});

module.exports = router;