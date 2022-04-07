import React from "react";
import { Link } from "react-router-dom";
import styles from "./EmptyState.module.css";

export default function EmptyState({
  stateTitle,
  stateDesc,
  btnText,
  icon,
  endpoint,
  color,
}) {
  return (
    <div className={styles.emptyState_Container}>
      <div className={`flex-mid-center ${styles.icon_container}`}>
        <div className={`${styles.iconBg} ${color} flex-mid-center`}>
          <span className={`material-icons ${color} ${styles.state_icon}`}>
            {icon}
          </span>
        </div>
      </div>
      <h4 className={"header-4"}>{stateTitle}</h4>
      <h6 className={`header-6`}>{stateDesc}</h6>
      <Link to={endpoint}>
        <button className={`btn ${color} ${styles.stateBtn}`}>{btnText}</button>
      </Link>
    </div>
  );
}
