import prismadb from "@/app/libs/prismadb";
import { SignupSchema } from "@/app/schemas/validations";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
export const POST = async (req: NextRequest, res: NextResponse)=>{
    const data = await req.json();
    const validatedData = SignupSchema.safeParse(data);
    if(!validatedData?.success){
        return NextResponse.json({
            message: 'Invalid fields'
        }, {status: 201});
    }
    try{
        const {username, password, email} = validatedData.data;
        const passwordHash = await bcryptjs.hash(password, 16);
        const response = await prismadb.user.create({
            data: {
                username: username,
                passwordHash: passwordHash,
                email: email
            }
        });
        if(response?.id){
            return NextResponse.json({
                message: "User created, success",
            }, {status: 200});
        }else{
            return NextResponse.json({
                message: "Can't create user, database error"
            }, {status: 501});
        }
    }catch(error){
        return NextResponse.json({
            message: "Can't create user, server error"
        }, {status: 500});
    }
}