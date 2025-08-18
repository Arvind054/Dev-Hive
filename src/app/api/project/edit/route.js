import Project from '../../../../model/projectSchema'
import { connectDB } from "@/model/mongodb";
import { NextResponse } from "next/server";
export async function POST(request) {
    console.log("request received");
    try {
        connectDB();
        const body = await request.json();
        const data = body?.data;
        if (!data._id) {
            return NextResponse.json({ error: "Invalid Project Id" }, { status: 400 });
        }
        const project = await Project.findByIdAndUpdate(
            data._id,
            {
                title: data.title,
                description: data.description,
                tags: data.tags,
                liveLink: data.liveLink,
                codeLink: data.codeLink,
                userEmail: data.userEmail,
            },
            { new: true }
        );
        if (!project) {
            return NextResponse.json({ error: "Project Not Found" }, { status: 400 });
        }
        return NextResponse.json({ "message": "Project Updated" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
    }
}