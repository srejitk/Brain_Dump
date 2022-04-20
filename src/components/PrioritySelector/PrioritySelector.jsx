import React from "react";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./PrioritySelector.module.css";
import { priorities } from "../../utils/Constants";

export default function PrioritySelector() {
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
    if (showLabel || showColor) {
      setShowColor(false);
      setShowLabel(false);
      setShowPriority((prev) => !prev);
    } else {
      setShowPriority((prev) => !prev);
    }
  };
  return (
    <div className={`${styles.ColorPallete} flex-row-wrap box-shadow`}>
      <div
        className={`${styles.pallete_selector} ${
          !showPriority ? styles.showSelector : styles.hideSelector
        } flex-row-wrap `}
      >
        <div
          className="btn_action btn btn--small"
          style={
            showPriority
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
                showPriority ? styles.showPriorities : styles.hidePriorities
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
