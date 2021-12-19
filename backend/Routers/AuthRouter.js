const express = require('express')
const { Login, Register, findRegisterUser, findRegisterUserByid } = require('../Controllers/AuthController');
const router = express.Router();
const validator = require('express-validator')
const { check, validationResult } = validator

const multer = require('multer');
const shortid = require('shortid')
const path = require('path');
const { extname } = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads/users'));
    },
    filename: function(req, file, cb) {
        // cb(null, shortid.generate() + "-" + file.fieldname + Date.now() + path, extname(file.originalname));
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});


var upload = multer({ storage }).single('file');
router.post('/login', [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 8 }).withMessage('password must be at least 8 chararacters')
], Login)

router.post('/register', [
    check("userName").isLength({ min: 5 }).withMessage('Username must be at least 5 chararacters'),
    check("password").isLength({ min: 8 }).withMessage('password must be at least 8 chararacters'),
    check("email").isEmail().withMessage("Email is required")
], Register)


router.get("/user", findRegisterUser)
router.get("/user/:id", findRegisterUserByid)

module.exports = router