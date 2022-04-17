import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { Toast } from "../../components";
import { useAuth } from "../Auth/AuthContext";
import { noteReducer } from "./NoteReducer";

const NoteContext = createContext();

const useNote = () => useContext(NoteContext);

const NoteProvider = ({ children }) => {
  const initialData = {
    title: "",
    notes: "",
    color: "var(--white)",
    isEdited: false,
    isPinned: false,
    label: [],
    timestamp: new Date().toLocaleString(),
    priority: 3,
  };

  const [note, setNote] = useState(initialData);
  const [sidebar, setSidebar] = useState(false);
  const { isLogged } = useAuth();

  const [noteState, noteDispatch] = useReducer(noteReducer, {
    noteslist: [],
    archivedNotes: [],
    trashedNotes: [],
    pinnedNotes: [],
  });

  const getNotes = async (noteDispatch) => {
    try {
      const response = await axios.get("/api/notes", {
        headers: { authorization: localStorage.getItem("Token") },
      });
      const { status, data } = response;
      if (status === 200) {
        noteDispatch({ type: "GET_NOTES", payload: data.notes });
      }
    } catch (error) {
      console.log("Couldn't retrieve notes", error);
    }
  };

  const getArchivedNotes = async (noteDispatch) => {
    try {
      const response = await axios.get("/api/archives", {
        headers: { authorization: localStorage.getItem("Token") },
      });
      const { status, data } = response;
      if (status === 200) {
        noteDispatch({ type: "GET_ARCHIVED_NOTES", payload: data.archives });
      }
    } catch (error) {
      console.error("Couldn't retrieve Archives", error);
    }
  };

  useEffect(() => {
    if (isLogged) {
      getNotes;
      getArchivedNotes;
    }
  }, [isLogged]);

  const addNote = async (note, noteDispatch) => {
    try {
      const response = await axios.post(
        "/api/notes",
        { note },
        { headers: { authorization: localStorage.getItem("Token") } }
      );

      const { status, data } = response;
      if (status === 201) {
        Toast({ message: "Note Added Successfully", type: "success" });
        noteDispatch({ type: "ADD_NOTE", payload: data.notes });
        setNote(initialData);
      }
    } catch (error) {
      Toast({ message: "Couldn't add note", type: "error" });
    }
  };

  const deleteNote = async (note, noteDispatch) => {
    try {
      const response = await axios.delete(`/api/notes/${note._id}`, {
        headers: { authorization: localStorage.getItem("Token") },
      });
      const { status, data } = response;
      if (status === 200) {
        Toast({ message: "Note Deleted.", type: "success" });
        noteDispatch({ type: "DELETE_NOTE", payload: data.notes });
        noteDispatch({ type: "ADD_TO_TRASH", payload: note });
      }
    } catch (error) {
      Toast({ message: "Couldn't Delete Note", type: "error" });
    }
  };

  const updateNote = async (note, noteDispatch) => {
    try {
      const response = await axios.post(
        `/api/notes/${note._id}`,
        { note },
        {
          headers: { authorization: localStorage.getItem("Token") },
        }
      );
      const { status, data } = response;
      if (status === 201) {
        Toast({ message: "Note Updated.", type: "success" });
        noteDispatch({ type: "UPDATE_NOTE", payload: data.notes });
      }
    } catch (error) {
      Toast({ message: "Couldn't Update Note", type: "error" });
    }
  };

  const archiveNote = async (note, noteDispatch) => {
    try {
      const response = await axios.post(
        `/api/notes/archives/${note._id}`,
        { note },
        {
          headers: { authorization: localStorage.getItem("Token") },
        }
      );
      const { status, data } = response;
      if (status === 201) {
        noteDispatch({ type: "ARCHIVE_NOTE", payload: data });
        Toast({ message: "Note Archived.", type: "success" });
      }
    } catch (error) {
      Toast({ message: "Couldn't Archive Note", type: "error" });
    }
  };

  const restoreArchivedNote = async (note, noteDispatch) => {
    try {
      const response = await axios.post(
        `/api/archives/restore/${note._id}`,
        {},
        {
          headers: { authorization: localStorage.getItem("Token") },
        }
      );
      const { status, data } = response;
      if (status === 200) {
        noteDispatch({ type: "RESTORE_ARCHIVED_NOTE", payload: data });
        Toast({ message: "Note Restored.", type: "success" });
      }
    } catch (error) {
      Toast({ message: "Couldn't Retrieve Note", type: "error" });
    }
  };

  const deleteArchivedNote = async (note, noteDispatch) => {
    try {
      const response = await axios.delete(
        `/api/archives/delete/${note._id}`,
        {},
        {
          headers: { authorization: localStorage.getItem("Token") },
        }
      );
      const { status, data } = response;
      if (status === 200) {
        noteDispatch({ type: "DELETE_ARCHIVED_NOTE", payload: data.archives });
        Toast({ message: "Note Deleted from Archive.", type: "success" });
      }
    } catch (error) {
      Toast({ message: "Couldn't Delete Note from Archive", type: "error" });
    }
  };

  return (
    <NoteContext.Provider
      value={{
        note,
        setNote,
        sidebar,
        setSidebar,
        noteState,
        noteDispatch,
        addNote,
        deleteNote,
        updateNote,
        archiveNote,
        restoreArchivedNote,
        deleteArchivedNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { useNote, NoteProvider };
