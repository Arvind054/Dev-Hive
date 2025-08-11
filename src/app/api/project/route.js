import Project from '@model/projectSchema'
import { connectDB } from '@/model/mongodb'
import { NextResponse } from 'next/server';
export async function GET(request){
    try{
        await connectDB();
        const projects  = await Project.find({}).sort({createdAt: -1});
        return NextResponse.json(projects);
    }catch(error){
        console.error("Database connection error:", error);
        return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }
}