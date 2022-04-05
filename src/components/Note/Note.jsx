import React from "react";
import { Link } from "react-router-dom";
import styles from "./Note.module.css";

export default function NoteCard({ note }) {
  const { title, body } = note;
  return (
    <div className={`${styles.note} border-radius box-shadow`}>
      <div className={`${styles.note_content} flex-column-wrap flex-top-left`}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <div className={`${styles.note_footer}`}>
        <Link to="/" className={`btn_action btn btn--small`}>
          <span className={`material-icons`}>push_pin</span>
        </Link>
        <Link to="/" className={`btn_action btn btn--small`}>
          <span className={`material-icons`}>archive</span>
        </Link>
        <Link to="/" className={`btn_action btn btn--small`}>
          <span className={`material-icons`}>delete</span>
        </Link>
        <Link to="/" className={`btn_action btn btn--small`}>
          <span className={`material-icons`}>edit</span>
        </Link>
      </div>
    </div>
  );
}
