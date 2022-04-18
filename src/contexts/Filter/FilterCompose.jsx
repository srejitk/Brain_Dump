export const filterbyPriority = ({ filterByPriority }, array) => {
  switch (filterByPriority) {
    case "Low":
      return array?.filter((note) => note.priority === 3);
    case "Medium":
      return array?.filter((note) => note.priority === 2);
    case "High":
      return array?.filter((note) => note.priority === 1);
    default:
      return array;
  }
};

export const filterbyColor = ({ filterByColor }, array) => {
  switch (filterByColor) {
    case "WHITE":
      return array.filter((note) => note.color === `var(--white)`);
    case "BLUE":
      return array.filter((note) => note.color === `var(--component-blue-02)`);
    case "GREEN":
      return array.filter((note) => note.color === `var(--component-green-02)`);
    case "RED":
      return array.filter((note) => note.color === `var(--component-red-03)`);
    case "YELLOW":
      return array.filter(
        (note) => note.color === `var(--component-yellow-04)`
      );
    default:
      return array;
  }
};

export const filterbyLabel = (state, array) => {
  return state.labelState?.length === 0
    ? array
    : array.filter((note) => state.labelState.includes(note.label[0]));
};

export const sortbyDate = ({ sortByDate }, array) => {
  switch (sortByDate) {
    case "Newest":
      return [...array].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    case "Oldest":
      return [...array].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
    default:
      return array;
  }
};

export const sortbyPriority = ({ sortByPriority }, array) => {
  switch (sortByPriority) {
    case "lowtohigh":
      return [...array].sort((a, b) => b.priority - a.priority);
    case "hightolow":
      return [...array].sort((a, b) => a.priority - b.priority);
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
