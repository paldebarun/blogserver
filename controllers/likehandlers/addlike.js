const likesSchema = require('../../models/likes');
const mongoose = require('mongoose');
const blogSchema = require('../../models/blog');
const UserSchema=require('../../models/user');

exports.addlikes = async (req, res) => {
    try {
        const { id, blog_id } = req.body;

        const userid = new mongoose.Types.ObjectId(id);
        const blogid = new mongoose.Types.ObjectId(blog_id);

        if (!id || !blog_id) {
            return res.status(400).json({
                success: false,
                message: "Either the user or the blog info is not passed"
            });
        }

        // Check if the user has already liked the blog
        const existingLike = await likesSchema.findOne({ user_id: userid, blog_id: blogid });
        
        if (existingLike) {
            return res.status(400).json({
                success: false,
                message: "The user has already liked this blog"
            });
        }

        const blog = await blogSchema.findById(blogid);
        const user=await UserSchema.findById(userid);
        
        if (!blog || !user) {
            return res.status(400).json({
                success: false,
                message: "either the blog or the user  is not found"
            });
        }

        const obj = new likesSchema({
            user_id: userid,
            autherName:user.autherName,
            blog_id: blogid
        });

        const savedLike = await obj.save();

        if (!savedLike) {
            return res.status(400).json({
                success: false,
                message: "The like is not posted"
            });
        }

        blog.likes.push(savedLike._id);
        await blog.save();

        return res.status(200).json({
            success: true,
            message: "The like is successfully posted"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
