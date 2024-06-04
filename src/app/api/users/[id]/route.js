import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../../lib/dbConnect";
import Users from "../../../../models/Users";

export async function GET(request, params) {
  await dbConnect();

  const userID = params.params.id;
  console.log("USER ID: ", userID);

  try {
    const userDet = await Users.find({ _id: userID });

    return NextResponse.status(200).json({
      success: true,
      data: userDet,
      message: "successful",
    });
  } catch (error) {
    return NextResponse.status(400).json({ success: false });
  }
}
