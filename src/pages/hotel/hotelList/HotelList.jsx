// HotelList.jsx
import styles from "./HotelList.module.css";
import HotelHeader from "./HotelHeader";
import HotelListItem from "./HotelListItem";

export default function HotelList({ hotels, updateHotelData }) {
  if (hotels.length === 0) {
    return (
      <div className={`${styles["text-infor"]} ${styles["no-hotel"]}`}>
        Database have not any hotels!
      </div>
    );
  }

  return (
    <>
      <HotelHeader />
      <div className={`${styles["container-content"]}`}>
        {hotels.map((item, index) => (
          <HotelListItem
            key={index}
            hotel={item}
            updateHotelData={updateHotelData}
          />
        ))}
      </div>
    </>
  );
}
