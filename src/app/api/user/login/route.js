import { NextResponse } from 'next/server';
import User from '@model/userSchema'
export async function GET(request) {
  const {searchParams} = new URL(request.url);
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const profileUrl = searchParams.get('profileUrl');

  if(!email){
    return NextResponse.json({ error: 'Email is Missing'}, { status: 400 });
  }
  const user = await User.create({name:name, email: email, profileUrl});
  await user.save();
  return NextResponse.json({ message: 'Login Successful' });
}