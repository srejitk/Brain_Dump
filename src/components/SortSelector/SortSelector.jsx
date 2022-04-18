import React from "react";
import { useFilter } from "../../contexts/Filter/FilterContext";
import styles from "./SortSelector.module.css";

export default function SortSelector() {
  const {
    filterDispatch,
    filterState,
    sortForm,
    setSortForm,
    filterForm,
    setfilterForm,
  } = useFilter();
  const { sortByPriority, sortByDate } = filterState;

  const sortHandler = () => {
    if (filterForm) {
      setfilterForm((prev) => !prev);
      setSortForm((prev) => !prev);
    } else {
      setSortForm((prev) => !prev);
    }
  };
  return (
    <div
      className={`flex-mid-center position-relative ${styles.filterSelector} `}
    >
      <div className="btn btn_action btn--small outline" onClick={sortHandler}>
        <span className="material-icons">sort</span>
      </div>
      {
        <div
          className={`${styles.sortlist_container} box-shadow ${
            sortForm ? styles.showDropdown : styles.hideDropdown
          } position-absolute flex-row-wrap `}
        >
          <div
            className={`${styles.sortOption}  ${
              sortForm ? styles.showOptions : styles.hideOptions
            }`}
          >
            <span className="material-icons">priority_high</span>
            <div className="flex-row-wrap align--center gap20">
              <div className="flex-column-wrap flex-low-center">
                <p className="subtitle-1">Priority</p>
                <p className="subtitle-2 grey-text">By First Priority</p>
              </div>
              <input
                type="radio"
                name="SORTBY_PRIORITY"
                id="newest"
                value="hightolow"
                onChange={(e) =>
                  filterDispatch({
                    type: "SORTBY_PRIORITY",
                    payload: e.target.value,
                  })
                }
                checked={sortByPriority === "hightolow"}
              />
            </div>
          </div>
          <div
            className={`${styles.sortOption}  ${
              sortForm ? styles.showOptions : styles.hideOptions
            }`}
          >
            <span className="material-icons">low_priority</span>
            <div className="flex-row-wrap align--center gap20">
              <div className="flex-column-wrap flex-low-center">
                <p className="subtitle-1">Priority</p>
                <p className="subtitle-2 grey-text">By Last Priority</p>
              </div>

              <input
                type="radio"
                name="SORTBY_PRIORITY"
                id="newest"
                value="lowtohigh"
                onChange={(e) =>
                  filterDispatch({
                    type: "SORTBY_PRIORITY",
                    payload: e.target.value,
                  })
                }
                checked={sortByPriority === "lowtohigh"}
              />
            </div>
          </div>
          {/* Sort By Date */}
          <div
            className={`${styles.sortOption}  ${
              sortForm ? styles.showOptions : styles.hideOptions
            }`}
          >
            <span className="material-icons">date_range</span>
            <div className="flex-row-wrap align--center gap20">
              <div className="flex-column-wrap flex-low-center">
                <p className="subtitle-1">Date</p>
                <p className="subtitle-2 grey-text">By Last Created</p>
              </div>
              <input
                type="radio"
                name="SORTBY_DATE"
                id="oldest"
                value="Newest"
                onChange={(e) =>
                  filterDispatch({
                    type: "SORTBY_DATE",
                    payload: e.target.value,
                  })
                }
                checked={sortByDate === "Newest"}
              />
            </div>
          </div>
          <div
            className={`${styles.sortOption}  ${
              sortForm ? styles.showOptions : styles.hideOptions
            }`}
          >
            <span className="material-icons">event</span>
            <div className="flex-row-wrap align--center gap20">
              <div className="flex-column-wrap flex-low-center">
                <p className="subtitle-1">Date</p>
                <p className="subtitle-2 grey-text">By First Created</p>
              </div>
              <input
                type="radio"
                name="SORTBY_DATE"
                id="oldest"
                value="Oldest"
                onChange={(e) =>
                  filterDispatch({
                    type: "SORTBY_DATE",
                    payload: e.target.value,
                  })
                }
                checked={sortByDate === "Oldest"}
              />
            </div>
          </div>
          <div
            className={`${styles.filterOption}  ${styles.clear_btn}  ${
              sortForm ? styles.showOptions : styles.hideOptions
            }`}
          >
            <button
              className={` btn btn--link`}
              onClick={() => filterDispatch({ type: "CLEAR" })}
            >
              Clear
            </button>
          </div>
        </div>
      }
    </div>
  );
}
