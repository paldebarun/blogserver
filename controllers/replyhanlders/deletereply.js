const replySchema=require('../../models/reply');
const commentschema=require('../../models/comments');

exports.deletereply = async (req, res) => {
  try {
    const { replyId, commentId } = req.body;

    
    const deletedReply = await replySchema.findByIdAndDelete(replyId);

    if (!deletedReply) {
      return res.status(404).json({
        success: false,
        message: 'Reply not found or already deleted.',
      });
    }

    const comment = await commentschema.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found.',
      });
    }

    comment.replies = comment.replies.filter((reply) => reply.toString() !== replyId);

   
    await comment.save();

    return res.status(200).json({
      success: true,
      message: 'Reply deleted successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};
