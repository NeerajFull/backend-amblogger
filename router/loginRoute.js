const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");


router.post("/", async (req, res) => {

    try {

        const email = req.body.email.toLowerCase().trim();
        const username = req.body.email.trim();
        const password = req.body.password;

        if (email && password) {

            const user = await User.findOne({
                $or: [{ email }, { username }]
            });

            if (user !== null) {
                const result = await bcrypt.compare(password, user.password);
                if (result === true) {
                    //correct password
                    req.session.user = user;
                    return res.status(200).send({ status: true, message: "Successfully logged in" });
                } else {
                    throw { error: "Credentials incorrect.", statusCode: 401 };
                }
            } else {
                throw { error: "User is not available", statusCode: 404 };
            }

        }
        throw { error: "Make sure each field has correct values.", statusCode: 400 };
    } catch (error) {
        console.log("Login ", error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }


});



module.exports = router;