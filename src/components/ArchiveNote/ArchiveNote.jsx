import React from "react";
import { Link } from "react-router-dom";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./ArchiveNote.module.css";

export default function ArchiveNote({ note }) {
  const { title, notes } = note;
  const {
    noteState,
    setNote,
    noteDispatch,
    deleteNote,
    archiveNote,
    deleteArchivedNote,
    RestoreArchivedNote,
  } = useNote();

  const { color, label } = note;

  const editNote = (note) => {
    setNote({ ...note, isEdited: (note.isEdited = true) });
    setNote(note);
  };

  return (
    <div
      className={`${styles.note} border-radius box-shadow`}
      style={{ backgroundColor: `${color}` }}
    >
      <div className={`${styles.note_content} flex-column-wrap flex-top-left`}>
        <h3 className={styles.note_title}>{title}</h3>
        <p
          className={styles.note_body}
          dangerouslySetInnerHTML={{
            __html: notes,
          }}
        ></p>
      </div>

      <div className={`${styles.note_footer} flex-row-wrap position-relative`}>
        <span
          className={`position-absolute ${styles.appliedLabel}`}
          style={{ backgroundColor: color }}
        >
          {note.label ? "Work" : label}
        </span>
        {noteState.pinnedNotes?.includes(note) ? (
          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() => noteDispatch({ type: "UNPIN_NOTE", payload: note })}
          >
            <span className={`material-icons`}>push_pin</span>
          </Link>
        ) : (
          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() => noteDispatch({ type: "PIN_NOTE", payload: note })}
          >
            <span className={`material-icons`}>push_pin</span>
          </Link>
        )}

        {noteState.archivedNotes?.includes(note) ? (
          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() => RestoreArchivedNote(note, noteDispatch)}
          >
            <span className={`material-icons`}>unarchive</span>
          </Link>
        ) : (
          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() => archiveNote(note, noteDispatch)}
          >
            <span className={`material-icons`}>archive</span>
          </Link>
        )}

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
    </div>
  );
}
