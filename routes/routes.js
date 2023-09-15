const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/signup'); 
const { login } = require('../controllers/login');   
const {auth}=require('../controllers/auth');
const {fetchprofiledata}=require('../controllers/profileHandlers/fetchprofiledata')
const {updateProfile}=require('../controllers/profileHandlers/updateProfile');
const {imageUpload}=require('../controllers/imageHandlers/uploadtocloudinary');
const {createblog}=require('../controllers/blogsHandlers/createBlog');
const {searchByCategory}=require('../controllers/blogsHandlers/searchbycategory');
const {searchByTags} =require('../controllers/blogsHandlers/searchbytags');
const {fetchuserblogs}=require('../controllers/blogsHandlers/fetchuserBlogs');
const {fetchAllblogs}=require('../controllers/blogsHandlers/fetchallBlogs');
const {deleteblog}=require('../controllers/blogsHandlers/deleteblog');
const {generateotp}=require('../controllers/OTPhandlers/generateotp');
const {checkOtp}=require('../controllers/OTPhandlers/checkotp');
const {addcomments}=require('../controllers/commenthandler/addcomment');
const {addlikes}=require('../controllers/likehandlers/addlike');
const {removelike}=require('../controllers/likehandlers/unlike');
const {deleteComment}=require('../controllers/commenthandler/uncomment');
const {fetchblogcomments}=require('../controllers/commenthandler/blogcomments');
const {checkLike}=require('../controllers/likehandlers/checklike');
const {fetchuser}=require('../controllers/userhandler/fetchuser')
const {fetchBlogLikesauthernames}=require('../controllers/likehandlers/fetchbloglikes');


router.post('/signup', signup);
router.post('/login', login);
router.get('/auth',auth);
router.get('/fetchprofile/:email',fetchprofiledata);
router.post('/updateProfile',updateProfile);
router.post('/uploadPhoto',imageUpload);
router.post('/createblog',createblog);
router.get('/search/:category', searchByCategory);
router.get('/search', searchByTags);
router.get('/userblogs/:email',fetchuserblogs);
router.get('/fetchallblogs',fetchAllblogs);
router.post('/deleteBlog',deleteblog);
router.post('/sendOtp',generateotp);
router.post('/checkotp',checkOtp);
router.post('/addcomment',addcomments);
router.post('/like',addlikes);
router.post('/unlike',removelike);
router.post('/uncomment/:commentId/:userEmail',deleteComment);
router.get('/fetchcomments/:blogid',fetchblogcomments);
router.post('/checklike',checkLike);
router.post('/fetchuser',fetchuser);
router.post('/fetchlikesauthernames',fetchBlogLikesauthernames);




module.exports = { router }; 