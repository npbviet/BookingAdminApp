// HotelListItem.jsx
import styles from "./HotelListItem.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { checkLogin } from "../../../util/auth/auth";
import {
  postDeleteHotel,
  getAllHotels,
} from "../../../util/hotel/hotelService";

export default function HotelListItem({ hotel, updateHotelData }) {
  const navigate = useNavigate();

  async function deleteHotelHandler() {
    const isLoggedIn = await checkLogin();
    if (isLoggedIn) {
      const confirm = window.confirm("Do you realy want to delete this hotel?");
      if (confirm) {
        const resData = await postDeleteHotel(hotel._id);
        const resMessage = resData.message;
        if (resMessage === "Hotel is booked") {
          alert("This hotel has been booked, you can not delete it!");
        } else {
          const newDataOfHotel = await getAllHotels();
          updateHotelData(newDataOfHotel);
        }
      }
    } else {
      navigate("/admin/login");
    }
  }

  return (
    <div className={`${styles["content"]}`}>
      <div className={styles["check-box"]}>
        <input type="checkbox" />
      </div>
      <div className={styles["hotelID"]}>{hotel._id}</div>
      <div className={styles["hotel-name"]}>{hotel.name}</div>
      <div className={styles["hotel-type"]}>{hotel.type}</div>
      <div className={styles["hotel-title"]}>{hotel.title}</div>
      <div className={styles["city"]}>{hotel.city}</div>
      <div className={styles["action"]}>
        <button className={styles["delete-btn"]} onClick={deleteHotelHandler}>
          Delete
        </button>
        <NavLink
          to={"edit-hotel"}
          state={{ hotelID: hotel._id }}
          className={styles["edit-btn"]}
        >
          Edit
        </NavLink>
      </div>
    </div>
  );
}
