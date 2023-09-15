const blogSchema=require('../../models/blog');
const commentSchema = require('../../models/comments');

exports.fetchblogcomments = async (req, res) => {
    try {
        const blog_id = req.params.blogid;
        const blog = await blogSchema.findById(blog_id);

        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "The blog is not found"
            });
        }

        
       

        const blogcommentsid = blog.comments;

        const comments = await commentSchema.find({ _id: { $in: blogcommentsid } });



        return res.status(200).json({
            success: true,
            comments: comments
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
