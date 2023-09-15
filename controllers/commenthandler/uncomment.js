const commentSchema = require('../../models/comments');
const blogSchema = require('../../models/blog');
const UserSchema = require('../../models/user'); // Import your UserSchema model

exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId; // Assuming you pass commentId in the URL params
        const userEmail = req.params.userEmail; // Assuming you have user information with an email field
      
        // Find the user by their email to get their ID
        const user = await UserSchema.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Find the comment by its id
        const comment = await commentSchema.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        // Check if the user is the author of the comment
        if (comment.user_id.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment"
            });
        }

        // Find the associated blog
        const blogId = comment.blog_id; // Assuming your comment schema has a blog_id field

        const blog = await blogSchema.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // Remove the comment from the comments collection using deleteOne()
        await commentSchema.deleteOne({ _id: commentId });

        // Remove the comment's _id from the blog's comments array
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
