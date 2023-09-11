const Blog=require('../../models/blog');



exports.deleteblog = async (req, res) => {
    try {
        const { id } = req.body; 

        const deleteblogbyid = await Blog.findOneAndDelete({ _id: id });
    
        if (deleteblogbyid) {
          return res.status(200).json({
            success: true,
            message: "The blog is deleted",
          });
        }
    
        return res.status(400).json({
          success: false,
          message: "The deletion of the blog is unsuccessful",
        });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "An error occurred",
      });
    }
  };
  