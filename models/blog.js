const mongoose=require('mongoose');


const blogSchema=new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    heading:{
        type:String,
        require:true
    },
    auther:{
        type:String,
        require:true
    },

    content:{
        type:String,
        require:true
    },
     
    tags:[{
        type:String,
        require:true
    }],
    category:{
        type:String,
        require:true
    },
    comments:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'commentSchema'
    }],

    likes:[ { type:mongoose.Schema.Types.ObjectId,
        ref:'likesSchema'
     }],

    date:{
        type:Date,
        default:Date.now()
    }

});





module.exports=mongoose.model('blogSchema',blogSchema);