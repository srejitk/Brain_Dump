import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./TrashNote.module.css";
import DOMPurify from "dompurify";
export default function TrashNote({ note }) {
  const { title, notes, timestamp, color, label } = note;
  const [options, setOptions] = useState(false);
  const {
    noteState,
    noteDispatch,
    deleteNote,
    restoreArchivedNote,
    deleteArchivedNote,
  } = useNote();

  const optionsHandler = () => {
    setOptions((prev) => !prev);
  };

  const deleteHandler = (note) => {
    deleteNote(note, noteDispatch);
    noteState.archivedNotes.filter((item) => item._id !== note._id);
  };

  return (
    <div
      className={`${styles.note} ${
        options ? styles.enlargeNote : styles.defaultNote
      } border-radius box-shadow position-relative`}
      style={{ backgroundColor: `${color}` }}
    >
      <div className={`${styles.note_content} flex-column-wrap flex-top-left`}>
        <h3 className={styles.note_title}>{title}</h3>
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
          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() =>
              noteDispatch({ type: "RESTORE_FROM_TRASH", payload: note })
            }
          >
            {" "}
            <span className={`material-icons`}>restore_from_trash</span>
          </Link>
          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() =>
              noteDispatch({ type: "DELETE_FROM_TRASH", payload: note })
            }
          >
            <span className={`material-icons`}>delete_forever</span>
          </Link>
        </div>
      }
      {label?.map((item) => {
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
            {timestamp?.slice(0)}
          </span>
        </div>
      </div>
    </div>
  );
}
