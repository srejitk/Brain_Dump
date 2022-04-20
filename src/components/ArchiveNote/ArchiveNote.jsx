import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./ArchiveNote.module.css";
import DOMPurify from "dompurify";
export default function ArchiveNote({ note }) {
  const { title, notes, timestamp, color, label } = note;
  const [options, setOptions] = useState(false);
  const { noteDispatch, restoreArchivedNote } = useNote();

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
            onClick={() => restoreArchivedNote(note, noteDispatch)}
          >
            <span className={`material-icons`}>unarchive</span>
          </Link>

          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() =>
              noteDispatch({ type: "DELETE_NOTE_FROM_ARCHIVE", payload: note })
            }
          >
            <span className={`material-icons`}>delete</span>
          </Link>
          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={() =>
              noteDispatch({ type: "DELETE_ARCHIVED_NOTE", payload: note })
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
