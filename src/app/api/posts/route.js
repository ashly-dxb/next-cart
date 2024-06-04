import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../lib/dbConnect";
import Posts from "../../../models/Posts";
// import { redirect } from "next/navigation";

export async function GET() {
  await dbConnect();

  try {
    const posts = await Posts.find({}).sort({ createdDate: -1 });
    const rowCount = posts.length;

    return NextResponse.json({
      success: true,
      message: "Successful",
      data: posts,
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
    const newPost = await Posts.create(req);
    return NextResponse.json({ success: true, data: newPost });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
  // redirect(`/posts/ListPosts`); // Navigate to the listing page from ServerSide itself
}

export async function PUT(request) {
  await dbConnect();

  const req = await request.json();
  const postID = req.postID;

  try {
    const filter = { _id: postID };
    const updateDoc = {
      $set: {
        title: req.title,
        description: req.description,
      },
    };

    const post = await Posts.updateOne(filter, updateDoc);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
  // redirect(`/posts/ListPosts`); // Navigate to the listing page from ServerSide itself
}

export async function DELETE(request) {
  await dbConnect();

  const req = await request.json();
  const postID = req.post_id;

  try {
    const post = await Posts.deleteOne({ _id: postID });
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
  // redirect(`/posts/ListPosts`); // Navigate to the listing page from ServerSide itself
}
