const {Schema ,  model} = require("mongoose");
const CommentSchema = new Schema({
    title:{
        type:String,
       
    },
    body:{
        type:String,
        requiredd: true,
    },
    blogId:{
      type :Schema.Types.ObjectId,
      ref:"blog",
    },
    createdBy:{
    type :Schema.Types.ObjectId,
    ref:"user",
},
    content: {                
    type: String,
    required: true,
    },
},{timestamps:true});

const Comment = model("comment", CommentSchema);
module.exports = Comment;