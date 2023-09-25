const commentSchema = require('../../models/comments');
const blogSchema = require('../../models/blog');
const UserSchema = require('../../models/user'); // Import your UserSchema model
const mongoose = require('mongoose');

exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.body.commentId; 
        const userEmail = req.body.userEmail; 
        const comment_id=new mongoose.Types.ObjectId(commentId);
        // Find the user by their email to get their ID
        const user = await UserSchema.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Find the comment by its id
        const comment = await commentSchema.findById(comment_id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

      
        if (comment.user_id.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment"
            });
        }

       
        const blogId = comment.blog_id; 

        const blog = await blogSchema.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

       
        await commentSchema.deleteOne({ _id: commentId });

        
        blog.comments.pull(commentId);

        await blog.save();

        return res.status(200).json({
            success: true,
            message: "Comment successfully deleted"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
