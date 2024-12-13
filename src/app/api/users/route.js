import { UserSchema } from "@/schemas/user";
import mongoose from "mongoose";
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
    
    return NextResponse.json({created, success:true})
}