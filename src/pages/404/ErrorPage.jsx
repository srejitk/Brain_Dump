import React from "react";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div
      className={`flex-mid-center flex-column-wrap gap20 full-width ${styles.errorImg}`}
    >
      <img
        src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1650481710/Brain%20Dump/404_error_with_portals-cuate_yu2jne.svg"
        alt="404 Page"
      />
      <Link to="/">
        <button className="btn btn--primary">Go Home</button>
      </Link>
    </div>
  );
}
