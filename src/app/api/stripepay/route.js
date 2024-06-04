import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
  apiVersion: "2022-11-15",
});

export async function POST(request) {
  const req = await request.json();

  // console.log("POST:::: STARTED ::", req);

  try {
    const totalAmount = req.amount;
    // console.log("POST:::: Payment request ", totalAmount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "aed",
    });

    console.log("paymentIntent : ", paymentIntent);

    return NextResponse.json(
      { success: true, clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERR : ", error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
