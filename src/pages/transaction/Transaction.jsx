import { useLoaderData } from "react-router-dom";
import styles from "./Transaction.module.css";
import { useEffect, useState } from "react";
import { paginate } from "../../util/hotel/hotelService";
import TransactionListHeader from "../dash-board/TransactionListHeader";
import TransactionListItem from "../dash-board//TransactionListItem";
import PagingControls from "../../components/PagingControls/PagingControls";

export default function Transaction() {
  const resData = useLoaderData();
  const transactionData = resData.transactionData;

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [listTransactions, setListTransactions] = useState(
    transactionData.slice(0, pageSize)
  );

  // Get total of page:
  const totalPage = Math.ceil(transactionData.length / pageSize);

  // This function to handler for event click of paging button
  function pagingHandler(pagingAction) {
    if (pagingAction === "previous") {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
      return;
    }

    if (pagingAction === "next") {
      if (currentPage < totalPage) setCurrentPage((prev) => prev + 1);
      return;
    }
  }

  // This Effect() hook to control paging
  useEffect(() => {
    const newList = paginate(transactionData, pageSize, currentPage);
    setListTransactions(newList);
  }, [currentPage]);

  return (
    <div className={`${styles["dash-board-container"]}`}>
      <div className={`${styles["list-transaction"]}`}>
        {transactionData?.length === 0 && (
          <div
            className={`${styles["text-infor"]} ${styles["no-transaction"]}`}
          >
            Database have not any transactions!
          </div>
        )}

        {transactionData?.length > 0 && (
          <div>
            <p className={`${styles["title-list-trans"]}`}>
              Lastest Transactions
            </p>
            <div>
              <TransactionListHeader />
              <div className={styles["container-content"]}>
                {listTransactions.map((item, index) => (
                  <TransactionListItem key={index} item={item} />
                ))}
              </div>
            </div>
            <PagingControls
              currentPage={currentPage}
              totalPage={totalPage}
              totalItems={transactionData.length}
              pagingHandler={pagingHandler}
              pageSize={pageSize}
            />
          </div>
        )}
      </div>
    </div>
  );
}
