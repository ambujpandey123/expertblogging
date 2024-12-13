import mongoose from "mongoose";
const newAuthor = new mongoose.Schema({
    name: String,
    email: String,
    bio: String,
    url: String,
    public_id: String,

})
export const AuthorSchema = mongoose.model.authors || mongoose.model("authors", newAuthor)