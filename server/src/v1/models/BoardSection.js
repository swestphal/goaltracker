const mongoose = require('mongoose')

const Schema = mongoose.Schema
const { schemaOptions } = require('./schemaOptions')

const BoardSectionSchema = new Schema({
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    title: {
        type: String,
        default: ''
    }
}, schemaOptions)

module.exports = mongoose.models.BoardSection || mongoose.model('BoardSection', BoardSectionSchema)
