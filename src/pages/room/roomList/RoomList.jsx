import RoomHeader from "./RoomHeader";
import RoomItem from "./RoomItem";
import styles from "./RoomList.module.css";

export default function RoomList({ rooms, onDelete }) {
  return (
    <div>
      <RoomHeader />
      <div className={`${styles["container-content"]} border`}>
        {rooms.length > 0 ? (
          rooms.map((room, index) => (
            <RoomItem key={index} room={room} onDelete={onDelete} />
          ))
        ) : (
          <div className={`${styles["text-infor"]} ${styles["no-room"]}`}>
            Database have not any rooms!
          </div>
        )}
      </div>
    </div>
  );
}
