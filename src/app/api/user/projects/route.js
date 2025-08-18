import { NextResponse } from 'next/server';
import User from '@/model/userSchema';
import Project from '@/model/projectSchema';
import { connectDB } from '@/model/mongodb';
export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  console.log("Email is ", email);
  if (!email) {
    return NextResponse.json({ error: 'Email is Missing' }, { status: 400 });
  }
  const projects = await Project.find({ userEmail: email });
  return NextResponse.json({ data: projects });
}