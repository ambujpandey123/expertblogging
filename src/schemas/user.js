import mongoose from "mongoose";
const newUser = new mongoose.Schema({
    name: String,
    email: String,
    time: String,
    image: String, 
})
export const UserSchema = mongoose.model.users || mongoose.model("users", newUser)