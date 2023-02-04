const Profile = require('../models/profile')

exports.create = async (req, res) => {
    // const skills = req.body.skills.split(',').map(skill => skill.trim())
    const updatedFields = {
        ...req.body,
        // skills,
        user: req.user.id
    }
    try {
        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            // update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: updatedFields },
                { new: true })
            res.json(profile)
        } else {
            // create
            profile = new Profile(updatedFields)
            await profile.save()
            res.json(profile)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.me = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['username', 'avatar'])
        if (!profile) {
            return res.status(400).json({ msg: 'No profile available' })
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
}

exports.getAll = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['username', 'avatar'])
        if (!profiles) {
            return res.status(400).json({ msg: 'No profile available' })
        }
        res.json(profiles)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
}
