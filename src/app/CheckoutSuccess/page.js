"use client";
import { useEffect } from "react";

import styles from "../../container.module.css";
import Layout from "../components/MyLayout";

export default function CheckoutSuccess() {
  useEffect(() => {
    // console.log("in use effect:: ", process.env.NEXT_PUBLIC_STRIPE_PK);
  });

  return (
    <Layout>
      <div
        className={`max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer} border-2`}
      >
        <div className="max-w-2xl m-auto mb-8 mt-4">
          <h3 className={`${styles.pageHeading} text-2xl`}>
            {"Payment Success"}
          </h3>
        </div>

        <div className="my-5 p-3 flex flex-col items-center rounded-md">
          Successful Payment!
        </div>
      </div>
    </Layout>
  );
}
