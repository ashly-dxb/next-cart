"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// import styles from "../../container.module.css";

import { CARD_OPTIONS } from "../components/StripeCard";

import {
  useStripe,
  useElements,
  // PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const [isProcessing, setProcessingTo] = useState(false);

  const [emailInput, setEmailInput] = useState("ashlythomas@gmail.com");
  const [errorMessage, setErrorMessage] = useState("");

  // const backendUrl = process.env.NEXT_PUBLIC_STRIPE_URL;

  const handleCardDetailsChange = (event) => {
    event.error ? setErrorMessage(event.error.message) : setErrorMessage();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null || stripe == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const submitError = await elements.submit();

    if (submitError?.message) {
      setErrorMessage(submitError.message); // Show error to customer
      return;
    }

    const price = 17500; // in paisa/phils/cents

    const cardElement = elements.getElement("card");

    setProcessingTo(true);

    // Create a PaymentIntent and obtain clientSecret from the server endpoint
    const response = await fetch("/api/stripepay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "aed",
        amount: price * 10,
        paymentMethodType: "card",
        email: emailInput,
      }),
    });

    const resultJson = await response.json();

    const clientSecret = resultJson.clientSecret;
    console.log("clientSecret: ", clientSecret);

    const billingDetails = {
      name: "Margeritta Filonika",
      email: "mgtflk@gmail.com",
      address: {
        city: "Dubai",
        country: "AE",
      },
    };

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });

    if (paymentMethodReq.error) {
      setErrorMessage(paymentMethodReq.error.message);
      setProcessingTo(false);
      return;
    }

    // const { error } = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: paymentMethodReq.paymentMethod.id,
    // });

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });

    if (error) {
      // This point will only be reached if there is an immediate error when confirming the payment.
      // Show error to customer (EX, payment details incomplete)
      setErrorMessage(error.message);
      setProcessingTo(false);
    } else {
      router.push("/CheckoutSuccess");
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div className=" py-10 px-5 m-auto w-full mt-10 border border-purple-500 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-100">
          <label htmlFor="email_id">Email</label>
          <input
            type="email"
            id="email_id"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Your Email"
            className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-400 focus:outline-blue-500"
            autoComplete="off"
          />
        </div>

        {/* <PaymentElement /> */}

        <div className="max-w-2xl m-auto mb-8 mt-4 border border-blue-500">
          <h3 className="mb-4 text-red">Card Information</h3>
          <CardElement
            options={CARD_OPTIONS}
            id="card-element"
            className="myCardInput"
            onChange={handleCardDetailsChange}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || !elements || isProcessing}
          className="mt-5 py-3 px-6 bg-green-500 text-white font-bold sm:w-100"
        >
          {isProcessing ? "Processing..." : `Pay AED 1750`}
        </button>

        {/* Show error message to your customers */}

        {errorMessage && (
          <div className="mt-7 py-3 px-2 bg-red-700 text-white">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};
