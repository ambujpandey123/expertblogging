import { UserSchema } from "@/schemas/user";
import mongoose from "mongoose";
import { tree } from "next/dist/build/templates/app-page";
import { NextResponse } from "next/server";

export  async function POST(req) {
    const data =await req.json();
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING)
    const existingUser = await UserSchema.findOne({email:data.email})
    
    if(existingUser){
        console.log("user already exists");
        return NextResponse.json({existingUser,success:true})
        
    }
    const user = new UserSchema(data)
    let created = user.save()
    
    return NextResponse.json({created, success:true},{status:200})
}
export async function GET() {
     let user,userCount
     try {
         await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_STRING)
        userCount = await UserSchema.countDocuments()
        
     } catch (error) {
        console.log("error fetching user",error);
        
     }
     return NextResponse.json({count : userCount , success: true})
}