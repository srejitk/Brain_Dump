import React from "react";
import { useNote } from "../../contexts/Note/NoteContext";
import ColorPallete from "../ColorPallete/ColorPallete";
import SortSelector from "../SortSelector/SortSelector";
import { NoteCard, Editor } from "../index";
import LabelSelector from "../LabelSelector/LabelSelector";
import PrioritySelector from "../PrioritySelector/PrioritySelector";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./HomePage.module.css";
import { useFilter } from "../../contexts/Filter/FilterContext";
import FilterSelector from "../FilterSelector/FilterSelector";

export default function HomePage() {
  const initialData = {
    title: "",
    notes: "",
    color: "white",
    isEdited: false,
    isPinned: false,
    label: [],
    timestamp: new Date().toLocaleString(),
    priority: 3,
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

  const { title, color, label } = note;
  const filterLabel = [...label];

  const { filteredNotes } = useFilter();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    note.isEdited
      ? updateNote(note, noteDispatch)
      : addNote(note, noteDispatch);
    setNote(initialData);
  };

  const removeLabel = (item) => {
    return filterLabel.filter((labelItem) => labelItem !== item);
  };
  return (
    <div
      className={`${styles.homepage_container} content flex-column-wrap flex-mid-center `}
    >
      <div className={`${styles.titleSection} flex-row-wrap`}>
        <h5 className="header-4">My Notes</h5>
        <div className="gap20 flex-row-wrap">
          <SortSelector />
          <FilterSelector />
        </div>
      </div>

      <form className={`${styles.newNote} box-shadow`} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={(e) => inputHandler(e)}
          value={title}
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
        <div className={`flex-row-wrap  ${styles.labelContainer}`}>
          {filterLabel.map((item) => (
            <div
              onClick={() => removeLabel(item)}
              key={item}
              className={styles.appliedLabel}
              style={{ backgroundColor: color }}
            >
              {item}
            </div>
          ))}
        </div>
        <div
          className={`${styles.modules} flex-left-center gap20 flex-row-wrap`}
        >
          <LabelSelector />
          <ColorPallete />
          <PrioritySelector />
        </div>

        <button
          className={`${styles.addNote} btn  btn--primary btn--fab flex-mid-center position-absolute`}
        >
          +
        </button>
      </form>
      <div className={`${styles.noteslist} grid`}>
        {filteredNotes?.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}
