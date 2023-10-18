import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BestellingOverzicht from "./pages/BestellingOverzicht.jsx";
import VoegMaaltijdToe from "./pages/voegMaaltijdToe.jsx";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
