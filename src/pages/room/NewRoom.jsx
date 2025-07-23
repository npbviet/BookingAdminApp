import { useLoaderData, useNavigate } from "react-router-dom";
import styles from "./NewRoom.module.css";
import { useRef, useState, useCallback } from "react";
import { postAddNewRoom } from "../../util/hotel/hotelService";
import { checkLogin } from "../../util/auth/auth";

export default function NewRoom() {
  const hotels = useLoaderData();
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState("");

  // Refs for form inputs
  const titleRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const maxPeopleRef = useRef();
  const roomRef = useRef();
  const hotelRef = useRef();

  const validateRequiredField = (ref, message) => {
    if (!ref.current.value.trim()) {
      alert(message);
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const fields = [
      { ref: titleRef, message: 'Enter value for "Title"' },
      { ref: priceRef, message: 'Enter value for "Price"' },
      { ref: descRef, message: 'Enter value for "Description"' },
      { ref: maxPeopleRef, message: 'Enter value for "Max People"' },
      { ref: roomRef, message: 'Enter value for "Rooms"' },
      { ref: hotelRef, message: "Select a hotel" },
    ];

    for (const field of fields) {
      if (!validateRequiredField(field.ref, field.message)) return false;
    }

    const price = parseFloat(priceRef.current.value);
    if (isNaN(price) || price < 1) {
      alert('"Price" must be a number >= 1');
      return false;
    }

    const maxPeople = parseInt(maxPeopleRef.current.value, 10);
    if (isNaN(maxPeople) || maxPeople < 1 || maxPeople > 6) {
      alert('"Max People" must be between 1 and 6');
      return false;
    }

    const roomValue = roomRef.current.value.trim();
    const roomRegex = /^[\w\s]+(,[\w\s]+)*$/;
    if (!roomRegex.test(roomValue)) {
      alert("Invalid room numbers format. Example: 101, 102");
      return false;
    }

    return true;
  };

  const handleRoomBlur = () => {
    const value = roomRef.current.value.trim();
    const regex = /^[\w\s]+(,[\w\s]+)*$/;
    if (value && !regex.test(value)) {
      alert("Invalid format. Example: 101, 102");
      roomRef.current.value = "";
    }
  };

  const handleHotelChange = useCallback((e) => {
    setSelectedHotel(e.target.value);
  }, []);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const data = {
      roomData: {
        title: titleRef.current.value.trim(),
        desc: descRef.current.value.trim(),
        price: parseFloat(priceRef.current.value),
        maxPeople: parseInt(maxPeopleRef.current.value, 10),
        roomNumbers: roomRef.current.value.replace(/\s+/g, "").split(","),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      hotelID: hotelRef.current.value,
    };

    try {
      const loggedIn = await checkLogin();
      if (loggedIn) {
        await postAddNewRoom(data);
        navigate("/room");
      } else {
        navigate("/admin/login");
      }
    } catch (err) {
      console.error("Failed to add room:", err);
      alert("Failed to add room. Please try again.");
    }
  };

  return (
    <div className={styles["page-container"]}>
      <div className={styles["top-title"]}>Add New Room</div>
      <div className={styles["form-add-new"]}>
        <div className={styles["flex-container"]}>
          <div className={styles["input-group"]}>
            <div className={`${styles["input-item"]} ${styles["flex-input"]}`}>
              <label>Title</label>
              <input type="text" placeholder="2 bed room" ref={titleRef} />
            </div>
            <div className={`${styles["input-item"]} ${styles["flex-input"]}`}>
              <label>Price</label>
              <input type="number" min={1} placeholder="100" ref={priceRef} />
            </div>
          </div>

          <div className={styles["input-group"]}>
            <div className={`${styles["input-item"]} ${styles["flex-input"]}`}>
              <label>Description</label>
              <input
                type="text"
                placeholder="King size bed, 1 bathroom"
                ref={descRef}
              />
            </div>
            <div className={`${styles["input-item"]} ${styles["flex-input"]}`}>
              <label>Max People</label>
              <input
                type="number"
                min={1}
                max={6}
                placeholder="2"
                ref={maxPeopleRef}
              />
            </div>
          </div>
        </div>

        <div className={styles["row-container"]}>
          <div className={styles["flex-input"]}>
            <label>Rooms</label>
            <textarea
              className={styles["room-number"]}
              placeholder="Give comma between room numbers"
              ref={roomRef}
              onBlur={handleRoomBlur}
            />
          </div>

          <div
            className={`${styles["input-item"]} ${styles["list-hotel-container"]}`}
          >
            <label>Choose a hotel</label>
            <select
              className={styles["list-hotel"]}
              ref={hotelRef}
              value={selectedHotel}
              onChange={handleHotelChange}
            >
              <option value="" hidden>
                Choose a hotel
              </option>
              {hotels?.map((hotel) => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </div>

          <button className={styles["send-btn"]} onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
