import { NextResponse } from "next/server";
import { connectDB } from "@/model/mongodb";
import Project from "@/model/projectSchema"; 

// Create a new project
export async function POST(request){
    try{
        await connectDB();
         const data = await request.json();
         if(!data || !data.title || !data.description || !data.userEmail){
             return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
         }
      const newProject = new Project({
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        tags: data.tags,
        userEmail: data.userEmail
    });
    await newProject.save();
    return NextResponse.json({ message: 'Project created successfully' });
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }
}