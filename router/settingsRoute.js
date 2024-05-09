const express = require("express");
const router = express.Router();
const session = require("express-session")
const User = require("../model/User");


router.get("/", (req, res) => {
    res.render("settings", { id: req.session.user._id });
});



module.exports = router;