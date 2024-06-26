import { loadStripe } from "@stripe/stripe-js";

export async function CheckoutRedirect({ lineItems }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}/CheckoutSuccess?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/stripe2`,
  });
}
