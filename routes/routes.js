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
module.exports = { router }; 