import React from "react";
import { Archive } from "../../components";
import styles from "./ArchivePage.module.css";

export default function ArchivePage() {
  return (
    <div
      className={`${styles.archive_container} content flex-column-wrap flex-mid-center `}
    >
      <Archive />
    </div>
  );
}
