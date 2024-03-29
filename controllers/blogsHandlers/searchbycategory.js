const  blogSchema = require('../../models/blog');

exports.searchByCategory = async (req, res) => {
    try {
        const { category } = req.body;


        console.log(category);

        const categoryArray= category.split(',');
        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category parameter is missing"
            });
        }

        const blogs = await blogSchema.find({ category:{$in :categoryArray}});
        console.log(blogs);
        return res.status(200).json({
            success: true,
            message: "Blogs found by category",
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
