import { fetchData } from "../api/fetchData";

// This funtion to paging the results
export function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
// ✅ API gọi danh sách tất cả khách sạn
export const getAllHotels = () => fetchData(`admin/getData/get-all-hotels`);

// ✅ API gọi thông tin khách sạn theo ID
export const getHotelByID = (hotelID) =>
  fetchData(`admin/getData/get-hotel`, "POST", { hotelID });

// ✅ API gọi danh sách tất cả rooms
export async function getAllRooms() {
  const resData = await fetchData(`admin/getData/get-rooms`);
  const roomData = resData.map((i) => ({
    ...i,
    isSelected: false,
  }));

  return roomData;
}
// ✅ API gọi thông tin rooms theo ID
export const getRoomByID = (roomID) =>
  fetchData(`admin/getData/get-room-infor`, "POST", { roomID });

// ✅ API gọi danh sách tất cả transactions
export const getAllTransactions = () =>
  fetchData(`admin/getData/get-alltransactions`);

// ✅ API xóa khách sạn
export const postDeleteHotel = (hotelID) =>
  fetchData(`admin/setData/delete-hotel`, "POST", { hotelID });

// ✅ API thêm khách sạn
export const postAddNewHotel = (hotelData) =>
  fetchData(`admin/setData/add-new-hotel`, "POST", { hotelData });

// ✅ API sửa thông tin khách sạn
export const postEditHotel = (hotelData) =>
  fetchData(`admin/setData/edit-hotel`, "POST", { hotelData });

// ✅ API xóa room
export const postDeleteRoom = (roomID) =>
  fetchData(`admin/setData/delete-room`, "POST", { roomID });

// ✅ API thêm room
export const postAddNewRoom = (roomData) =>
  fetchData(`admin/setData/add-new-room`, "POST", { roomData });

// ✅ API sửa thông tin room
export const postEditRoom = (roomData) =>
  fetchData(`admin/setData/edit-room`, "POST", { roomData });
