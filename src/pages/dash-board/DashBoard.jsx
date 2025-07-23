import { useLoaderData } from "react-router-dom";
import styles from "./DashBoard.module.css";
import { useEffect, useState } from "react";
import { paginate } from "../../util/hotel/hotelService";
import TransactionListHeader from "./TransactionListHeader";
import TransactionListItem from "./TransactionListItem";
import BusinessInfo from "./BusinessInfo";
import PagingControls from "../../components/PagingControls/PagingControls";

export default function DashBoard() {
  const resData = useLoaderData();
  const transactionData = resData.transactionData;
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [listTransactions, setListTransactions] = useState(
    transactionData.slice(0, pageSize)
  );

  // Get total of page:
  const totalPage = Math.ceil(transactionData.length / pageSize);

  // Get total of day from "minCheckOutDate" to "currentDate"
  // Lọc ra các ngày checkout <= hôm nay
  const checkoutDateBeforeNowArr = transactionData
    .map((item) => {
      const checkoutDate = new Date(item.dateEnd).setHours(0, 0, 0, 0);
      return checkoutDate <= currentDate ? checkoutDate : null;
    })
    .filter((date) => date !== null);

  // Nếu không có giao dịch nào trước hôm nay, gán giá trị mặc định
  const minCheckOutDate = checkoutDateBeforeNowArr.length
    ? Math.min(...checkoutDateBeforeNowArr)
    : currentDate;

  // Tính số ngày và số tháng
  const totalDay = (currentDate - minCheckOutDate) / (1000 * 60 * 60 * 24);
  const totalMonth = totalDay / 30 < 1 ? 1 : totalDay / 30;

  // Tính các giá trị thống kê
  const users = resData.userQuantity;
  const orders = transactionData.length;
  const earnings = transactionData.reduce(
    (total, item) => total + item.totalBill,
    0
  );

  // Tính balance an toàn
  const balance = totalMonth !== 0 ? earnings / totalMonth : 0;

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
      {/* Section-1: General Information of Business */}
      <BusinessInfo
        users={users}
        orders={orders}
        earnings={earnings}
        balance={balance}
      />

      {/* Section-2: List of transactions */}
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
