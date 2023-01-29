const mongoose = require('mongoose')
const config = require('config')

const db = config.get('MONGO_URI')

/**
 * Connect to mongo database
 */
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(db)
        console.log('mongo db connected')
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

module.exports = connectDB
