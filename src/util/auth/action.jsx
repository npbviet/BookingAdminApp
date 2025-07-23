import { json } from "react-router-dom";

// 🧩 Action cho việc xác thực (authentication)
export async function loginAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const apiURL = `http://localhost:5000/admin/auth/login`;

    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return json(errorData, { status: response.status });
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    return json(
      {
        status: 500,
        message: "Login for admin process was failed!!",
      },
      { status: 500 }
    );
  }
}
