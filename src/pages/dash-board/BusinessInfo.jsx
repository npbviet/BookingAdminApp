import styles from "./BusinessInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BusinessInfo({ users, orders, earnings, balance }) {
  return (
    <div className={`${styles["top-infor"]}`}>
      <div className={`${styles["top-content"]}`}>
        <p>USERS</p>
        <p>{users.toLocaleString("vi-VN")}</p>
        <div className={styles["container-icon"]}>
          <FontAwesomeIcon
            icon="fa-regular fa-user"
            className={styles["user-icon"]}
          />
        </div>
      </div>

      <div className={`${styles["top-content"]}`}>
        <p>ORDERS</p>
        <p>{orders.toLocaleString("vi-VN")}</p>
        <div className={styles["container-icon"]}>
          <FontAwesomeIcon
            icon="fa-solid fa-cart-shopping"
            className={styles["cart-icon"]}
          />
        </div>
      </div>

      <div className={`${styles["top-content"]}`}>
        <p>EARNINGS</p>
        <p>$ {earnings.toLocaleString("vi-VN")}</p>
        <div className={styles["container-icon"]}>
          <FontAwesomeIcon
            icon="fa-solid fa-coins"
            className={styles["dollar-icon"]}
          />
        </div>
      </div>

      <div className={`${styles["top-content"]}`}>
        <p>BALANCE</p>
        <p>$ {balance.toLocaleString("vi-VN")}</p>
        <div className={styles["container-icon"]}>
          <FontAwesomeIcon
            icon="fa-solid fa-wallet"
            className={styles["wallet-icon"]}
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessInfo;
