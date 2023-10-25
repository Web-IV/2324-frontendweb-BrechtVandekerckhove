import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BestellingOverzicht from "./pages/BestellingOverzicht.jsx";
import VoegMaaltijdToe from "./pages/voegMaaltijdToe.jsx";
import WinkelmandjePagina from "./pages/WinkelmandjePagina.jsx";
import NotFound from "./pages/NotFound.jsx";
import BewerkMaaltijd from "./components/Winkelmandje/BewerkMaaltijd.jsx";
import Winkelmandje from "./components/Winkelmandje/WinkelmandjeOverzicht.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <VoegMaaltijdToe />,
      },
      {
        path: "bestellingen",
        element: <BestellingOverzicht />,
      },
      {
        path: "winkelmandje",
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
