import { redirect } from "react-router-dom";
import { checkLogin } from "./auth";
import { protectRouterLoader } from "../protect/routeGuard";
import {
  getAllHotels,
  getAllRooms,
  getAllTransactions,
} from "../hotel/hotelService";
import { getAllUsers } from "../users/usersManage";

// Redirect to a specific path if already logged in
export async function redirectIfAuthenticated(redirectPath) {
  const isLoggedIn = await checkLogin();
  return isLoggedIn ? redirect(redirectPath) : null;
}

// Handler for `/login` route: Redirect to home if already logged in
export async function handlerForLoginRouter() {
  return redirectIfAuthenticated("/");
}

// Helper function to enforce auth and return data
async function protectedLoader(fetchFn) {
  const [isLogout, data] = await Promise.all([
    protectRouterLoader(),
    fetchFn(),
  ]);

  return isLogout ? redirect("/admin/login") : data;
}

// Loader for `/` dashboard route
export async function loaderForDashBoard() {
  const [isLogout, userData, transactionData] = await Promise.all([
    protectRouterLoader(),
    getAllUsers(),
    getAllTransactions(),
  ]);

  if (isLogout) return redirect("/admin/login");

  const userQuantity = userData.length;
  return { userQuantity, transactionData };
}

// Loaders for hotel-related routes
export const loaderForHotel = () => protectedLoader(getAllHotels);
export const loaderForNewRoom = () => protectedLoader(getAllHotels);
export const loaderForNewHotel = () => protectedLoader(getAllRooms);
export const loaderForEditHotel = () => protectedLoader(getAllRooms);

// Loaders for room-related routes
export const loaderForRoom = () => protectedLoader(getAllRooms);

// Loader for `/transaction` route
export async function loaderForTransaction() {
  const [isLogout, userData, transactionData] = await Promise.all([
    protectRouterLoader(),
    getAllUsers(),
    getAllTransactions(),
  ]);

  if (isLogout) return redirect("/login");

  const userQuantity = userData.length;
  return { userQuantity, transactionData };
}
