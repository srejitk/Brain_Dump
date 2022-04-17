import React, { useState } from "react";
import { useFilter } from "../../contexts/Filter/FilterContext";
import styles from "./SortSelector.module.css";

export default function SortSelector() {
  const [sortForm, setSortForm] = useState(false);

  const handlerFunction = (event) => {
    const { value, name } = event.target;
    setOption(value);
  };
  const { filterDispatch, filterState } = useFilter();
  const { sortByPriority, sortByDate, labelState } = filterState;

  const sortHandler = () => {
    setSortForm((prev) => !prev);
  };
  return (
    <div
      className={`flex-mid-center position-relative ${styles.filterSelector} `}
    >
      <div className="btn btn_action btn--small " onClick={sortHandler}>
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
              <p className="subtitle-1">First Priority</p>
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
              <p className="subtitle-1">Last Priority</p>
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
              <p className="subtitle-1">Newest</p>
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
            <span className="material-icons">date_range</span>
            <div className="flex-row-wrap align--center gap20">
              <p className="subtitle-1">Oldest</p>
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
        </div>
      }
    </div>
  );
}
