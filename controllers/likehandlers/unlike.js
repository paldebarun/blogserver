const likesSchema = require('../../models/likes');
const mongoose = require('mongoose');
const blogSchema = require('../../models/blog');

exports.removelike = async (req, res) => {
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

        if (!existingLike) {
            return res.status(400).json({
                success: false,
                message: "The user has not liked this blog"
            });
        }

        // Remove the like document
        await likesSchema.deleteOne({ _id: existingLike._id });

        const blog = await blogSchema.findById(blogid);

        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "The blog is not found"
            });
        }

        // Remove the like's _id from the blog's likes array
        blog.likes.pull(existingLike._id);

        await blog.save();

        return res.status(200).json({
            success: true,
            message: "The like is successfully removed"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
