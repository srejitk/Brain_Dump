import React from "react";
import { useState } from "react";
import styles from "./LabelSelector.module.css";
import { useNote } from "../../contexts/Note/NoteContext";

export default function LabelSelector() {
  const [label, setlabel] = useState("");
  const [showForm, setShowForm] = useState(true);
  const { note, setNote } = useNote();
  const clickHandler = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div
      className={`flex-row-wrap  ${
        showForm ? styles.showSelector : styles.hideSelector
      }  box-shadow ${styles.labelSelector}`}
    >
      <div
        className="btn_action btn btn--small"
        style={
          !showForm
            ? { backgroundColor: `var(--component-red-02)` }
            : { backgroundColor: `var(--CARD_BG)` }
        }
        onClick={clickHandler}
      >
        <span className="material-icons">label</span>
      </div>
      <input
        type="text"
        className={`${styles.labelInput} ${
          !showForm ? styles.showInput : styles.hideInput
        }`}
        onChange={(e) => setlabel(e.target.value)}
        value={label}
        placeholder="New Label"
      />
      <button
        onClick={() => {
          setNote({ ...note, label: [...note.label, label] });
          setlabel("");
        }}
        className={`${styles.add_label} ${
          !showForm ? styles.showInput : styles.hideInput
        } btn btn_action btn--small flex-mid-center`}
      >
        <span className="flex-mid-center material-icons">add</span>
      </button>
    </div>
  );
}
