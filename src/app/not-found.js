"use client";
import styles from "../container.module.css";

export default function NotFound() {
  return (
    <div
      className={`flex-fill d-flex align-items-center bg-dark text-white row`}
    >
      <div className={`container-fluid text-center ${styles.footerBackground}`}>
        <div className="mb-5 pt-5">
          <h2>404 - Page Not Found</h2>
          <br />
          Please check the URL !!!!!
        </div>
      </div>
    </div>
  );
}
