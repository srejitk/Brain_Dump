import React, { useState } from "react";
import { useFilter } from "../../contexts/Filter/FilterContext";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./FilterSelector.module.css";

export default function FilterSelector() {
  const [filterForm, setfilterForm] = useState(false);

  // const handlerFunction = (event) => {
  //   const { value } = event.target;
  //   setOption(value);
  // };
  const { filterDispatch, filterState } = useFilter();
  const { filterByPriority } = filterState;
  const taglist = [
    {
      title: "Todo",
      color: "var(--component-blue-01)",
    },
    {
      title: "Work",
      color: "var(--component-green-01)",
    },
    {
      title: "Chore",
      color: "var(--component-yellow-01)",
    },
    {
      title: "Shopping",
      color: "var(--component-pink-01)",
    },
  ];

  const pallete = [
    { title: "WHITE", value: `var(--white)` },
    { title: "BLUE", value: `var(--component-blue-02)` },
    { title: "RED", value: `var(--component-red-03)` },
    { title: "GREEN", value: `var(--component-green-02)` },
    { title: "YELLOW", value: `var(--component-yellow-04)` },
  ];
  const filterHandler = () => {
    setfilterForm((prev) => !prev);
  };
  return (
    <div
      className={`flex-mid-center ${styles.filterSelector} position-relative `}
    >
      <div
        className="btn btn_action btn--small  outline"
        onClick={filterHandler}
      >
        <span className="material-icons">filter_alt</span>
      </div>
      {
        <div
          className={`${styles.filterlist_container} box-shadow ${
            filterForm ? styles.showDropdown : styles.hideDropdown
          } position-absolute flex-row-wrap `}
        >
          <div
            className={`${styles.filterOption} position-relative  ${
              filterForm ? styles.showOptions : styles.hideOptions
            }`}
          >
            <span className={`${styles.filterLabel} position-absolute`}>
              Priority
            </span>
            <div className="flex-column-wrap flex-mid-center">
              <span className="material-icons">low_priority</span>
              <div className="flex-row-wrap align--center gap20">
                <p className="subtitle-1">Low</p>
                <input
                  type="checkbox"
                  name="FILTERBY_PRIORITY"
                  id="newest"
                  value="Low"
                  onChange={(e) =>
                    filterDispatch({
                      type: "FILTERBY_PRIORITY",
                      payload: e.target.value,
                    })
                  }
                  checked={filterByPriority === "Low"}
                />
              </div>
            </div>
            <div className="flex-column-wrap flex-mid-center">
              <span className="material-icons">rule</span>
              <div className="flex-row-wrap align--center gap20">
                <p className="subtitle-1">Medium</p>
                <input
                  type="checkbox"
                  name="FILTERBY_PRIORITY"
                  id="newest"
                  value="Medium"
                  onChange={(e) =>
                    filterDispatch({
                      type: "FILTERBY_PRIORITY",
                      payload: e.target.value,
                    })
                  }
                  checked={filterByPriority === "Medium"}
                />
              </div>
            </div>
            <div className="flex-column-wrap flex-mid-center">
              {" "}
              <span className="material-icons">priority_high</span>
              <div className="flex-row-wrap align--center gap20">
                <p className="subtitle-1">High</p>
                <input
                  type="checkbox"
                  name="FILTERBY_PRIORITY"
                  id="oldest"
                  value="High"
                  onChange={(e) =>
                    filterDispatch({
                      type: "FILTERBY_PRIORITY",
                      payload: e.target.value,
                    })
                  }
                  checked={filterByPriority === "High"}
                />
              </div>
            </div>
          </div>

          {
            <div
              className={`${styles.filterOption}  position-relative ${
                filterForm ? styles.showOptions : styles.hideOptions
              }`}
            >
              <span className={`${styles.filterLabel} position-absolute`}>
                Labels
              </span>
              <div className={`flex-row-wrap ${styles.label_container}`}>
                {taglist.map((tag) => (
                  <button
                    key={tag.title}
                    style={{ backgroundColor: tag.color }}
                    onClick={() =>
                      filterDispatch({
                        type: "FILTERBY_LABEL",
                        payload: tag.title,
                      })
                    }
                    className={`${styles.add_label}  
                    flex-row-wrap btn btn_action btn--small`}
                  >
                    {tag.title}
                  </button>
                ))}
              </div>
            </div>
          }
          <div
            className={`${styles.filterOption} position-relative  ${
              filterForm ? styles.showOptions : styles.hideOptions
            }`}
          >
            <span className={`${styles.filterLabel} position-absolute`}>
              Color
            </span>
            <div className={`flex-row-wrap ${styles.color_container}`}>
              {pallete.map((color) => (
                <span
                  key={color.title}
                  className={`${styles.color}  flex-mid-center  material-icons`}
                  style={{
                    backgroundColor: color.value,
                    border:
                      color.value === `var(--white)` &&
                      `2px solid var(--component-grey-02)`,
                  }}
                  onClick={() => {
                    filterDispatch({
                      type: "FILTERBY_COLOR",
                      payload: color.title,
                    });
                  }}
                >
                  {filterState.filterByColor === color.title ? `done` : ""}
                </span>
              ))}
            </div>
          </div>
          <div
            className={`${styles.filterOption}  ${styles.clear_btn}  ${
              filterForm ? styles.showOptions : styles.hideOptions
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
