import { NextResponse } from "next/server";
import { connectDB } from "@/model/mongodb";
import Project from "@/model/projectSchema";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // <- fixed (was wrong)
});

// Function to uplaod the Buffer
function uploadFromBuffer(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

/**
 * Helper: upload a base64/dataURI directly via cloudinary.uploader.upload
 * Cloudinary accepts a data URI like: data:image/png;base64,....
 */
async function uploadFromDataURI(dataUri, options = {}) {
  return cloudinary.uploader.upload(dataUri, options);
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const data = body?.data;

    if (!data || !data.title || !data.description || !data.imagePreview) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // convert tage to array
    const tags = Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []);
     
    //Image Preview
    const preview = data.imagePreview;
    let uploadResult;

    if (typeof preview === "string") {
      if (preview.startsWith("data:") && preview.includes("base64,")) {
        uploadResult = await uploadFromDataURI(preview, {folder: "Dev-Hive"});
      } else {
        const assumedMime = data.imageMime || "image/jpeg";
        const dataUri = `data:${assumedMime};base64,${preview}`;
        uploadResult = await uploadFromDataURI(dataUri, {folder: "Dev-Hive"});
      }
    } else if (preview instanceof ArrayBuffer || Buffer.isBuffer(preview)) {
      const buffer = Buffer.isBuffer(preview) ? preview : Buffer.from(preview);
      uploadResult = await uploadFromBuffer(buffer, cloudOptions);
    } else if (preview?.data && Array.isArray(preview.data)) {
      const buffer = Buffer.from(preview.data);
      uploadResult = await uploadFromBuffer(buffer, cloudOptions);
    } else {
      return NextResponse.json({ error: "Unsupported imagePreview format" }, { status: 400 });
    }

    // create the new Project
    const newProject = new Project({
      title: data.title,
      description: data.description,
      imageUrl: uploadResult.secure_url,
      tags,
      userEmail: data.userEmail || "ArvindChoudhary@gmail.com",
    });
    await newProject.save();
    return NextResponse.json({ message: "Project created successfully", project: newProject }, { status: 201 });
  } catch (error) {
    console.error("Database / upload error:", error);
    const message = error?.message || "Internal server error";
    const status = error?.http_code || 500;
    return NextResponse.json({ error: message }, { status });
  }
}
