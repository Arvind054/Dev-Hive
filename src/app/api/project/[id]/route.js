import { connectDB } from "@/model/mongodb";
import Project from "@/model/projectSchema";
import User from "@/model/userSchema";
import { NextResponse } from 'next/server';
// Get project by ID
export async function GET(request, { params }) {
    try {
        await connectDB();
        if (!params.id) {
            return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
        }
        const project = await Project.findById(params.id);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }
}

//Update Project By Id
export async function PUT(request, { params }) {
    try {
        await connectDB();
        if(!params.id) {
            return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
        }
        const project = await Project.findById(params.id);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        const data = await request.json();
        if (!data || !data.title || !data.description || !data.userEmail) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }
        project.title = data.title;
        project.description = data.description;
        project.imageUrl = data.imageUrl;
        project.tags = data.tags;
        project.userEmail = data.userEmail;
        await project.save();
        return NextResponse.json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }
}

// Delete a Project by Id
export async function DELETE(request, {params}){
    const {id} = params;
    try{
        if(!id){
            return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
        }
        const project = await Project.findById(id);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        const user = await User.findOne({ email: project.userEmail });
        if (user) {
            user.projects = user.projects.filter(projectId => projectId.toString() !== id);
            await user.save();
        }
        await Project.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Project deleted successfully' });
    }catch(error){
        console.error("Database connection error:", error);
        return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }
}
