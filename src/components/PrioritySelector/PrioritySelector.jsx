import React, { useState } from "react";
import { Icons } from "react-toastify";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./PrioritySelector.module.css";

export default function PrioritySelector() {
  const { note, setNote } = useNote();
  const [showForm, setShowForm] = useState(false);

  const priorities = [
    { title: "Low", value: 3, color: `var(--component-green-01)` },
    { title: "Medium", value: 2, color: `var(--component-orange-01)` },
    { title: "High", value: 1, color: `var(--component-red-01)` },
  ];

  const clickHandler = () => {
    setShowForm((prev) => !prev);
  };
  return (
    <div className={`${styles.ColorPallete} flex-row-wrap box-shadow`}>
      <div
        className={`${styles.pallete_selector} ${
          !showForm ? styles.showSelector : styles.hideSelector
        } flex-row-wrap `}
      >
        <div
          className="btn_action btn btn--small"
          style={
            showForm
              ? { backgroundColor: `var(--component-blue-02)` }
              : { backgroundColor: `var(--CARD_BG)` }
          }
          onClick={clickHandler}
        >
          <span className="material-icons">priority_high</span>
        </div>
        {priorities.map((priority) => {
          return (
            <div
              key={priority.title}
              className={`${styles.priority}  flex-mid-center ${
                showForm ? styles.showPriorities : styles.hidePriorities
              }`}
              style={{
                backgroundColor: priority.color,
              }}
              onClick={() => {
                setNote({ ...note, priority: priority.value });
              }}
            >
              <span
                className={`${styles.active} ${
                  note.priority === priority.value
                    ? styles.showTick
                    : styles.hideTick
                } material-icons`}
              >
                check
              </span>

              {priority.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
