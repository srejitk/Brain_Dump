import React from "react";
import { useState } from "react";
import styles from "./LabelSelector.module.css";
import { useNote } from "../../contexts/Note/NoteContext";
import { taglist } from "../../utils/Constants";

export default function LabelSelector() {
  const [label, setlabel] = useState("");
  const {
    note,
    setNote,
    showLabel,
    setShowLabel,
    showPriority,
    setShowPriority,
    showColor,
    setShowColor,
  } = useNote();

  const clickHandler = (e) => {
    if (showColor || showPriority) {
      setShowColor(false);
      setShowPriority(false);
      setShowLabel((prev) => !prev);
    } else {
      setShowLabel((prev) => !prev);
    }
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
        showLabel ? styles.hideSelector : styles.showSelector
      }  box-shadow ${styles.labelSelector}`}
    >
      <div
        className="btn_action btn btn--small"
        style={
          showLabel
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
            showLabel ? styles.showInput : styles.hideInput
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
