const Board = require('./../models/Board')
const Section = require('./../models/BoardSection')
const Task = require('./../models/BoardTask')

exports.create = async (req, res) => {
    const { boardId } = req.params
    try {
        const section = await Section.create({ board: boardId })
        section._doc.tasks = []
        res.status(200).json(section)
    } catch (err) {
        console.log('req', req.params)
        res.status(500).json(err)
    }
}

exports.update = async (req, res) => {
    const { sectionId } = req.params
    try {
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { $set: req.body }
        )
        section._doc.tasks = []
        res.status(200).json(section)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.delete = async (req, res) => {
    const { sectionId } = req.params
    try {
        await Task.deleteMany({ section: sectionId })
        await Section.deleteOne({ _id: sectionId })
        res.status(200).json('deleted')
    } catch (err) {
        res.status(500).json(err)
    }
}
