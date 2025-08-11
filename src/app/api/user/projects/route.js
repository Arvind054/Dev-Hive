import { NextResponse } from 'next/server';
import User from '@/model/userSchema';
import Project from '@/model/projectSchema';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) {
    return NextResponse.json({ error: 'Email is Missing' }, { status: 400 });
  }
  const user = await User.findOne({ email: email }).populate('projects');
  return NextResponse.json({ data: user.projects });
}