"use client";
import { useEffect } from "react";

import styles from "../../container.module.css";
import Layout from "../components/MyLayout";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../components/CheckoutForm";

export default function Checkout() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

  const options = {
    mode: "payment",
    amount: 2500,
    currency: "aed",
    appearance: {},
  };

  useEffect(() => {
    // console.log("in use effect:: ", process.env.NEXT_PUBLIC_STRIPE_PK);
  });

  const getPrice = async () => {
    const response = await fetch("/api/stripeprice", {
      method: "POST",
    });

    const resultJson = await response.json();
    const list = await resultJson.prices.data;
    console.log("Price Data ::: ", list);
  };

  return (
    <Layout>
      <div
        className={`max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer} border-2`}
      >
        <div className="max-w-2xl m-auto mb-8 mt-4">
          <h3 className={`${styles.pageHeading} text-2xl`}>
            {"Stripe Payment: Internal"}
          </h3>
        </div>

        <div className="my-5 p-3 flex flex-col items-center w-100 border border-orange-500  rounded-md">
          <Elements
            stripe={stripePromise}
            options={options}
            className="my-5 p-3 flex flex-col items-center w-100 border border-yellow-500  rounded-md"
          >
            <CheckoutForm />
          </Elements>

          <button
            type="button"
            className="py-3 px-6 m-4 bg-purple-300 text-white font-bold w-full sm:w-100"
            onClick={getPrice}
          >
            Load Price List
          </button>
        </div>
      </div>
    </Layout>
  );
}
