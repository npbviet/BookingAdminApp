import { fetchData } from "../api/fetchData";

export async function logoutUser(navigate) {
  if (window.confirm("Do you really want to log out?")) {
    try {
      const res = await fetchData("admin/auth/logout", "GET");

      if (res?.error) {
        console.error("Logout failed:", res.message);
        return;
      }

      navigate("/admin/login");
    } catch (err) {
      console.error("Logout Error:", err);
    }
  }
}
