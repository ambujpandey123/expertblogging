import mongoose from "mongoose";
import { UserSchema } from "@/schemas/user";
import { AuthorSchema } from "@/schemas/author";
import { CategorySchema } from "@/schemas/category";
import { PostSchema } from "@/schemas/posts";
import { NextResponse } from "next/server";


export async function GET() {
     let userCount,authorCount,categoriesCount,postCount
     try {
         await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING)
         userCount = await UserSchema.countDocuments()
         authorCount = await  AuthorSchema.countDocuments()
         categoriesCount = await  CategorySchema.countDocuments()
         postCount = await PostSchema.countDocuments()
        
     } catch (error) {
        console.log("error calculating the count",error);
        
     }
     let count = {
        userCount : userCount,
        authorCount : authorCount,
        categoriesCount : categoriesCount,
        postCount : postCount,
     }
     return NextResponse.json({count, success: true})
}