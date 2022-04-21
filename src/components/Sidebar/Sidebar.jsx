import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useFilter } from "../../contexts/Filter/FilterContext";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./Sidebar.module.css";
import { taglist, pages } from "../../utils/Constants";

export default function Sidebar() {
  const { sidebar } = useNote();
  const { filterState, filterDispatch } = useFilter();
  const { labelState } = filterState;
  return (
    <div
      className={`${styles.sidebar} ${
        sidebar ? "" : styles.hideSidebar
      } box-shadow`}
    >
      <p className={`subtitle-2 ${styles.categoryTitle}`}>PAGES</p>
      {pages.map((page) => (
        <NavLink
          to={page.path}
          key={page.path}
          className={`${styles.sidebarItem}`}
        >
          <span className="material-icons">{page.icon}</span>
          {page.title}
        </NavLink>
      ))}
      <p className={`subtitle-2 ${styles.categoryTitle}`}>LABELS</p>
      {taglist.map((tag) => (
        <Link
          to="/"
          onClick={() =>
            filterDispatch({
              type: "FILTERBY_LABEL",
              payload: tag.title,
            })
          }
          className={`${styles.sidebarItem} ${
            labelState?.includes(tag.title)
              ? styles.labelActive
              : styles.sidebarlabel
          }`}
        >
          <span className="material-icons">{tag.icon}</span>
          {tag.title}
        </Link>
      ))}
    </div>
  );
}
