const mongoose = require('mongoose');
const UserSchema = require('../../models/user');
const Blog = require('../../models/blog');

exports.fetchuserblogs = async (req, res) => {
    try {
       const { email } = req.params;
   
       console.log(email);

       if (email) {
           const findUser = await UserSchema.findOne({ email });
          
           if (findUser) {
               const blogReferences = findUser.blogs; // Array of ObjectIds
               console.log(blogReferences);

               const blogArray = await Blog.find({ _id: { $in: blogReferences } });
              
               return res.status(200).json({
                  success: true,
                  message: "The blogs are fetched",
                  blogs: blogArray
               });
           } else {
               return res.status(404).json({
                   success: false,
                   message: "User not found"
               });
           }
       } else {
           return res.status(400).json({
               success: false,
               message: "The email is not present"
           });
       }
    } catch (error) {
       res.status(400).json({
          success: false,
          message: "There was an error in fetching user blogs"
       });
    }
};
