import { useLoaderData, useNavigate } from "react-router-dom";
import styles from "./NewHotel.module.css";
import { useEffect, useRef, useState } from "react";
import { postAddNewHotel } from "../../util/hotel/hotelService";
import { checkLogin } from "../../util/auth/auth";
import Input from "../../components/Input/Input";

export default function NewHotel() {
  const listRooms = useLoaderData();
  const navigate = useNavigate();
  const [selectFeature, setSelectFeature] = useState("");
  const [selectedRoomIds, setSelectedRoomIds] = useState([]);
  const [formError, setFormError] = useState("");

  // Refs
  const refs = {
    name: useRef(),
    city: useRef(),
    distance: useRef(),
    description: useRef(),
    image: useRef(),
    type: useRef(),
    address: useRef(),
    title: useRef(),
    price: useRef(),
    feature: useRef(),
  };

  const validateImageInput = () => {
    const imageLines = refs.image.current.value
      .split(/\n|,/)
      .map((line) => line.trim())
      .filter((line) => line !== "");
    const regex = /^http[s]?:\/\/[^,\n]+$/;
    const isValid = imageLines.every((line) => regex.test(line));

    if (!isValid) {
      alert(
        `Image URL is invalid. Each URL must:\n- Begin with "http" or "https"\n- Not contain commas\n- Be on its own line\n\nExample:\nhttp://image1.jpg\nhttp://image2.jpg`
      );
      refs.image.current.value = "";
    }
  };

  const handleRoomSelect = (roomId) => {
    setSelectedRoomIds((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    );
  };

  const validateForm = () => {
    const requiredFields = [
      { ref: refs.name, name: "Name" },
      { ref: refs.city, name: "City" },
      { ref: refs.distance, name: "Distance" },
      { ref: refs.description, name: "Description" },
      { ref: refs.image, name: "Image" },
      { ref: refs.type, name: "Type" },
      { ref: refs.address, name: "Address" },
      { ref: refs.title, name: "Title" },
      { ref: refs.price, name: "Price" },
      { ref: refs.feature, name: "Featured" },
    ];

    for (let field of requiredFields) {
      if (!field.ref.current.value.trim()) {
        return `Please enter value for "${field.name}"`;
      }
    }

    if (selectedRoomIds.length === 0) {
      return "Please select at least one room";
    }

    if (parseFloat(refs.price.current.value) < 1) {
      return 'Price must be at least "1"';
    }

    if (parseFloat(refs.distance.current.value) < 0) {
      return "Distance must be 0 or more";
    }

    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    const newHotel = {
      name: refs.name.current.value,
      city: refs.city.current.value,
      distance: refs.distance.current.value,
      desc: refs.description.current.value,
      photos: refs.image.current.value
        .split(/\n|,/)
        .map((line) => line.trim())
        .filter((line) => line !== ""),
      type: refs.type.current.value,
      address: refs.address.current.value,
      title: refs.title.current.value,
      cheapestPrice: refs.price.current.value,
      featured: refs.feature.current.value === "true",
      rooms: selectedRoomIds,
      rating: 0,
    };

    const isLoggedIn = await checkLogin();
    if (!isLoggedIn) return navigate("/admin/login");

    await postAddNewHotel(newHotel);
    navigate("/hotel");
  };

  useEffect(() => {
    setSelectedRoomIds([]);
  }, []);

  return (
    <div className={styles["page-container"]}>
      <div className={styles["top-title"]}>Add New Hotel</div>
      <div className={styles["form-add-new"]}>
        <div className={styles["flex-container"]}>
          {/* Left Column */}
          <div className={styles["input-group"]}>
            <Input label="Name" ref={refs.name} placeholder="My Hotel" />
            <Input label="City" ref={refs.city} placeholder="New York" />
            <Input
              label="Distance from city center"
              ref={refs.distance}
              type="number"
              min={0}
              placeholder="500"
            />
            <Input
              label="Description"
              ref={refs.description}
              placeholder="Description"
            />
            <div className={`${styles["input-item"]} ${styles["flex-input"]}`}>
              <label>Image</label>
              <textarea
                ref={refs.image}
                onBlur={validateImageInput}
                className={styles["image-input"]}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className={styles["input-group"]}>
            <Input label="Type" ref={refs.type} placeholder="hotel" />
            <Input
              label="Address"
              ref={refs.address}
              placeholder="Elton st, 216"
            />
            <Input
              label="Title"
              ref={refs.title}
              placeholder="The best hotel"
            />
            <Input
              label="Price"
              ref={refs.price}
              type="number"
              min={1}
              placeholder="100"
            />
            <div className={`${styles["input-item"]} ${styles["flex-input"]}`}>
              <label>Featured</label>
              <select
                ref={refs.feature}
                value={selectFeature}
                onChange={(e) => setSelectFeature(e.target.value)}
                className={styles["feature"]}
              >
                <option value={""} hidden />
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rooms */}
        <div>
          <label>Rooms</label>
          <ul className={styles["list-rooms"]}>
            {listRooms.map((room, idx) => (
              <li
                key={idx}
                className={
                  selectedRoomIds.includes(room._id)
                    ? styles["selected-item"]
                    : undefined
                }
                onClick={() => handleRoomSelect(room._id)}
              >
                {room.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button className={styles["send-btn"]} onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}
