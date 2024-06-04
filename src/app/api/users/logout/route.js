import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../../lib/dbConnect";

export async function GET(request) {
  await dbConnect();

  // const req = await request.json();

  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
