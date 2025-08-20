import User from "@/model/userSchema";
import { connectDB } from "@/model/mongodb";
import { NextResponse } from "next/server";
export async function GET(){
    await connectDB();
   const authHeader = request.headers.get("authorization");
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
    if(!response){
        return NextResponse.json({ error: "token expired" }, { status: 401 });
    }
    const userData = response.data;
    const {email, name,picture} = userData;
    let user = await User.findOne({email:email});
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.error("Google API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Unauthorized", details: error.response?.data },
      { status: 401 }
    );
  }
}