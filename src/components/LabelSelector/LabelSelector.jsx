import React from "react";
import { useState } from "react";
import styles from "./LabelSelector.module.css";
import { useNote } from "../../contexts/Note/NoteContext";

export default function LabelSelector() {
  const [label, setlabel] = useState("");
  const [showForm, setShowForm] = useState(true);
  const { note, setNote } = useNote();

  const taglist = [
    {
      title: "Todo",
      color: "var(--component-blue-01)",
    },
    {
      title: "Work",
      color: "var(--component-green-01)",
    },
    {
      title: "Chore",
      color: "var(--component-yellow-01)",
    },
    {
      title: "Shopping",
      color: "var(--component-pink-01)",
    },
  ];
  const clickHandler = (e) => {
    setShowForm((prev) => !prev);
  };

  const labelHandler = (tag) => {
    const addLabel = note?.label?.includes(tag.title);
    const removeLabel = note?.label?.filter((item) => item !== tag.title);
    const filteredLabels = addLabel
      ? { ...note, label: removeLabel }
      : { ...note, label: [tag.title] };
    setNote(filteredLabels);
    setlabel("");
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
        onClick={(e) => clickHandler(e)}
      >
        <span className="material-icons">label</span>
      </div>
      {taglist.map((tag) => (
        <button
          key={tag.title}
          onClick={() => labelHandler(tag)}
          style={{ backgroundColor: tag.color }}
          className={`${styles.add_label} ${
            !showForm ? styles.showInput : styles.hideInput
          } btn btn_action btn--small flex-mid-center`}
        >
          <span className={`material-icons ${styles.label_icon}`}>
            {note.label.includes(tag.title) ? `done` : ""}
          </span>
          {tag.title}
        </button>
      ))}
    </div>
  );
}
