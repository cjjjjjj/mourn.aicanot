import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const expectedUsername = process.env.ADMIN_USERNAME || "mourn";
    const expectedPassword = process.env.ADMIN_PASSWORD || "tA4$mQ9#kP2!zX8*";

    if (username === expectedUsername && password === expectedPassword) {
      // Create response and set cookie
      const response = NextResponse.json({ success: true, message: "Login successful" });
      
      // Set a session cookie
      response.cookies.set({
        name: "admin_session",
        value: "authenticated_token_secure_mourn",
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 2, // 2 hours
      });

      return response;
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// Support logout
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.set({
    name: "admin_session",
    value: "",
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  return response;
}
