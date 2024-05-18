const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
require("dotenv").config();
const requireLogin = require("./middleware/logmiddleware");
const multer = require("multer");
const { storage } = require("./cloudinary/index");
const upload = multer({ storage });


const app = express();
//creating http instance
const http = require("http").createServer(app);
//creating socket io 
var io = require("socket.io")(http);


app.use(express.static(path.join(__dirname, "public")));


//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: "Ilovecoding",
    resave: true,
    saveUninitialized: false
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB CONNECTED");
        const PORT = process.env.PORT || 3000;
        http.listen(PORT, () => {
            console.log("Listening on port ", PORT);
        });
    })
    .catch(err => {
        console.log("DB ERROR-->", err);
    });


//Routes
const login = require("./router/loginRoute");
const register = require("./router/registerRoute");
const logout = require("./router/logoutRoute");
const profile = require("./router/profileRoute");
const profilePic = require("./router/profilePicRoute");
const backphoto = require("./router/backgroundPicRoute");
const home = require("./router/homeRoute");
const bio = require("./router/bioRoute");
// const settings = require("./router/settingsRoute");
const deleteAccount = require("./router/deleteAccountRoute");
const createPost = require("./router/createPostRoute");
const deletePost = require("./router/deletePostRoute");
const follow = require("./router/followRoute");
const unFollow = require("./router/unFollowRoute");
const like = require("./router/likeRoute");
const unlike = require("./router/unlikeRoute");
const video = require("./router/video");
const videoCollection = require("./router/videoCollectionRoute");
const deleteVideoes = require("./router/deleteVideoes");
const comments = require("./router/commentRoute");
const postComment = require("./router/postCommentRoute");
const userlist = require("./router/userListRoute");
const chat = require("./router/chatRoute");

app.use("/login", login);
app.use("/register", register);
app.use("/logout", logout);
app.use("/profile", requireLogin, profile);
// app.use("/profile/follow", requireLogin, profile);
app.use("/", requireLogin, home);
app.use("/bio", requireLogin, bio);
app.use("/deleteAccount", requireLogin, deleteAccount);
app.use("/profilePic", requireLogin, upload.single("image"), profilePic);
app.use("/backphoto", requireLogin, upload.single("image"), backphoto);
app.use("/createPost", requireLogin, upload.single("image"), createPost);
app.use("/deletepost", requireLogin, deletePost);
app.use("/follow", requireLogin, follow);
app.use("/unfollow", requireLogin, unFollow);
app.use("/like", requireLogin, like);
app.use("/unlike", requireLogin, unlike);
app.use("/video", requireLogin, upload.single("video"), video);
app.use("/videocollection", requireLogin, videoCollection);
app.use("/deleteVideoes", requireLogin, deleteVideoes);
app.use("/comment", requireLogin, comments);
app.use("/postcomment", requireLogin, postComment);
app.use("/userlist", requireLogin, userlist);
app.use("/chat", requireLogin, chat);
