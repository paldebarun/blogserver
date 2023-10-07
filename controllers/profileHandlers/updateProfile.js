const Profile = require('../../models/profile');
const mongoose = require('mongoose');
const UserSchema = require('../../models/user');

exports.updateProfile = async (req, res) => {
    try {
        const { _id, url, username, pseudonym, job, country, email, bio } = req.body;

        
        if (!mongoose.isValidObjectId(_id)) {
            return res.status(400).json({ success: false, message: 'Invalid _id' });
        }

       
        const updateFields = {};
        if (url) updateFields.imageurl = url;
        if (username) updateFields.username = username;
        if (pseudonym) updateFields.pseudonym = pseudonym;
        if (job) updateFields.job = job;
        if (country) updateFields.country = country;
        if (email) updateFields.email = email;
        if (bio) updateFields.bio = bio;

        
        const updatedProfile = await Profile.findByIdAndUpdate(_id, updateFields, { new: true });

        if (!updatedProfile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        if (pseudonym) {
            const user = await UserSchema.findOneAndUpdate(
                { email: updatedProfile.email }, 
                { autherName: pseudonym },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
        }

        return res.status(200).json({ success: true, message: 'Profile updated successfully', profile: updatedProfile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
