import { NavLink } from "react-router-dom";
import styles from "./RoomItem.module.css";

export default function RoomItem({ room, onDelete }) {
  return (
    <div className={`${styles["content"]}`}>
      <div className={styles["check-box"]}>
        <input type="checkbox" />
      </div>
      <div className={styles["roomID"]}>{room._id}</div>
      <div className={styles["room-title"]}>{room.title}</div>
      <div className={styles["room-description"]}>{room.desc}</div>
      <div className={styles["room-price"]}>{room.price}</div>
      <div className={styles["max-people"]}>{room.maxPeople}</div>
      <div className={styles["action"]}>
        <button
          className={styles["delete-btn"]}
          onClick={() => onDelete(room._id)}
        >
          Delete
        </button>
        <NavLink
          to="edit-room"
          state={{ roomID: room._id }}
          className={styles["edit-btn"]}
        >
          Edit
        </NavLink>
      </div>
    </div>
  );
}
