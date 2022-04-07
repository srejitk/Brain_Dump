import React from "react";
import { NavLink } from "react-router-dom";
import { useNote } from "../../contexts/Note/NoteContext";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const { sidebar } = useNote();
  console.log(sidebar);
  return (
    <div
      className={`${styles.sidebar} ${
        sidebar ? "" : styles.hideSidebar
      } box-shadow`}
    >
      <NavLink
        to="/"
        className={`${styles.sidebarItem} ${({ isActive }) =>
          isActive ? styles.sidebarActive : ""}`}
      >
        <span className="material-icons">home</span>Home
      </NavLink>
      <NavLink
        to="/archive"
        className={`${styles.sidebarItem} ${({ isActive }) =>
          isActive ? styles.sidebarActive : ""}`}
      >
        <span className="material-icons">archive</span>Archive
      </NavLink>
      <NavLink
        to="/trash"
        className={`${styles.sidebarItem} ${({ isActive }) =>
          isActive ? styles.sidebarActive : ""}`}
      >
        <span className="material-icons">mail</span>Trash
      </NavLink>
    </div>
  );
}
