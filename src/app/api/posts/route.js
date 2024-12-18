import { PostSchema } from "@/schemas/posts";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary/lib/cloudinary";


export  async function POST(req) {
    const data =await req.json();
    console.log("the post data is; ",data);
    
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING)
    // const existingUser = await UserSchema.findOne({email:data.email})
    // if(existingUser){
    //     console.log("user already exists");
    //     return NextResponse.json({existingUser,success:true})
        
    // }
    const post = new PostSchema(data)
    let created = post.save()
    
    return NextResponse.json({created, success:true})
}

export async function GET() {
    let posts,postCount
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING);
        posts = await PostSchema.find();

        postCount = await PostSchema.countDocuments()
    } catch (error) {
        console.log("Fail to fetch posts", error);

    }
    return NextResponse.json({ result: posts,count:postCount, success: true });
}

export async function DELETE(req) {
    const { id } = await req.json();
   // console.log("id in route is: ", id);
    const record = { _id: id }
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING);
    let data = await PostSchema.findByIdAndDelete(record);
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