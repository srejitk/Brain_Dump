import React from "react";
import { useNote } from "../../contexts/Note/NoteContext";
import EmptyState from "../EmptyState/EmptyState";
import NoteCard from "../Note/Note";
import styles from "./Archive.module.css";

export default function Archive() {
  const { noteState } = useNote();
  const { archivedNotes } = noteState;

  return (
    <div
      className={`${styles.noteslist} grid position-relative ${
        archivedNotes?.length === 0 ? styles.single_grid : ""
      }`}
    >
      {archivedNotes?.length === 0 ? (
        <div className="flex-mid-center">
          <EmptyState
            stateTitle={"No notes here!"}
            stateDesc="Go write some"
            btnText="Go Home"
            icon={"archive"}
            endpoint="/"
            color={"all-blue"}
          />
        </div>
      ) : (
        <h3 className={`${styles.pageTitle} header-4 position-absolute`}>
          {`Archived Notes`}
        </h3>
      )}
      {archivedNotes?.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
}
