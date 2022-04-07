import React from "react";
import { Trash } from "../../components";
import styles from "./TrashPage.module.css";

export default function TrashPage() {
  return (
    <div
      className={`${styles.trashpage_container} content flex-column-wrap flex-mid-center `}
    >
      <Trash />
    </div>
  );
}
