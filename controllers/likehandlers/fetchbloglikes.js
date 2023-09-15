const mongoose = require('mongoose');
const blogSchema = require('../../models/blog');
const likesSchema = require('../../models/likes');

exports.fetchBlogLikesauthernames = async (req, res) => {
    try {
        const { blog_id } = req.body;

        const blog = await blogSchema.findById(blog_id);

        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "The blog is not found"
            });
        }

        // Find all likes for the given blog
        const likes = await likesSchema.find({ blog_id: blog._id });

        // Extract the autherName from each like
        const authorNames = likes.map(like => like.autherName);

        return res.status(200).json({
            success: true,
            authorNames
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
