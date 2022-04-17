import { useNote } from "../../contexts/Note/NoteContext";
import EmptyState from "../EmptyState/EmptyState";
import TrashNote from "../TrashNote/TrashNote";
import styles from "./Trash.module.css";

export default function Trash() {
  const { noteState } = useNote();
  const { trashedNotes } = noteState;

  return (
    <div
      className={`${styles.noteslist} grid position-relative ${
        trashedNotes?.length === 0 ? styles.single_grid : ""
      }`}
    >
      {trashedNotes?.length === 0 ? (
        <div className="flex-mid-center">
          <EmptyState
            stateTitle={"No trash here."}
            stateDesc="You have nothing to hide huh"
            btnText="Go Home"
            icon={"delete"}
            endpoint="/"
            color={"all-yellow"}
          />
        </div>
      ) : (
        <h3 className={`${styles.pageTitle} header-4 position-absolute`}>
          {`Trashed Notes`}
        </h3>
      )}
      {trashedNotes?.map((note) => (
        <TrashNote key={note._id} note={note} />
      ))}
    </div>
  );
}
