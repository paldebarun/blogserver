const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    imageurl: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        default: ""
    },
    pseudonym:{
        type:String,
        default:""
    },
    job: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    likesCount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "like"
    }],
    bio: {
        type: String,
        default: ""
    }
});


module.exports = mongoose.model('Profile', profileSchema);
