const mongoose = require("mongoose");
const newPost = new mongoose.Schema({
    name: String,
    email: String,
    bio: String,
    category: String,
    author: String,
    blogtext: String,
    createdAt:   {
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    url: String,
    public_id: String,
})

export const PostSchema = mongoose.model.posts || mongoose.model('posts', newPost)