import { PostSchema } from "@/schemas/posts";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req,params) {
    const {postid} = await params.params
    let posts
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING);
        let record = {_id:postid}
        posts = await PostSchema.findById(record);
    } catch (error) {
        console.log("Fail to fetch posts", error);

    }
    return NextResponse.json({ result: posts, success: true });
}