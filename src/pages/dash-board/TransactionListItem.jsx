import styles from "./TransactionListItem.module.css";

function TransactionListItem({ item }) {
  return (
    <div className={`${styles["content"]}`}>
      <div className={`${styles["check-box"]}`}>
        <input type="checkbox" />
      </div>
      <div className={`${styles["transID"]}`}>{item._id}</div>
      <div className={`${styles["user-name"]}`}>{item.user.fullName}</div>
      <div className={`${styles["hotel-name"]}`}>{item.hotel.name}</div>
      <div className={`${styles["room-number"]}`}>
        {item.rooms
          .map((i) => i.roomOrder.map((j) => ` ${j}`))
          .toString()
          .trim()}
      </div>
      <div className={`${styles["booking-date"]}`}>{`${new Date(
        item.dateStart
      ).toLocaleDateString("vi-VN")}-${new Date(
        item.dateEnd
      ).toLocaleDateString("vi-VN")}`}</div>
      <div className={`${styles["total-amount"]}`}>${item.totalBill}</div>
      <div className={`${styles["payment-method"]}`}>{item.paymentMethod}</div>
      <div className={`${styles["booking-status"]}`}>
        <span className={`${styles["status-style"]} ${styles[item.status]}`}>
          {item.status}
        </span>
      </div>
    </div>
  );
}

export default TransactionListItem;
