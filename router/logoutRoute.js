const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    try {
        const logout = req.session.destroy();

        if ("user" in logout) {
            return res.status(200).send({ status: true, message: "Successfully logout" });
        } else {
            throw { error: "No session found", statusCode: 205 }; //already logout, fresh
        }
    } catch (error) {
        console.log("logout", error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }

});

module.exports = router;