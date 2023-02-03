const Profile = require('../models/profile')

exports.update = async (req, res) => {
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
