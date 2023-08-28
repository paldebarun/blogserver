const Blog = require('../../models/blog');

exports.searchByTags = async (req, res) => {
    try {
        const { tags } = req.query;

        if (!tags) {
            return res.status(400).json({
                success: false,
                message: "Tags parameter is missing"
            });
        }

        const tagsArray = tags.split(',');

        const blogs = await Blog.find({ tags: { $in: tagsArray } });

        return res.status(200).json({
            success: true,
            message: "Blogs found by tags",
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
