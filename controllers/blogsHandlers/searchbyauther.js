const  blogSchema = require('../../models/blog');

exports.searchByAutherName = async (req, res) => {
    try {
        const { auther } = req.body;
        console.log(auther);
        if (!auther) {
            return res.status(400).json({
                success: false,
                message: "auther parameter is missing"
            });
        }
        const autherArray= auther.split(',');
        const blogs = await blogSchema.find({ auther  :{ $in:autherArray} });
        console.log(blogs);
        return res.status(200).json({
            success: true,
            message: "Blogs found by auther name",
            blogs: blogs
        });
    } catch (error) {
        console.log("This is the error:", error);
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};
