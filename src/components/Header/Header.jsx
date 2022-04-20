import React from "react";
import styles from "./Header.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { useNote } from "../../contexts/Note/NoteContext";

export default function Header() {
  const { isLogged, logoutHandler } = useAuth();
  const { sidebar, setSidebar } = useNote();

  const handleSidebar = (e) => {
    setSidebar(!sidebar);
  };

  return (
    <div
      className={`flex-row-wrap position-relative box-shadow ${styles.Navbar}`}
    >
      <div className={`flex-row-wrap gap20 ${styles.Navbar_brand}`}>
        <button onClick={(e) => handleSidebar(e)} className="btn btn_action ">
          <span className="material-icons">{sidebar ? `close` : `menu`}</span>
        </button>

        <Link to="/" className={`flex-row-wrap gap20 ${styles.Navbar_brand}`}>
          <div className={`flex-mid-center ${styles.logo_container}`}>
            <img
              className={styles.logo}
              src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1649100763/Brain%20Dump/Brain_dlnboa.svg"
              alt="BrainDump Logo"
            />
          </div>
          <h5 className="header-5">BrainDump</h5>
        </Link>
      </div>

      {isLogged ? (
        <div className={`flex-row-wrap flex-mid-center gap20`}>
          <Link
            to="sign-up"
            onClick={logoutHandler}
            className="links  btn btn_action subtitle-1"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className={`flex-row-wrap flex-mid-center gap20`}>
          <Link to="/login" className="links subtitle-1">
            Sign In
          </Link>
          <Link to="sign-up" className="links subtitle-1">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
