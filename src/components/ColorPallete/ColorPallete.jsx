import React, { useState } from "react";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./ColorPallete.module.css";

export default function ColorPallete() {
  const { note, setNote } = useNote();
  const [showForm, setShowForm] = useState(false);

  const pallete = [
    `var(--white)`,
    `var(--component-blue-02)`,
    `var(--component-red-03)`,
    `var(--component-green-02)`,
    `var(--component-yellow-04)`,
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
              key={color}
              className={`${styles.color}  flex-mid-center ${
                showForm ? styles.showPallete : styles.hidePallete
              } material-icons`}
              style={{
                backgroundColor: color,
                border:
                  color === `var(--white)` &&
                  `2px solid var(--component-grey-02)`,
              }}
              onClick={() => {
                setNote({ ...note, color: color });
              }}
            >
              {note.color === color ? `done` : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
}
