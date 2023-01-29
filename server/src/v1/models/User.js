const mongoose = require('mongoose')
const { schemaOptions } = require('./schemaOptions')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, schemaOptions)

// exort like this to avoid OverwriteModelError: Cannot overwrite `User` model once compiled.
module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
