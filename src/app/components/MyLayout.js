"use client";
import Navbar from "./Navbar2";
import Footer from "./Footer";
import styles from "../../container.module.css";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const session = useSession();
  return (
    <div className={styles.outerBody}>
      <Navbar session={session} />
      <div className={styles.myContentArea} style={{ marginTop: "2px" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
