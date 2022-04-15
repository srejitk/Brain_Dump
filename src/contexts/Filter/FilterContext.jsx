import { useContext, createContext, useReducer } from "react";
import { useNote } from "../Note/NoteContext";
import {
  sortbyLabel,
  sortbyDate,
  sortbyPriority,
  Compose,
} from "./FilterCompose";
import { FilterReducer } from "./FilterReducer";

const FilterContext = createContext();

const useFilter = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {
  const { noteState } = useNote();
  const { noteslist } = noteState;

  const initialData = {
    sortByPriority: "",
    sortByDate: "",
    labelState: [],
  };
  const [filterState, filterDispatch] = useReducer(FilterReducer, initialData);

  const filteredNotes = Compose(
    filterState,
    sortbyDate,
    sortbyPriority,
    sortbyLabel
  )(noteslist);

  return (
    <FilterContext.Provider
      value={{ filterState, filterDispatch, filteredNotes }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { useFilter, FilterProvider };
