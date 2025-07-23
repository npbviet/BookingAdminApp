import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import styles from "./Room.module.css";
import { useEffect, useState } from "react";
import {
  getAllRooms,
  paginate,
  postDeleteRoom,
} from "../../util/hotel/hotelService";
import { checkLogin } from "../../util/auth/auth";
import RoomList from "./roomList/RoomList";
import PagingControls from "../../components/PagingControls/PagingControls";
export default function Room() {
  const resData = useLoaderData();
  const [roomData, setRoomData] = useState(resData);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [listRooms, setListRooms] = useState(roomData.slice(0, pageSize));
  const navigate = useNavigate();
  const totalPage = Math.ceil(roomData.length / pageSize);

  function pagingHandler(pagingAction) {
    if (pagingAction === "previous" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (pagingAction === "next" && currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  async function deleteRoomHandler(roomID) {
    const isLoggedIn = await checkLogin();
    if (!isLoggedIn) return navigate("/admin/login");

    const confirmDelete = window.confirm(
      "Do you realy want to delete this room?"
    );
    if (!confirmDelete) return;

    const resData = await postDeleteRoom(roomID);
    if (resData.message === "Room is booked") {
      alert("This room has been booked, you can not delete it!");
    } else {
      const newDataOfRoom = await getAllRooms();
      setRoomData(newDataOfRoom);
    }
  }

  useEffect(() => {
    let newList = paginate(roomData, pageSize, currentPage);

    if (newList.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      newList = paginate(roomData, pageSize, currentPage - 1);
    }

    setListRooms(newList);
  }, [currentPage, roomData]);

  return (
    <div className={styles["dash-board-container"]}>
      <div className={styles["list-room"]}>
        <div>
          <div className={styles["head-list-room"]}>
            <p className={styles["title-list-room"]}>Rooms List</p>
            <NavLink className={styles["new-room-btn"]} to="new-room">
              Add New
            </NavLink>
          </div>
          <RoomList rooms={listRooms} onDelete={deleteRoomHandler} />
        </div>
        {totalPage > 1 && (
          <PagingControls
            currentPage={currentPage}
            totalPage={totalPage}
            pagingHandler={pagingHandler}
            totalItems={roomData.length}
            pageSize={pageSize}
          />
        )}
      </div>
    </div>
  );
}
