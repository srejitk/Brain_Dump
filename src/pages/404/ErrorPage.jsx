import React from "react";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={`flex-mid-center full-width ${styles.errorImg}`}>
      <img
        src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1650481710/Brain%20Dump/404_error_with_portals-cuate_yu2jne.svg"
        alt="404 Page"
      />
    </div>
  );
}
