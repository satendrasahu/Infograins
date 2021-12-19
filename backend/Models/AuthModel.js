const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const AuthSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userPic: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ["Admin", "User"]
    },
    phoneNo: {
        type: Number,
        default: 9876543210
    }
}, {
    timestamps: true,
})

AuthSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


AuthSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const AuthModel = mongoose.model('Auth', AuthSchema)

module.exports = AuthModel