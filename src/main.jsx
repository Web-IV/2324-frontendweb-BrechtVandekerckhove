import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Navigate } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BestellingenPagina from "./pages/Bestellingen.jsx";
import HomePagina from "./pages/Home.jsx";
import WinkelmandjePagina from "./pages/Winkelmandje.jsx";
import Profiel from "./pages/Profiel.jsx";
import NotFound from "./pages/NotFound.jsx";
import BewerkMaaltijd from "./components/Winkelmandje/BewerkMaaltijd.jsx";
import Winkelmandje from "./components/Winkelmandje/WinkelmandjeOverzicht.jsx";
import { AuthProvider } from "./contexts/Auth.context";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Register from "./pages/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/maaltijdkeuze" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/maaltijdkeuze",
        element: <PrivateRoute />,
        children: [{ index: true, element: <HomePagina /> }],
      },
      {
        path: "bestellingen",
        element: <PrivateRoute />,
        children: [{ index: true, element: <BestellingenPagina /> }],
      },
      {
        path: "profiel",
        element: <PrivateRoute />,
        children: [{ index: true, element: <Profiel /> }],
      },
      {
        path: "winkelmandje",
        element: <PrivateRoute />,
        children: [
          {
            element: <WinkelmandjePagina />,
            children: [
              {
                path: "",
                index: true,
                element: <Winkelmandje />,
              },
              {
                path: "bewerk/:id",
                element: <BewerkMaaltijd />,
              },
            ],
          },
        ],
      },
      {
        path: "bewerkMaaltijd",
        element: <BewerkMaaltijd />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
