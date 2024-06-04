import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../lib/dbConnect";
import Contacts from "../../../models/Contacts";

export async function GET() {
  await dbConnect();

  try {
    const contacts = await Contacts.find({}).sort({ createdDate: -1 });
    const rowCount = contacts.length;

    return NextResponse.json({
      success: true,
      message: "Successful",
      data: contacts,
      rowCount: rowCount,
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function POST(request) {
  await dbConnect();

  const req = await request.json();
  const { full_name, email, phone, subject, message } = req;

  const contReq = new Contacts({
    fullname: full_name,
    email,
    phone,
    subject,
    message,
  });

  try {
    const contactReq = await contReq.save();
    return NextResponse.json({
      message: "Request created successfully",
      success: true,
      contactReq,
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
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

    const post = await Contacts.updateOne(filter, updateDoc);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(request) {
  await dbConnect();

  const req = await request.json();
  const postID = req.post_id;

  try {
    const post = await Contacts.deleteOne({ _id: postID });
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
