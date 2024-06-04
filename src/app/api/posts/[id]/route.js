import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../../lib/dbConnect";
import Posts from "../../../../models/Posts";

export async function GET(request, params) {
  await dbConnect();

  const postID = params.params.id;
  console.log("POST ID: ", postID);

  try {
    const postDet = await Posts.find({ _id: postID });

    return NextResponse.json({
      success: true,
      data: postDet,
      msg: "successful",
    });
  } catch (error) {
    // res.status(400).json({ success: false });
    return NextResponse.json({ success: false });
  }
}
