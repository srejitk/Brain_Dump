import { useContext, createContext, useReducer, useState } from "react";
import { useNote } from "../Note/NoteContext";
import {
  sortbyDate,
  sortbyPriority,
  filterbyColor,
  filterbyLabel,
  filterbyPriority,
  Compose,
} from "./FilterCompose";
import { FilterReducer } from "./FilterReducer";

const FilterContext = createContext();

const useFilter = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {
  const { noteState } = useNote();
  const { noteslist } = noteState;
  const [sortForm, setSortForm] = useState(false);
  const [filterForm, setfilterForm] = useState(false);

  const initialData = {
    sortByPriority: "",
    sortByDate: "",
    filterByPriority: "",
    filterByColor: "",
    labelState: [],
  };
  const [filterState, filterDispatch] = useReducer(FilterReducer, initialData);

  const filteredNotes = Compose(
    filterState,
    sortbyDate,
    sortbyPriority,
    filterbyColor,
    filterbyLabel,
    filterbyPriority
  )(noteslist);

  return (
    <FilterContext.Provider
      value={{
        filterState,
        filterDispatch,
        filteredNotes,
        sortForm,
        setSortForm,
        filterForm,
        setfilterForm,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { useFilter, FilterProvider };
