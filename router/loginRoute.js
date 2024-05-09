const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");


router.get("/", (req, res) => {
    res.render("login", { title: "AmBlogger-Login" });
});

router.post("/", async (req, res) => {

    const email = req.body.email.toLowerCase().trim();
    const username = req.body.email.trim();
    const password = req.body.password;

    if (email && password) {

        const user = await User.findOne({
            $or: [{ email }, { username }]
        })
            .catch(error => {
                console.log(error);

                var errorMessage = "Something Went Wrong.";
                res.render("login", { errorMessage, email, username, title: "AmBlogger-Login" });
            });

        if (user !== null) {
            var result = await bcrypt.compare(password, user.password);
            if (result === true) {
                //correct password
                req.session.user = user;
                return res.redirect(`/`);
            }
        }
        var errorMessage = "Credentials incorrect.";
        return res.render("login", { errorMessage, title: "AmBlogger-Login" });
    }
    var errorMessage = "Make sure each field has correct values.";
    return res.render("login", { errorMessage, title: "AmBlogger-Login" });

});



module.exports = router;