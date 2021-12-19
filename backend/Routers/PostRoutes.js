const express = require("express");
const { savePost, findPost, DeletePostById, findPostByUserId, findPostByUserName } = require("../Controllers/PostController");
const Router = express.Router();
const multer = require('multer');
const shortid = require('shortid')
const path = require('path');
const { extname } = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads/posts'));
    },
    filename: function(req, file, cb) {
        cb(null, shortid.generate() + "-" + file.fieldname + Date.now() + path, extname(file.originalname));
    },
});


var upload = multer({ storage }).single('file');


Router.post("/post", savePost)
Router.get("/post", findPost)
Router.get("/postbyuserid/:userid", findPostByUserId)
Router.delete("/post/:id", DeletePostById)

module.exports = Router;