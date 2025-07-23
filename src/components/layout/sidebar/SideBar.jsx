import styles from "./SideBar.module.css";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutUser } from "../../../util/auth/logout";

export default function SideBar() {
  const navigate = useNavigate();

  function logoutHandler() {
    logoutUser(navigate);
  }

  return (
    <Fragment>
      <div className={styles["sidebar-container"]}>
        <div className={styles["sub-container"]}>
          <span className={styles["title"]}>MAIN</span>
          <div className={styles["items-list"]}>
            <FontAwesomeIcon
              icon="fa-solid fa-table-columns"
              className={styles.icon}
            />
            <NavLink
              to=""
              end
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Dash-Board
            </NavLink>
          </div>
        </div>

        <div className={styles["sub-container"]}>
          <span className={styles["title"]}>LISTS</span>

          <div className={styles["items-list"]}>
            <FontAwesomeIcon
              icon="fa-regular fa-user"
              className={styles.icon}
            />
            <span className={styles.disabled}>Users</span>
          </div>

          <div className={styles["items-list"]}>
            <FontAwesomeIcon icon="fa-solid fa-hotel" className={styles.icon} />
            <NavLink
              to="hotel"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Hotels
            </NavLink>
          </div>

          <div className={styles["items-list"]}>
            <FontAwesomeIcon icon="fa-solid fa-bed" className={styles.icon} />
            <NavLink
              to="room"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Rooms
            </NavLink>
          </div>

          <div className={styles["items-list"]}>
            <FontAwesomeIcon icon="fa-solid fa-truck" className={styles.icon} />
            <NavLink
              to="transactions"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Transactions
            </NavLink>
          </div>
        </div>

        <div className={styles["sub-container"]}>
          <span className={styles["title"]}>NEW</span>

          <div className={styles["items-list"]}>
            <FontAwesomeIcon icon="fa-solid fa-hotel" className={styles.icon} />
            <NavLink
              to="hotel/new-hotel"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              New Hotel
            </NavLink>
          </div>

          <div className={styles["items-list"]}>
            <FontAwesomeIcon icon="fa-solid fa-bed" className={styles.icon} />
            <NavLink
              to="room/new-room"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              New Room
            </NavLink>
          </div>
        </div>

        <div className={styles["sub-container"]}>
          <span className={styles["title"]}>USERS</span>
          <div className={styles["items-list"]}>
            <FontAwesomeIcon
              icon="fa-solid fa-arrow-right-from-bracket"
              className={styles.icon}
            />
            <button className={styles["logout-btn"]} onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
