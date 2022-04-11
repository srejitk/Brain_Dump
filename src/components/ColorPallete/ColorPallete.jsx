import React from "react";
import { useNote } from "../../contexts/Note/NoteContext";
import { noteReducer } from "../../contexts/Note/NoteReducer";
import styles from "./ColorPallete.module.css";

export default function ColorPallete() {
  const { note, setNote } = useNote();
  const pallete = [
    `var(--white)`,
    `var(--component-blue-02)`,
    `var(--component-red-03)`,
    `var(--component-green-02)`,
    `var(--component-yellow-04)`,
  ];
  return (
    <div className={`${styles.ColorPallete} flex-row-wrap box-shadow`}>
      <div className={`${styles.pallete_selector} flex-row-wrap `}>
        {pallete.map((color) => {
          return (
            <span
              key={color}
              className={styles.color}
              style={{
                backgroundColor: color,
                border:
                  color === `var(--white)` &&
                  `2px solid var(--component-grey-02)`,
              }}
              onClick={() => {
                setNote({ ...note, color: color });
              }}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
