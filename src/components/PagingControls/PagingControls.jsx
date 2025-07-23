import styles from "./PagingControls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PagingControls({
  currentPage,
  totalPage,
  pagingHandler,
  totalItems,
  pageSize,
}) {
  // const pageSize = 8;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const disablePrev = currentPage === 1 ? "disable" : "";
  const disableNext = currentPage === totalPage ? "disable" : "";

  return (
    <div className={`${styles["paging-container"]}`}>
      <div className={`${styles["paging-control"]}`}>
        <span>
          {startIndex + 1}-{endIndex} of {totalItems}
        </span>
        <FontAwesomeIcon
          icon="fa-solid fa-chevron-left"
          className={`${styles["previous-page"]} ${styles[disablePrev]}`}
          onClick={() => pagingHandler("previous")}
        />
        <FontAwesomeIcon
          icon="fa-solid fa-chevron-right"
          className={`${styles["next-page"]} ${styles[disableNext]}`}
          onClick={() => pagingHandler("next")}
        />
      </div>
    </div>
  );
}
export default PagingControls;
