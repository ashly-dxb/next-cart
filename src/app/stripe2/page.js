"use client";
import { CheckoutRedirect } from "../components/CheckoutRedirect";

import styles from "../../container.module.css";
import Layout from "../components/MyLayout";

export default function Home() {
  return (
    <Layout>
      <div
        className={`max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer} border-2`}
      >
        <div className="max-w-2xl m-auto mb-8 mt-4">
          <h3 className={`${styles.pageHeading} text-2xl`}>
            {"Stripe Payment: External"}
          </h3>
        </div>

        <div className="my-5 p-3 flex flex-col items-center rounded-md">
          <button
            className={styles.button}
            onClick={() => {
              CheckoutRedirect({
                lineItems: [
                  { price: "price_1PNXFwGVxy3awU0N9L81Fe3e", quantity: 2 },
                  { price: "price_1PCihkGVxy3awU0Ntbhxm1uL", quantity: 3 },
                ],
              });
            }}
          >
            Buy
          </button>
        </div>
      </div>
    </Layout>
  );
}
