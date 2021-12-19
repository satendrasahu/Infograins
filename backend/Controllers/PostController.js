const PostModel = require("../Models/PostModel")
const chalk = require("chalk")
const savePost = async(req, res) => {
    // console.log(req.body)
    const { title, userId, userName, userPic, img } = req.body
    try {
        const PostData = new PostModel({ title, userId, userName, img, userPic })
        const result = await PostData.save()
        if (result) {
            console.log(chalk.green.inverse("post created successfully"))
            res.json({ Success: `post created successfully`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.green.inverse("post not created successfully", err.message))
        res.json({ Success: " post not created successfully", data: [] })
    }
}

const findPost = async(req, res) => {
    try {
        const result = await PostModel.find().sort({ date_time: -1 })
        if (result) {
            console.log(chalk.green.inverse("post found successfully"))
            res.json({ Success: " post found successfully", length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.green.inverse("post did not find successfully", err.message))
        res.json({ Success: " post didnot find successfully", data: [] })
    }
}

const findPostByUserId = async(req, res) => {
    try {
        const result = await PostModel.find({ userId: req.params.userid }).sort({ date_time: -1 })
        if (result) {
            console.log(chalk.green.inverse("post found successfully by user name"))
            res.json({ Success: " post found successfully by user Name", length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.green.inverse("post did not find successfully userName", err.message))
        res.json({ Success: " post didnot find successfully userName", data: [] })
    }
}
const DeletePostById = async(req, res) => {
    try {
        const result = await PostModel.findByIdAndDelete({ _id: req.params.id }, { new: true })
        if (result) {
            console.log(chalk.green.inverse("post delete successfully"))
            res.json({ Success: " post delete successfully", length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.green.inverse("post did not delete successfully", err.message))
        res.json({ Success: " post didnot delete successfully", data: [] })
    }
}


module.exports = {
    savePost,
    findPost,
    findPostByUserId,
    DeletePostById
}