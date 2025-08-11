import { NextResponse } from 'next/server';

export async function GET(request) {
  const {searchParams} = new URL(request.url);
  const email = searchParams.get('email');
  if(!email){
    return NextResponse.json({ error: 'Email is Missing'}, { status: 400 });
  }
  const user = await User.create({email: email});
  await user.save();
  return NextResponse.json({ message: 'Login Successful' });
}