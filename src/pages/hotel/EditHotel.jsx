import styles from "./EditHotel.module.css";
import {
  Form,
  NavLink,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getHotelByID, postEditHotel } from "../../util/hotel/hotelService";
import { checkLogin } from "../../util/auth/auth";
import Input from "../../components/Input/Input";

export default function EditHotel() {
  const location = useLocation();
  const [isChangeForm, setIsChangeForm] = useState(false);
  const hotelID = location.state?.hotelID;
  const [hotelData, setHotelData] = useState(null);
  const [selectFeature, setSelectFeature] = useState("");
  const [newRoomIDArr, setNewRoomIDArr] = useState([]);
  const [listRooms, setListRooms] = useState(useLoaderData());
  const navigate = useNavigate();

  const nameRef = useRef();
  const cityRef = useRef();
  const distanceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const roomRef = useRef();
  const typeRef = useRef();
  const addressRef = useRef();
  const titleRef = useRef();
  const priceRef = useRef();
  const featureRef = useRef();
  const rateRef = useRef();

  function selectRoomItemHandler(index) {
    setIsChangeForm(true);
    const updatedRooms = listRooms.map((room, i) =>
      i === index ? { ...room, isSelected: !room.isSelected } : room
    );
    setListRooms(updatedRooms);
  }

  function validateInputForm(refInput, messageText) {
    if (refInput.current.value.trim() === "") {
      alert(messageText);
      return "stop";
    }
  }

  async function onClickHandlerSaveButton() {
    const listImage = [];
    const listImageEL = document.getElementById("listImage");
    listImageEL.querySelectorAll("input").forEach((input) => {
      if (input.value !== "") listImage.push(input.value);
    });

    imageRef.current.value = listImage.length > 0 ? listImage : "";
    roomRef.current.value = newRoomIDArr.length > 0 ? newRoomIDArr : "";

    const valueInputArr = [
      { valueInput: nameRef, messageText: 'Enter value for "Name" input' },
      { valueInput: cityRef, messageText: 'Enter value for "City" input' },
      {
        valueInput: distanceRef,
        messageText: 'Enter value for "Distance" input',
      },
      {
        valueInput: descriptionRef,
        messageText: 'Enter value for "Description" input',
      },
      { valueInput: imageRef, messageText: 'Enter value for "Image" input' },
      { valueInput: typeRef, messageText: 'Enter value for "Type" input' },
      {
        valueInput: addressRef,
        messageText: 'Enter value for "Address" input',
      },
      { valueInput: titleRef, messageText: 'Enter value for "Title" input' },
      { valueInput: priceRef, messageText: 'Enter value for "Price" input' },
      {
        valueInput: featureRef,
        messageText: 'Select value for "Feature" input',
      },
      { valueInput: roomRef, messageText: 'Select value for "Rooms" input' },
      { valueInput: rateRef, messageText: 'Select value for "Rate" input' },
    ];

    if (priceRef.current.value < 1) {
      alert('Value of "Price" input must be greater than 0');
      return;
    }

    if (distanceRef.current.value < 0) {
      alert('Value of "Distance" input must be greater than or equal to 0');
      return;
    }

    if (rateRef.current.value < 0 || rateRef.current.value > 10) {
      alert('Value of "Rate" input must be between 0 and 10');
      return;
    }

    for (let i = 0; i < valueInputArr.length; i++) {
      const validateResult = validateInputForm(
        valueInputArr[i].valueInput,
        valueInputArr[i].messageText
      );
      if (validateResult === "stop") return;
    }

    const hotelData = {
      _id: hotelID,
      address: addressRef.current.value,
      cheapestPrice: priceRef.current.value,
      city: cityRef.current.value,
      desc: descriptionRef.current.value,
      distance: distanceRef.current.value,
      featured: featureRef.current.value,
      name: nameRef.current.value,
      photos: listImage,
      rooms: newRoomIDArr,
      title: titleRef.current.value,
      type: typeRef.current.value,
      rating: rateRef.current.value,
    };

    const isLoggedIn = await checkLogin();
    if (isLoggedIn) {
      await postEditHotel(hotelData);
      navigate("/hotel");
    } else {
      navigate("/admin/login");
    }
  }

  function onChangeFeatureHandler(event) {
    const currentValue = event.target.value;
    setSelectFeature(currentValue);
  }

  useEffect(() => {
    if (hotelID) {
      getHotelByID(hotelID).then((hotel) => {
        nameRef.current.value = hotel.name;
        cityRef.current.value = hotel.city;
        distanceRef.current.value = hotel.distance;
        descriptionRef.current.value = hotel.desc;
        typeRef.current.value = hotel.type;
        addressRef.current.value = hotel.address;
        titleRef.current.value = hotel.title;
        priceRef.current.value = hotel.cheapestPrice;
        rateRef.current.value = hotel.rating;
        setSelectFeature(hotel.featured);

        const newListRoom = listRooms.map((room) => {
          return {
            ...room,
            isSelected: hotel.rooms.map((i) => i._id).includes(room._id),
          };
        });
        setListRooms(newListRoom);
        setHotelData(hotel);
      });
    }
  }, []);

  useEffect(() => {
    const selectedRooms = listRooms
      .filter((room) => room.isSelected)
      .map((room) => room._id);
    setNewRoomIDArr(selectedRooms);
  }, [listRooms]);

  function onSubmitHandler(event) {
    event.preventDefault();
  }

  function onChangeFormHandler() {
    setIsChangeForm(true);
  }

  return (
    <div className={styles["page-container"]}>
      <div className={styles["top-title"]}>Edit Hotel</div>

      {!hotelID && (
        <div className={styles["instruction"]}>
          <p className={styles["title"]}>
            To edit a hotel, please follow these steps:{" "}
          </p>
          <ul className={styles["content"]}>
            <li>Access the "Hotels" page</li>
            <li>Select a hotel and click the "Edit" button</li>
            <li>Fill out the form and click "Save"</li>
          </ul>
        </div>
      )}

      {hotelID && (
        <Form onSubmit={onSubmitHandler} onChange={onChangeFormHandler}>
          <div className={styles["form-add-new"]}>
            <div className={styles["flex-container"]}>
              <div className={styles["input-group"]}>
                <Input label="Name" placeholder="My Hotel" ref={nameRef} />
                <Input label="City" placeholder="New York" ref={cityRef} />
                <Input
                  label="Distance from city center"
                  type="number"
                  placeholder="500"
                  min={0}
                  ref={distanceRef}
                />
                <Input
                  label="Description"
                  placeholder="Description"
                  ref={descriptionRef}
                />
                <div
                  className={`${styles["input-item"]} ${styles["flex-input"]}`}
                >
                  <label>Image</label>
                  <input type="hidden" ref={imageRef} />
                  <div id="listImage" className={styles["image-input"]}>
                    {hotelData &&
                      hotelData.photos.map((i, index) => (
                        <input key={index} type="text" defaultValue={i} />
                      ))}
                  </div>
                </div>
              </div>

              <div className={styles["input-group"]}>
                <Input label="Type" placeholder="hotel" ref={typeRef} />
                <Input
                  label="Address"
                  placeholder="Elton st, 216"
                  ref={addressRef}
                />
                <Input
                  label="Title"
                  placeholder="The best hotel"
                  ref={titleRef}
                />
                <Input
                  label="Price"
                  placeholder="100"
                  type="number"
                  min={1}
                  ref={priceRef}
                />
                <div
                  className={`${styles["input-item"]} ${styles["flex-input"]}`}
                >
                  <label>Featured</label>
                  <select
                    className={styles["feature"]}
                    ref={featureRef}
                    value={selectFeature}
                    onChange={onChangeFeatureHandler}
                  >
                    <option value={""} hidden={true}></option>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
                <Input
                  label="Rate"
                  placeholder="5"
                  type="number"
                  min={0}
                  max={10}
                  ref={rateRef}
                />
              </div>
            </div>

            <div>
              <input type="hidden" ref={roomRef} />
              <label>Rooms</label>
              <ul className={styles["list-rooms"]}>
                {hotelData &&
                  listRooms.map((item, index) => (
                    <li
                      key={index}
                      className={
                        styles[item.isSelected ? "selected-item" : null]
                      }
                      onClick={() => selectRoomItemHandler(index)}
                    >
                      {item.title}
                    </li>
                  ))}
              </ul>
            </div>

            <div className={styles["button-control"]}>
              {isChangeForm ? (
                <button
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
              <NavLink className={styles["cancel-btn"]} to={"/hotel"}>
                Cancel
              </NavLink>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
}
