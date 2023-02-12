const mongoose = require('mongoose')

const Schema = mongoose.Schema
const { schemaOptions } = require('./schemaOptions')

const BoardTaskSchema = new Schema({
    boardSection: {
        type: Schema.Types.ObjectId,
        ref: 'BoardSection',
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    position: {
        type: Number
    }
}, schemaOptions)

module.exports = mongoose.models.BoardTask || mongoose.model('BoardTask', BoardTaskSchema)
