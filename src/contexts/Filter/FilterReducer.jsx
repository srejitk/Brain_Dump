export const FilterReducer = (state, { type, payload }) => {
  const defaultState = {
    sortByPriority: "",
    sortByDate: "",
    filterByPriority: "",
    filterByColor: "",
    labelState: [],
  };
  switch (type) {
    case "SORTBY_DATE":
      return { ...state, sortByDate: payload };
    case "SORTBY_PRIORITY":
      return { ...state, sortByPriority: payload };
    case "FILTERBY_PRIORITY":
      return { ...state, filterByPriority: payload };
    case "FILTERBY_COLOR":
      return { ...state, filterByColor: payload };
    case "FILTERBY_LABEL":
      const { labelState } = state;
      if (labelState.includes(payload)) {
        return {
          ...state,
          labelState: [],
        };
      } else {
        return { ...state, labelState: [payload] };
      }

    case "CLEAR":
      return defaultState;
    default:
      return state;
  }
};
