export const FilterReducer = (state, { type, payload }) => {
  const defaultState = {
    sortByPriority: "",
    sortByDate: "",
    labelState: [],
  };
  switch (type) {
    case "SORTBY_DATE":
      return { ...state, sortByDate: payload };
    case "SORTBY_LABELS":
      const { labelState } = state;
      if (labelState.includes(payload)) {
        return {
          ...state,
          labelState: labelState.filter((label) => label !== payload),
        };
      } else {
        return { ...state, labelState: [...labelState, payload] };
      }
    case "SORTBY_PRIORITY":
      return { ...state, sortByPriority: payload };
    case "CLEAR":
      return defaultState;
    default:
      return state;
  }
};
