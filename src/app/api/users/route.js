import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/Users";
import sendEmail from "../../../lib/sendEmail";
import bcryptjs from "bcryptjs";
// import { redirect } from "next/navigation";

export async function GET() {
  await dbConnect();

  try {
    const users = await Users.find({}).sort({ createdDate: -1 });
    const rowCount = users.length;

    return NextResponse.json({
      success: true,
      message: "Successful",
      data: users,
      rowCount: rowCount,
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function POST(request) {
  await dbConnect();
  const req = await request.json();

  try {
    const { username, email, password } = req;
    const user = await Users.findOne({ email });
    if (user) {
      return NextResponse.json({
        success: false,
        message: "The email is already existing",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const userID = savedUser._id;
    // const userID2 = userID.toString();

    // send verification email
    const mailResp = await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id.toString(),
    });

    return NextResponse.json({
      message: "New User Created",
      success: true,
      mailStatus: mailResp,
      savedUser,
    });

    // const newUser = await Users.create(req);
    // return NextResponse.json({ success: true, data: newUser });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

export async function DELETE(request) {
  await dbConnect();

  const req = await request.json();
  const userID = req.user_id;

  try {
    const user = await Users.deleteOne({ _id: userID });
    return NextResponse.json({
      message: "User Deleted",
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
