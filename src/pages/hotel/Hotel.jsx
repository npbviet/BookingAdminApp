// Hotel.jsx
import { NavLink, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Hotel.module.css";
import { paginate } from "../../util/hotel/hotelService";
import HotelList from "./hotelList/HotelList";
import PagingControls from "../../components/PagingControls/PagingControls";

export default function Hotel() {
  const resData = useLoaderData();
  const [hotelData, setHotelData] = useState(resData);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [listHotels, setListHotels] = useState(hotelData.slice(0, pageSize));

  const totalPage = Math.ceil(hotelData.length / pageSize);

  function pagingHandler(pagingAction) {
    if (pagingAction === "previous" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
    if (pagingAction === "next" && currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    let newList = paginate(hotelData, pageSize, currentPage);
    if (newList.length === 0 && pageSize > 1) {
      setCurrentPage((prev) => prev - 1);
      newList = paginate(hotelData, pageSize, currentPage - 1);
    }
    setListHotels(newList);
  }, [currentPage, hotelData]);

  return (
    <div className={styles["dash-board-container"]}>
      <div className={styles["list-hotel"]}>
        <div>
          <div className={`${styles["head-list-hotel"]} rows`}>
            <p className={styles["title-list-hotel"]}>Hotels List</p>
            <NavLink className={styles["new-hotel-btn"]} to={"new-hotel"}>
              Add New
            </NavLink>
          </div>

          <HotelList hotels={listHotels} updateHotelData={setHotelData} />
        </div>

        {totalPage > 1 && (
          <PagingControls
            currentPage={currentPage}
            totalPage={totalPage}
            totalItems={hotelData.length}
            pagingHandler={pagingHandler}
            pageSize={pageSize}
          />
        )}
      </div>
    </div>
  );
}
