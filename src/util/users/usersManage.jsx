import { fetchData } from "../api/fetchData";

// ✅ API gọi danh sách khách sạn
export const getAllUsers = () => fetchData(`admin/getData/get-users`);
