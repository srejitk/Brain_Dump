import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./TrashNote.module.css";

export default function TrashNote({ note }) {
  const { title, notes } = note;
  const [options, setOptions] = useState(false);
  const { noteState, setNote, noteDispatch, archiveNote, RestoreArchivedNote } =
    useNote();

  const { color, label, day, timestamp } = note;

  const deleteFromTrash = (note) => {
    noteDispatch({ type: "DELETE_FROM_TRASH", payload: note });
  };
  const optionsHandler = () => {
    setOptions((prev) => !prev);
  };

  return (
    <div
      className={`${styles.note} border-radius box-shadow position-relative`}
      style={{ backgroundColor: `${color}` }}
    >
      <div onClick={optionsHandler}>
        <span className={`position-absolute  ${styles.options} material-icons`}>
          more_horiz
        </span>
      </div>
      <div className={`${styles.note_content} flex-column-wrap flex-top-left`}>
        <h3 className={styles.note_title}>{title}</h3>
        <p
          className={styles.note_body}
          dangerouslySetInnerHTML={{
            __html: notes,
          }}
        ></p>
      </div>

      {options && (
        <div
          className={`${styles.note_footer} flex-row-wrap position-absolute box-shadow`}
        >
          <span
            className={`position-absolute ${styles.appliedLabel}`}
            style={{ backgroundColor: color }}
          >
            {note.label ? "Work" : label}
          </span>
          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() => archiveNote(note, noteDispatch)}
          >
            <span className={`material-icons`}>restore</span>
          </Link>
          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() => deleteFromTrash(note)}
          >
            <span className={`material-icons`}>delete</span>
          </Link>
        </div>
      )}
      <div className="flex-row-wrap flex-left-center">
        <span
          className={`${styles.createdDate}`}
          style={{ backgroundColor: color }}
        >
          {timestamp.slice(4, 10)}
        </span>
      </div>
    </div>
  );
}
