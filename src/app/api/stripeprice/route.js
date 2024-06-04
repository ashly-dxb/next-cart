import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

export async function POST(request) {
  //   const req = await request.json();

  try {
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: totalAmount,
    //   currency: "aed",
    // });

    const prices = await stripe.prices.list();

    return NextResponse.json({ success: true, prices }, { status: 200 });
  } catch (error) {
    console.log("sssss");
    return NextResponse.json({ success: false, prices }, { status: 400 });
  }
}
