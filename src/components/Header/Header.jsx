import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../../contexts/Auth/AuthContext";

export default function Header() {
  const [showOption, setShowOption] = useState(false);
  const { isLogged, logoutHandler } = useAuth();

  const optionHandler = () => {
    setShowOption(!showOption);
  };

  console.log(showOption);
  return (
    <div
      className={`flex-row-wrap position-relative box-shadow ${styles.Navbar}`}
    >
      <div className={`flex-row-wrap gap20 ${styles.Navbar_brand}`}>
        <span className="material-icons">menu</span>

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
            className="links subtitle-1"
          >
            Logout
          </Link>
          <Link
            to="/"
            className={`btn_action btn btn--small`}
            onClick={optionHandler}
          >
            <span className="material-icons">face</span>
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
