import React, { useState } from "react";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./ColorPallete.module.css";
import { pallete } from "../../utils/Constants";

export default function ColorPallete() {
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
    if (showLabel || showPriority) {
      setShowPriority(false);
      setShowLabel(false);
      setShowColor((prev) => !prev);
    } else {
      setShowColor((prev) => !prev);
    }
  };
  return (
    <div className={`${styles.ColorPallete} flex-row-wrap box-shadow`}>
      <div
        className={`${styles.pallete_selector} ${
          !showColor ? styles.showSelector : styles.hideSelector
        } flex-row-wrap `}
      >
        <div
          className="btn_action btn btn--small"
          style={
            showColor
              ? { backgroundColor: `var(--component-orange-02)` }
              : { backgroundColor: `var(--CARD_BG)` }
          }
          onClick={clickHandler}
        >
          <span className="material-icons">color_lens</span>
        </div>
        {pallete.map((color) => {
          return (
            <span
              key={color.title}
              className={`${styles.color}  flex-mid-center ${
                showColor ? styles.showPallete : styles.hidePallete
              } material-icons`}
              style={{
                backgroundColor: color.value,
                border:
                  color.value === `var(--white)` &&
                  `2px solid var(--component-grey-02)`,
              }}
              onClick={() => {
                setNote({ ...note, color: color.value });
              }}
            >
              {note.color === color.value ? `done` : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
}
