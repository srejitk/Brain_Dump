import React from "react";
import { NoteCard, Editor } from "../index";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const note = {
    title: "Helo",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ipsam natus ullam, quos odit libero facere ex enim voluptatem, blanditiis, quisquam aliquam et. Similique ad odit rem ex placeat dicta.",
  };
  return (
    <div
      className={`${styles.homepage_container} content flex-column-wrap flex-mid-center `}
    >
      <form className={`${styles.newNote} box-shadow`}>
        <input
          type="text"
          placeholder="Take a note..."
          className={`${styles.titleInput} box-shadow `}
        />
        <Editor />
        <button
          className={`${styles.pinNote} transparent-btn  flex-mid-center position-absolute`}
        >
          <span className="material-icons">push_pin</span>
        </button>
        <button
          className={`${styles.addNote} btn btn--small  flex-mid-center position-absolute`}
        >
          Add Note
        </button>
      </form>
      <div className={`${styles.noteslist} grid`}>
        <NoteCard note={note} />
        <NoteCard note={note} />
        <NoteCard note={note} />
        <NoteCard note={note} />
        <NoteCard note={note} />
        <NoteCard note={note} />
        <NoteCard note={note} />
      </div>
    </div>
  );
}
