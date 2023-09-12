const UserSchema = require('../models/user');
const bcrypt = require('bcryptjs');
const profile=require('../models/profile');

exports.signup = async (req, res) => {
    try {
        // User attributes are fetched
        const { firstName, lastName, autherName, email, password, job, country } = req.body;
        const blogs = [];

        // Validation of the entries are checked
        if (!firstName || !lastName || !autherName || !email || !password || !job || !country) {
            return res.status(400).json({
                success: false,
                message: "The entries are not properly filled"
            });
        }

        const already = await UserSchema.findOne({ email });
        if (already) {
            return res.status(409).json({
                success: false,
                message: "User already present"
            });
        }

        // Hashing of password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Validation of hashing operation
        if (!hashedPassword) {
            return res.status(500).json({
                success: false,
                message: "Password hashing failed"
            });
        }

        const Profile=new profile({
            imageUrl:"",
            username:"",
            job:"",
            country:"",
            email:"",
            likesCount:[],
            bio:""

        });

        const savedprofile=await Profile.save();

        // User object is created
        const newUser = new UserSchema({
            firstName,
            lastName,
            autherName,
            email,
            password: hashedPassword,
            job,
            country,
            blogs,
            profile:savedprofile._id
        });

        // User entry is registered
        const savedEntry = await newUser.save();
        //creating profile 
        
        
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user: savedEntry
        });

    } catch (error) {
        // Error handling
        return res.status(500).json({
            success: false,
            message: "User registration failed"
        });
    }
}
