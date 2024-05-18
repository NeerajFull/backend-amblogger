const express = require("express");
const router = express.Router();
const User = require("../model/User");


router.post("/", async (req, res) => {
    try {

        const bio = req.body.bio.trim();
        const updatedBio = await User.findByIdAndUpdate(req.session.user._id, { bio: bio }, { new: true });
        if (!updatedBio) {
            throw { error: "Unable to update bio", statusCode: 500 };
        } else {
            req.session.user = updatedBio;
            return res.status(201).send({ message: "Bio Successfully Updated", status: true });
        }

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({ message: error.error, status: false });
    }

});


module.exports = router;