import styles from "./RoomHeader.module.css";

export default function RoomHeader() {
  return (
    <div className={`${styles["header"]} ${styles["custom-border"]}`}>
      <div className={`${styles["check-box"]} ${styles["check-box-head"]}`}>
        <input type="checkbox" />
      </div>
      <div className={styles["roomID"]}>ID</div>
      <div className={styles["room-title"]}>Title</div>
      <div className={styles["room-description"]}>Description</div>
      <div className={styles["room-price"]}>Price</div>
      <div className={styles["max-people"]}>Max People</div>
      <div className={`${styles["action"]} ${styles["action-header"]}`}>
        Action
      </div>
    </div>
  );
}
