import { forwardRef } from "react";
import styles from "./Input.module.css"; // bạn có thể đổi file CSS tùy ý

const Input = forwardRef(({ label, placeholder, type = "text", min }, ref) => {
  return (
    <div className={`${styles["input-item"]} ${styles["flex-input"]}`}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        min={min}
        className={styles["input"]}
      />
    </div>
  );
});

export default Input;
