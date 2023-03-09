import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartPage from "./Pages/StartPage";
import App from "./App";
import Buy from "./Pages/Buy";
import Sell from "./Pages/Sell";
// import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Register from "./Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/buy",
    element: <Buy />,
  },
  {
    path: "/sell",
    element: <Sell />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // {
  //   path: "/predict_price",
  // },
  // {
  //   path: "/process_data",
  // },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App></App> */}
  </React.StrictMode>
);
