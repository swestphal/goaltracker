const mongoose = require('mongoose')
const { schemaOptions } = require('./schemaOptions')

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        required: true
    }
}, schemaOptions)

// exort like this to avoid OverwriteModelError: Cannot overwrite `User` model once compiled.
module.exports = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema)
