import React from "react";
import { useNote } from "../../contexts/Note/NoteContext";
import ColorPallete from "../ColorPallete/ColorPallete";
import { NoteCard, Editor } from "../index";
import LabelSelector from "../LabelSelector/LabelSelector";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const initialData = {
    title: "",
    notes: "",
    color: "white",
    isEdited: false,
    isPinned: false,
    label: "New",
    timestamp: new Date().toLocaleDateString(),
  };
  const {
    noteState,
    noteDispatch,
    addNote,
    updateNote,
    note,
    setNote,
    isEdited,
  } = useNote();
  const { notes } = noteState;
  const { color } = note;

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };
  console.log(note);

  const handleSubmit = (e) => {
    e.preventDefault();
    note.isEdited
      ? updateNote(note, noteDispatch)
      : addNote(note, noteDispatch);
    console.log(note);
    setNote(initialData);
  };

  return (
    <div
      className={`${styles.homepage_container} content flex-column-wrap flex-mid-center `}
    >
      <form className={`${styles.newNote} box-shadow`} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={(e) => inputHandler(e)}
          value={note.title}
          placeholder="Take a note..."
          className={`${styles.titleInput} box-shadow `}
          required
        />
        <Editor
          value={note.notes}
          func={(e) => setNote({ ...note, notes: e })}
        />
        <button
          className={`${styles.pinNote} transparent-btn  flex-mid-center position-absolute`}
        >
          <span className="material-icons">push_pin</span>
        </button>

        <button
          className={`${styles.addNote} btn  btn--primary btn--fab flex-mid-center position-absolute`}
        >
          +
        </button>
        <span
          className={styles.appliedLabel}
          style={{ backgroundColor: color }}
        >
          {note.label === "Home" ? "" : note.label}
        </span>
        <ColorPallete />
        <LabelSelector />
      </form>
      <div className={`${styles.noteslist} grid`}>
        {notes?.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}
