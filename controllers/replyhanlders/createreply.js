const replySchema = require('../../models/reply');
const commentSchema = require('../../models/comments');
const UserSchema = require('../../models/user'); // Import UserSchema
const mongoose = require('mongoose');

exports.createreply = async (req, res) => {
    try {
        const { user_id, body, comment_id } = req.body;

        const userid = new mongoose.Types.ObjectId(user_id);
        const user = await UserSchema.findById(userid); // Corrected the findById call

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const replyObj = new replySchema({
            user_id: userid, // Store the user_id as a mongoose ObjectId
            body,
            comment_id,
            authorName: user.authorName, // Fixed the typo here
        });

        const savedReply = await replyObj.save();

        if (!savedReply) {
            return res.status(404).json({
                success: false,
                message: "The reply couldn't be saved",
            });
        }

        const comment = await commentSchema.findById(comment_id);
        comment.replies.push(savedReply._id);
        await comment.save();

        return res.status(200).json({
            success: true,
            message: "The reply is successfully posted",
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "There was an error while creating the reply",
        });
    }
}
