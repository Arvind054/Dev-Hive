import { NextResponse } from "next/server";
import axios from "axios";
import User from '../../../../model/userSchema'
import { connectDB } from "@/model/mongodb";
export async function GET(request) {
  await connectDB();
  const authHeader = request.headers.get("authorization");
  console.log("authHeader is ", authHeader);

  if (!authHeader) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  // Extract raw token (remove "Bearer ")
  const token = authHeader.replace("Bearer ", "");

  try {
    // ✅ Use Authorization header (preferred way)
    const response = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const userData = response.data;
    const {email, name,picture} = userData;
    let user = await User.findOne({email:email});
    if(!user){
      user = await User.create({name: name, profileUrl:picture,email:email, })
    }
   console.log("User is ", user);
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.error("Google API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Unauthorized", details: error.response?.data },
      { status: 401 }
    );
  }
}
