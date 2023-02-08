const mongoose = require('mongoose')

const Schema = mongoose.Schema
const { schemaOptions } = require('./schemaOptions')

const BoardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    icon: {
        type: String,
        default: '+'
    },
    title: {
        type: String,
        default: 'Untitled'
    },
    description: {
        type: String,
        default: 'Add description here'
    },
    position: {
        type: Number
    },
    favourite: {
        type: Boolean,
        default: false
    },
    favouritePosition: {
        type: Number,
        default: 0
    }
}, schemaOptions)

module.exports = mongoose.models.Board || mongoose.model('Board', BoardSchema)
