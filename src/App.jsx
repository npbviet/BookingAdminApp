import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ErrorPage from "./pages/errorpage/ErrorPage";
import DashBoard from "./pages/dash-board/DashBoard";
import Login from "./pages/login/Login";
import Hotel from "./pages/hotel/Hotel";
import NewHotel from "./pages/hotel/NewHotel";
import Room from "./pages/room/Room";
import NewRoom from "./pages/room/NewRoom";
import Transaction from "./pages/transaction/Transaction";
import EditHotel from "./pages/hotel/EditHotel";
import EditRoom from "./pages/room/EditRoom";

import { loginAction } from "./util/auth/action";
import {
  handlerForLoginRouter,
  loaderForDashBoard,
  loaderForHotel,
  loaderForNewHotel,
  loaderForNewRoom,
  loaderForRoom,
  loaderForTransaction,
} from "./util/auth/loader";
import { protectRouterLoader } from "./util/protect/routeGuard";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);
const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
    action: loginAction,
    loader: handlerForLoginRouter,
  },
  {
    path: "/",
    // errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: "",
        element: <DashBoard />,
        loader: loaderForDashBoard,
      },
      {
        path: "hotel",
        element: <Hotel />,
        loader: loaderForHotel,
      },
      {
        path: "hotel/new-hotel",
        element: <NewHotel />,
        loader: loaderForNewHotel,
      },
      {
        path: "hotel/edit-hotel",
        element: <EditHotel />,
        loader: loaderForNewHotel,
      },
      {
        path: "room",
        element: <Room />,
        loader: loaderForRoom,
      },
      {
        path: "room/new-room",
        element: <NewRoom />,
        loader: loaderForNewRoom,
      },
      {
        path: "room/edit-room",
        element: <EditRoom />,
        loader: protectRouterLoader,
      },
      {
        path: "transactions",
        element: <Transaction />,
        loader: loaderForTransaction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
