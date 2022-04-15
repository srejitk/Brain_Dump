export const sortbyPriority = ({ sortByPriority }, array) => {
  switch (sortByPriority) {
    case "Low":
      return array.filter((note) => note.priority === "Low");
    case "Medium":
      return array.filter((note) => note.priority === "Medium");
    case "High":
      return array.filter((note) => note.priority === "High");
    default:
      return array;
  }
};

export const sortbyLabel = (state, array) => {
  return state.labelState?.length === 0
    ? array
    : array.filter((note) => state.labelState.includes(note.label));
};

export const sortbyDate = ({ sortByDate }, array) => {
  switch (sortByDate) {
    case "Newest":
      return [...array].sort((a, b) => new Date(a.date) - new Date(b.date));
    case "Oldest":
      return [...array].sort((a, b) => new Date(b.date) - new Date(a.date));
    default:
      return array;
  }
};

export const Compose =
  (state, ...functions) =>
  (data) => {
    return functions.reduce((acc, curr) => {
      return curr(state, acc);
    }, data);
  };
