export const noteReducer = (state, { type, payload }) => {
  const intialState = {
    noteslist: [],
    archivedNotes: [],
    trashedNotes: [],
    pinnedNotes: [],
  };
  switch (type) {
    case "GET_NOTE":
      return { ...state, noteslist: payload };
    case "GET_ARCHIVED_NOTES":
      return { ...state, archivedNotes: payload };
    case "ADD_NOTE":
      return { ...state, noteslist: payload };
    case "DELETE_NOTE":
      return {
        ...state,
        noteslist: payload,
        pinnedNotes: [
          ...state.pinnedNotes.filter((item) => item._id !== payload._id),
        ],
      };
    case "UPDATE_NOTE":
      return { ...state, noteslist: payload };
    case "ARCHIVE_NOTE":
      return {
        ...state,
        noteslist: payload.notes,
        archivedNotes: payload.archives,
        pinnedNotes: [
          ...state.pinnedNotes.filter((item) => item._id !== payload.archives),
        ],
      };
    case "RESTORE_ARCHIVED_NOTE":
      return {
        ...state,
        noteslist: payload.notes,
        archivedNotes: payload.archives,
      };
    case "DELETE_ARCHIVED_NOTE":
      return { ...state, archivedNotes: payload };
    case "ADD_TO_TRASH":
      return {
        ...state,
        trashedNotes: [...state.trashedNotes, payload],
        pinnedNotes: [
          ...state.pinnedNotes.filter((Item) => Item._id !== payload._id),
        ],
      };
    case "DELETE_FROM_TRASH":
      return {
        ...state,
        trashedNotes: [
          state.trashedNotes.filter((note) => note._id != payload._id),
        ],
      };
    case "PIN_NOTE":
      return {
        ...state,
        pinnedNotes: [...state.pinnedNotes, payload],
        noteslist: [
          ...state.noteslist.filter((item) => item._id != payload._id),
        ],
      };
    case "UNPIN_NOTE":
      return {
        ...state,
        noteslist: [...state.notes, payload],
        pinnedNotes: [
          ...state.pinnedNotes.filter((item) => item._id != payload._id),
        ],
      };
    default:
      return { ...state };
  }
};
