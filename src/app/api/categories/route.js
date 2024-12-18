import { CategorySchema } from "@/schemas/category";
import mongoose from "mongoose";
import { NextResponse } from "next/server"
import cloudinary from "cloudinary/lib/cloudinary";

export async function POST(req) {
    const data = await req.json();
   // console.log("data in route: ", data);
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING);
    const category = new CategorySchema(data);
    const result = await category.save();
    return NextResponse.json({ result, success: true });
}
export async function GET() {
    let category, categoriesCount;

    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING);

        // Fetch all categories
        category = await CategorySchema.find();

        // Get the count of all categories
        categoriesCount = await CategorySchema.countDocuments();
        
    } catch (error) {
        console.log("Fail to fetch details", error);
        return NextResponse.json({ success: false, message: "Error fetching data" });
    }

    return NextResponse.json({ result: category, count: categoriesCount, success: true });
}

export async function DELETE(req) {
    const { id } = await req.json();
   // console.log("id in route is: ", id);
    const record = { _id: id }
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING);
    let data = await CategorySchema.findByIdAndDelete(record);
   // console.log("The public id is: ", data.public_id);
    let public_id = data.public_id

    cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SEGRET
    });
    cloudinary.v2.uploader.destroy(public_id, function (error, result) {
        console.log(result, error)
    })
        .then(resp => console.log(resp))
        .catch(_err => console.log("Something went wrong, please try again later."));

    return NextResponse.json({ id, success: true })

}