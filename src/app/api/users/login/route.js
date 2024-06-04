import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../../lib/dbConnect";
import Users from "../../../../models/Users";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getCookie, setCookie } from "cookies-next";

// import { redirect } from "next/navigation";

export async function POST(request) {
  await dbConnect();

  const req = await request.json();

  try {
    const { email, password } = req;
    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        success: false,
        message: "Invalid email/password",
      });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create a token with expiration of 1 day
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Set the token as an HTTP-only cookie
    // response.cookies.set("token", token, { httpOnly: true });
    // res.setHeader("Set-Cookie", cookie.serialize("token", token));

    // cookies.set("my_access_token", token, {
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 180), // 180 days
    //   httpOnly: false,
    //   secure: true,
    //   sameSite: "None",
    // });

    const cookieOpt = {
      // expires: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days
      maxAge: 180 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
      sameSite: "None",
    };

    setCookie("my_access_token", token, cookieOpt);

    console.log("COOKIES RETRIEVED :: ", getCookie("my_access_token"));

    return NextResponse.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
