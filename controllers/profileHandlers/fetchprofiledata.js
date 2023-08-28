const UserSchema = require('../../models/user');
const bcrypt = require('bcrypt');
const Profile = require('../../models/profile');

exports.fetchprofiledata = async (req, res) => {
    try {
        const { email} = req.params;
        
        const user = await UserSchema.findOne({ email:email });

        if (!user) {
            
            return res.status(404).json({
                success: false,
                message: "User with this email is not registered"
            });
        }


        const userProfile = await Profile.findById(user.profile); // Use the user.profile directly as the argument

        if (userProfile) {
            return res.status(200).json({
                success: true,
                message: "The profile is fetched",
                profile: userProfile
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "There was an error in fetching the profile of the requested user"
        });
    }
};
