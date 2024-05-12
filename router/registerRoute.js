const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");


router.post("/", async (req, res) => {

    try {

        const email = req.body.email.trim();
        const username = req.body.username.trim();
        const password = req.body.password;
        const confPassword = req.body.confPassword;

        if (username && email && password && confPassword) {
            if (password.length < 5) {
                throw { error: "Passwords Length should be more than 5", statusCode: 401 };
            }
            if (password !== confPassword) {
                throw { error: "Passwords Do not match", statusCode: 401 };
            }


            const user = await User.findOne({
                $or: [{ email }, { username }]
            })

            if (user === null) {
                const data = req.body;
                data.password = await bcrypt.hash(password, 10);

                const createdUser = await User.create(data);
                req.session.user = createdUser;

                return res.status(201).send({ message: "Successfully registered", status: true });

            }
            else {
                let errorMessage = "";
                if (email === user.email) {
                    errorMessage = "Email already in use";
                }
                if (username === user.username) {
                    errorMessage = "Username Already Exist";
                }
                throw { error: errorMessage, statusCode: 409 };
            }

        }
        else {
            throw { error: "Make sure each field is filled", statusCode: 401 };
        }
    } catch (error) {
        console.log("register", error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }


});

module.exports = router;