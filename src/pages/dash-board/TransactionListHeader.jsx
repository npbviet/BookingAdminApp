import styles from "./TransactionListHeader.module.css";

function TransactionListHeader() {
  return (
    <div className={`${styles["header"]} ${styles["custom-border"]}`}>
      <div className={`${styles["check-box"]} ${styles["check-box-head"]}`}>
        <input type="checkbox" />
      </div>
      <div className={`${styles["transID"]}`}>ID</div>
      <div className={`${styles["user-name"]}`}>User</div>
      <div className={`${styles["hotel-name"]}`}>Hotel</div>
      <div className={`${styles["room-number"]}`}>Room</div>
      <div className={`${styles["booking-date"]}`}>Date</div>
      <div className={`${styles["total-amount"]}`}>Price</div>
      <div className={`${styles["payment-method"]}`}>Payment Method</div>
      <div
        className={`${styles["booking-status"]} ${styles["booking-status-head"]}`}
      >
        Status
      </div>
    </div>
  );
}

export default TransactionListHeader;
