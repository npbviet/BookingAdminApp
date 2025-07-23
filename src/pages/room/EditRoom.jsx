import styles from "./EditRoom.module.css";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getRoomByID, postEditRoom } from "../../util/hotel/hotelService";
import { checkLogin } from "../../util/auth/auth";

export default function EditRoom() {
  const location = useLocation();
  const roomID = location.state?.roomID;
  const navigate = useNavigate();
  const [isChangeForm, setIsChangeForm] = useState(false);

  // Refs
  const maxPeopleRef = useRef();
  const descRef = useRef();
  const roomRef = useRef();
  const titleRef = useRef();
  const priceRef = useRef();

  // Load data when mount
  useEffect(() => {
    if (!roomID) return;

    getRoomByID(roomID).then((room) => {
      if (room) {
        maxPeopleRef.current.value = room.maxPeople || "";
        descRef.current.value = room.desc || "";
        titleRef.current.value = room.title || "";
        priceRef.current.value = room.price || "";
        roomRef.current.value = room.roomNumbers?.join(", ") || "";
      }
    });
  }, [roomID]);

  const validateField = (ref, message) => {
    if (!ref.current.value.trim()) {
      alert(message);
      return false;
    }
    return true;
  };

  const onBlurHandlerRoomInput = () => {
    const input = roomRef.current.value;
    const regex = /^[\w\s]+(,[\w\s]+)*$/;
    if (input && !regex.test(input)) {
      alert("Invalid room numbers. Use commas. Example: 101, 102, 103");
      roomRef.current.value = "";
    }
  };

  const onClickHandlerSaveButton = async () => {
    if (
      ![
        validateField(titleRef, 'Enter "Title"'),
        validateField(priceRef, 'Enter "Price"'),
        validateField(maxPeopleRef, 'Enter "Max People"'),
        validateField(descRef, 'Enter "Description"'),
        validateField(roomRef, 'Enter "Room Numbers"'),
      ].every(Boolean)
    )
      return;

    const price = parseFloat(priceRef.current.value);
    if (price < 1) {
      alert('"Price" must be >= 1');
      return;
    }

    const maxPeople = parseInt(maxPeopleRef.current.value);
    if (maxPeople < 1 || maxPeople > 6) {
      alert('"Max People" must be between 1 and 6');
      return;
    }

    const roomData = {
      _id: roomID,
      title: titleRef.current.value.trim(),
      price,
      desc: descRef.current.value.trim(),
      maxPeople,
      roomNumbers: roomRef.current.value
        .split(",")
        .map((num) => num.trim())
        .filter(Boolean),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isLoggedIn = await checkLogin();
    if (isLoggedIn) {
      await postEditRoom(roomData);
      navigate("/room");
    } else {
      navigate("/admin/login");
    }
  };

  const onSubmitHandler = (e) => e.preventDefault();
  const onChangeFormHandler = () => setIsChangeForm(true);

  if (!roomID) {
    return (
      <div className={styles["page-container"]}>
        <div className={styles["top-title"]}>Edit Room</div>
        <div className={styles["instruction"]}>
          <p className={styles["title"]}>To edit a room, please:</p>
          <ul className={styles["content"]}>
            <li>Go to "Rooms" page</li>
            <li>Click "Edit" on a room</li>
            <li>Edit the form and click "Save"</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["page-container"]}>
      <div className={styles["top-title"]}>Edit Room</div>
      <Form onSubmit={onSubmitHandler} onChange={onChangeFormHandler}>
        <div className={styles["form-add-new"]}>
          <div className={styles["flex-container"]}>
            <div className={styles["input-group"]}>
              <div
                className={`${styles["input-item"]} ${styles["flex-input"]}`}
              >
                <label>Title</label>
                <input type="text" placeholder="Room title" ref={titleRef} />
              </div>
              <div
                className={`${styles["input-item"]} ${styles["flex-input"]}`}
              >
                <label>Price</label>
                <input type="number" placeholder="100" min={1} ref={priceRef} />
              </div>
            </div>
            <div className={styles["input-group"]}>
              <div
                className={`${styles["input-item"]} ${styles["flex-input"]}`}
              >
                <label>Max People</label>
                <input
                  type="number"
                  placeholder="1-6"
                  min={1}
                  max={6}
                  ref={maxPeopleRef}
                />
              </div>
              <div
                className={`${styles["input-item"]} ${styles["flex-input"]}`}
              >
                <label>Description</label>
                <input type="text" placeholder="Description" ref={descRef} />
              </div>
            </div>
          </div>

          <div className={styles["flex-input"]}>
            <label>Rooms</label>
            <textarea
              className={styles["room-number"]}
              placeholder="Example: 101, 102, 103"
              ref={roomRef}
              onBlur={onBlurHandlerRoomInput}
            />
          </div>

          <div className={styles["button-control"]}>
            {isChangeForm ? (
              <button
                type="button"
                className={`${styles["send-btn"]} ${styles["active"]}`}
                onClick={onClickHandlerSaveButton}
              >
                Save
              </button>
            ) : (
              <span className={`${styles["send-btn"]} ${styles["disable"]}`}>
                Save
              </span>
            )}
            <Link className={styles["cancel-btn"]} to="/room">
              Cancel
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
