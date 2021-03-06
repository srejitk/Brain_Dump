import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./Note.module.css";
import DOMPurify from "dompurify";
export default function NoteCard({ note }) {
  const { title, notes, timestamp, color, label } = note;
  const [options, setOptions] = useState(false);
  const {
    noteState,
    setNote,
    noteDispatch,
    deleteNote,
    deleteArchivedNote,
    archiveNote,
    showEditor,
    setShowEditor,
  } = useNote();

  const editNote = (note) => {
    setNote({ ...note, isEdited: (note.isEdited = true) });
    setNote(note);
    setShowEditor((prev) => !prev);
  };

  const deleteHandler = (note) => {
    if (noteState.archivedNotes?.includes(note)) {
      deleteArchivedNote(note);
    } else {
      deleteNote(note);
    }
  };

  const optionsHandler = () => {
    setOptions((prev) => !prev);
  };

  return (
    <div
      className={`${styles.note} ${
        options ? styles.enlargeNote : styles.defaultNote
      } border-radius box-shadow position-relative`}
      style={{ backgroundColor: `${color}` }}
    >
      <div className={`${styles.note_content} flex-column-wrap flex-top-left`}>
        <h3
          className={styles.note_title}
          style={{ backgroundColor: `${color}` }}
        >
          {title}
        </h3>
        <p
          className={styles.note_body}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(notes),
          }}
        ></p>
      </div>
      <div onClick={optionsHandler}>
        <span
          className={`position-absolute  ${styles.options} material-icons`}
          style={{ backgroundColor: color }}
        >
          more_horiz
        </span>
      </div>

      {
        <div
          className={`${styles.note_footer} ${
            options ? styles.enlargeOption : styles.hideOption
          } flex-column-wrap position-absolute box-shadow`}
        >
          {noteState.pinnedNotes?.includes(note) ? (
            <Link
              to="/"
              className={`btn_action btn btn--small`}
              onClick={() =>
                noteDispatch({ type: "UNPIN_NOTE", payload: note })
              }
            >
              <span className={`material-icons`}>push_pin</span>
            </Link>
          ) : (
            <Link
              to="/"
              className={`btn_action btn btn--small`}
              onClick={() => noteDispatch({ type: "PIN_NOTE", payload: note })}
            >
              <span className="material-icons-outlined">push_pin</span>
            </Link>
          )}

          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() => archiveNote(note, noteDispatch)}
          >
            <span className={`material-icons`}>archive</span>
          </Link>

          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() => deleteNote(note, noteDispatch)}
          >
            <span className={`material-icons`}>delete</span>
          </Link>
          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() => editNote(note)}
          >
            <span className={`material-icons`}>edit</span>
          </Link>
        </div>
      }
      {label.map((item) => {
        return (
          <span
            className={`flex-row-wrap ${styles.appliedLabel}`}
            style={{ backgroundColor: color }}
          >
            {item}
          </span>
        );
      })}
      <div className={`flex-row-wrap  ${styles.info_container}`}>
        <div className="flex-row-wrap flex-left-center">
          <span
            className={`${styles.createdDate}`}
            style={{ backgroundColor: color }}
          >
            {timestamp.slice(0)}
          </span>
        </div>
      </div>
    </div>
  );
}
