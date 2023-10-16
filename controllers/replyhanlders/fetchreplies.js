const replySchema=require('../../models/reply');
const commentSchema = require('../../models/comments');
const mongoose=require('mongoose');

exports.fetchcommentreplies = async (req, res) => {
    try {
        const {comment_id} = req.body;
        console.log("blog id ", comment_id);
        const commentId = new mongoose.Types.ObjectId(comment_id);
        const comment = await commentSchema.findById(commentId);

        if (!comment) {
            return res.status(400).json({
                success: false,
                message: "The comment is not found"
            });
        }

        
       

        const commentreplyids = comment.replies;

        const replies = await replySchema.find({ _id: { $in: commentreplyids } });



        return res.status(200).json({
            success: true,
            replies: replies
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
