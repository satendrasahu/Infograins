const mongoose = require("mongoose")
const moment = require("moment")
const currentDateAndTime = moment().format('MMMM Do YYYY, h:mm:ss a')
const currentDate = moment().format('MM-DD-YYYY')
const currentTime = moment().format('hh:mm:ss a')

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    img: { type: String },
    userId: {
        type: String
    },
    userName: { type: String },
    userPic: { type: String },
    userId: { type: String },
    date_time: {
        type: String,
        default: currentDateAndTime
    }
}, { timestamps: true })

const PostModel = new mongoose.model("Post", PostSchema)
module.exports = PostModel