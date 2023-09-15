const likesSchema = require('../../models/likes');
const mongoose = require('mongoose');

exports.checkLike = async (req, res) => {
  try {
    const { blog_id, user_id } = req.body;

    
    if (!blog_id || !user_id) {
      return res.status(400).json({
        success: false,
        message: "Both blog_id and user_id are required"
      });
    }

    const blogId =new  mongoose.Types.ObjectId(blog_id);
    const userId =new  mongoose.Types.ObjectId(user_id);

    
    const existingLike = await likesSchema.findOne({ blog_id: blogId, user_id: userId });

    if (existingLike) {
      return res.status(200).json({
        success: true,
        liked: true 
      });
    }
     else {
      return res.status(200).json({
        success: true,
        liked: false
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
