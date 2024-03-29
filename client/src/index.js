import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartPage from "./Pages/StartPage";
import App from "./App";
import Buy from "./Pages/Buy";
import Sell from "./Pages/Sell";
import Profile from "./Pages/Profile";
// import { CarPage } from "./Components/CarDetails/CarDetails";
import SellMyCar from "./Pages/SellMyCar";
// import CarDetails from "./Components/CarDetails/CarDetails";
// import "./App.css";
import CarPage from "./Pages/CarPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Modal from "./Components/UI/Modal/Modal";
import BuyCar from "./Pages/BuyCar";
import Rto from "./Pages/Rto";
import ErrorPage404 from "./Components/UI/UIPages/ErrorPage404";
import Customize from "./Pages/Customize";

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
    element: <Modal />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/sellmycar",
    element: <SellMyCar />,
  },
  {
    path: "/rto",
    element: <Rto />,
  },
  {
    path: "/buycar",
    element: <BuyCar />,
  },
  {
    path: "/car-information",
    element: <CarPage />,
  },
  {
    path: "/customize",
    element: <Customize />,
  },
  {
    path: "*",
    element: <ErrorPage404 />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App></App> */}
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import StartPage from "./Pages/StartPage";
// import App from "./App";
// import Buy from "./Pages/Buy";
// import Sell from "./Pages/Sell";
// import Profile from "./Pages/Profile";
// // import { CarPage } from "./Components/CarDetails/CarDetails";
// import SellMyCar from "./Pages/SellMyCar";
// // import CarDetails from "./Components/CarDetails/CarDetails";
// // import "./App.css";
// import CarPage from "./Pages/CarPage";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
// import Register from "./Components/UI/Modal/Register";
// import BuyCar from "./Pages/BuyCar";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/buy",
//     element: <Buy />,
//   },
//   {
//     path: "/sell",
//     element: <Sell />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
//   {
//     path: "/sellmycar",
//     element: <SellMyCar />,
//   },
//   {
//     path: "/buycar",
//     element: <BuyCar />,
//   },
//   {
//     path: "/car-information",
//     element: <CarPage />,
//   },
// ]);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//     {/* <App></App> */}
//   </React.StrictMode>
// );
