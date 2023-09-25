const blogSchema = require('../../models/blog');

exports.searchByTags = async (req, res) => {
    try {
        const { tags } = req.body;
        
        if (!tags) {
            return res.status(400).json({
                success: false,
                message: "Tags parameter is missing"
            });
        }
        
        
        
        const tagsArray = tags.split(',');
        
        const blogs = await blogSchema.find({ tags: { $in: tagsArray } });
        
        if(blogs){
        return res.status(200).json({
            success: true,
            message: "Blogs found by tags",
            blogs: blogs
        });

    }
    
    return res.status(400).json({
        success: false,
        message: "Blogs not found with this tags",
        
    });



    } 
    catch (error) {

        console.log("This is the error:", error);
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};
