import { AuthorSchema } from "@/schemas/author";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary/lib/cloudinary";


export async function POST(req) {
    const data =await req.json();
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING)
    // const existingUser = await AuthorSchema.findOne({email:data.email})
    // if(existingUser){
    //     console.log("Author already enrolled..!!");
    //     return NextResponse.json({existingUser,success:false})     
    // }
    const user = new AuthorSchema(data)
    let created = user.save()
    
    return NextResponse.json({created, success:true})
}

export async function GET() {
    let author=[]
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING);
        author = await AuthorSchema.find();
    } catch (error) {
        console.log("Fail to fetch details", error);

    }
    return NextResponse.json({ result: author, success: true });
}

export async function DELETE(req) {
    const { id } = await req.json();
   // console.log("id in route is: ", id);
    const record = { _id: id }
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING);
    let data = await AuthorSchema.findByIdAndDelete(record);
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