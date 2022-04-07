import React from "react";
import { useState } from "react";
import styles from "./LabelSelector.module.css";
import { useNote } from "../../contexts/Note/NoteContext";

export default function LabelSelector() {
  const [label, setlabel] = useState("");
  const { note, setNote } = useNote();

  return (
    <div className={`$flex-row-wrap  box-shadow ${styles.labelSelector}`}>
      <input
        type="text"
        className={styles.labelInput}
        onChange={(e) => setlabel(e.target.value)}
        value={label}
        placeholder="New Label"
      />
      <button
        onClick={() => {
          setNote({ ...note, label: [label] });
          setlabel("");
        }}
        className={`${styles.add_label} flex-mid-center`}
      >
        +
      </button>
    </div>
  );
}
