const  mongoose  = require("mongoose");
const newCategory = new mongoose.Schema({
    name : String,
    slug : String,
    url : String,
    public_id : String,
})

export const CategorySchema = mongoose.model.category || mongoose.model('category',newCategory)