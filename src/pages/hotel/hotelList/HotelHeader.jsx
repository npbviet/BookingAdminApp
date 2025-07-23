// HotelHeader.jsx
import styles from "./HotelHeader.module.css";

export default function HotelHeader() {
  return (
    <div className={`${styles["header"]} ${styles["custom-border"]}`}>
      <div className={`${styles["check-box"]} ${styles["check-box-head"]}`}>
        <input type="checkbox" />
      </div>
      <div className={styles["hotelID"]}>ID</div>
      <div className={styles["hotel-name"]}>Name</div>
      <div className={styles["hotel-type"]}>Type</div>
      <div className={styles["hotel-title"]}>Title</div>
      <div className={styles["city"]}>City</div>
      <div className={`${styles["action"]} ${styles["action-header"]}`}>
        Action
      </div>
    </div>
  );
}
