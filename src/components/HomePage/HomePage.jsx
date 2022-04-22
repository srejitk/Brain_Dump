import React, { useState } from "react";
import { useNote } from "../../contexts/Note/NoteContext";
import ColorPallete from "../ColorPallete/ColorPallete";
import SortSelector from "../SortSelector/SortSelector";
import { NoteCard, Editor } from "../index";
import LabelSelector from "../LabelSelector/LabelSelector";
import PrioritySelector from "../PrioritySelector/PrioritySelector";
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
    isPinned,
    showEditor,
    setShowEditor,
  } = useNote();

  const { title, color, label, isEdited } = note;
  const filterLabel = [...label];

  const { filteredNotes, filterState } = useFilter();
  const { labelState } = filterState;
  const { pinnedNotes } = noteState;

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setNote({ ...note, [name]: value });
  };

  const pinHandler = (e) => {
    e.preventDefault();
    setNote({ ...note, isPinned: !note.isPinned });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEdited ? updateNote(note, noteDispatch) : addNote(note, noteDispatch);
    setNote(initialData);
    setShowEditor((prev) => !prev);
  };

  const viewEditorHandler = () => {
    setShowEditor((prev) => !prev);
  };

  const discardHandler = (e) => {
    e.preventDefault();
    setShowEditor((prev) => !prev);
  };

  const removeLabel = (item) => {
    return filterLabel.filter((labelItem) => labelItem !== item);
  };
  return (
    <div
      className={`${styles.homepage_container} content flex-column-wrap flex-mid-center `}
    >
      <div className={`${styles.titleSection} flex-row-wrap`}>
        <h5 className="header-5">
          {filteredNotes?.length == 0 ? "" : "My Notes"}
        </h5>

        <div className="gap20 flex-row-wrap">
          <SortSelector />
          <FilterSelector />
        </div>
      </div>
      <div
        onClick={viewEditorHandler}
        className="flex-mid-center flex-column-wrap"
      >
        <img
          className={`${styles.emptyImage} ${
            !showEditor &&
            filteredNotes?.length == 0 &&
            pinnedNotes?.length === 0
              ? styles.emptyImage
              : styles.hide
          }`}
          src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1650400038/Brain%20Dump/Add_notes-pana_dhusxn.svg"
        />
        <h5
          className={` header-6 ${
            !showEditor &&
            filteredNotes?.length == 0 &&
            pinnedNotes?.length === 0
              ? styles.emptyTitle
              : styles.hide
          }`}
        >
          Note this down, will you?
        </h5>
      </div>

      <div
        className={`${styles.EditorContainer} ${
          showEditor ? styles.showEditor : styles.hideEditor
        } position-absolute`}
      >
        {" "}
        <form
          className={`${styles.newNote} box-shadow`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            name="title"
            onChange={(e) => inputHandler(e)}
            value={title}
            placeholder="Take a note..."
            className={`${styles.titleInput} `}
            required
          />
          <Editor
            value={note.notes}
            func={(e) => setNote({ ...note, notes: e })}
          />
          <button
            onClick={(e) => pinHandler(e)}
            className={`${styles.pinNote} btn btn_action ${
              note.isPinned ? styles.pinned : styles.hidden
            }  flex-mid-center position-absolute`}
          >
            <span
              className={
                isPinned ? `material-icons` : `material-icons-outlined`
              }
            >
              push_pin
            </span>
          </button>
          <button
            onClick={(e) => handleSubmit(e)}
            className={`${styles.addbutton} btn btn_action  flex-mid-center position-absolute`}
          >
            <span className={`material-icons`}>done</span>
          </button>
          <button
            onClick={(e) => discardHandler(e)}
            className={`${styles.discardbutton} btn btn_action  flex-mid-center position-absolute`}
          >
            <span className={`material-icons`}>close</span>
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
        </form>
      </div>

      <span className="subtitle-2 flex-mid-center p1t">
        {pinnedNotes?.length === 0 ? "" : "PINNED NOTES"}
      </span>
      <div className={`${styles.noteslist} grid`}>
        {pinnedNotes?.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>

      <span className="subtitle-2 flex-mid-center p1t">
        {filteredNotes?.length === 0
          ? ""
          : labelState.includes("Work")
          ? "WORK NOTES"
          : labelState.includes("Todo")
          ? "TODO NOTES"
          : labelState.includes("Shopping")
          ? "SHOPPING NOTES"
          : labelState.includes("Chore")
          ? "CHORE NOTES"
          : "ALL NOTES"}
      </span>
      <div className={`${styles.noteslist} grid`}>
        {filteredNotes?.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
      <button
        onClick={viewEditorHandler}
        className={`${styles.makeNote} ${
          showEditor ? styles.rotate : ""
        } btn  btn--primary btn--fab flex-mid-center position-absolute`}
      >
        +
      </button>
    </div>
  );
}
