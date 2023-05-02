import React from "react";

import Navbar from "../Components/Navbar/Navbar";
import Table from "../Components/UI/Tables/Table";

function Customize() {
  return (
    <>
      <Navbar />
      <table class="w-full text-8xl text-left text-gray-500 dark:text-gray-400">
        <thead class="text-4xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Garage name
            </th>
            <th scope="col" class="px-6 py-3">
              Owner
            </th>
            <th scope="col" class="px-6 py-3">
              Address
            </th>
            <th scope="col" class="px-6 py-3">
              Contact
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Rating</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-2xl bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
            >
              Ajmera Honda
            </th>
            <td class="px-6 py-4">Amrinder sokhi</td>
            <td class="px-6 py-4">9898283442</td>
            <td class="px-6 py-4">Ram Bhavan, Dharampeth Nagpur</td>
            <td class="px-6 py-4 text-right">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                4.8
              </a>
            </td>
          </tr>
          <tr class="text-2xl bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
            >
              Sai Garage
            </th>
            <td class="px-6 py-4">Guddu Mishra</td>
            <td class="px-6 py-4">7887778733</td>
            <td class="px-6 py-4">32, Near Shanivar wada sadashivpeth, Pune</td>
            <td class="px-6 py-4 text-right">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                3.9
              </a>
            </td>
          </tr>
          <tr class="text-2xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
            >
              Guru Gobind Car Garage
            </th>
            <td class="px-6 py-4">Harpal Kour</td>
            <td class="px-6 py-4">7886678333</td>
            <td class="px-6 py-4">32, Near Shanivar wada sadashivpeth, Pune</td>
            <td class="px-6 py-4 text-right">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                4.3
              </a>
            </td>
          </tr>
          <tr class="text-2xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
            >
              Samartha Garage
            </th>
            <td class="px-6 py-4">Shridhar Lele</td>
            <td class="px-6 py-4">9886678321</td>
            <td class="px-6 py-4">32, Near Shanivar wada sadashivpeth, Pune</td>
            <td class="px-6 py-4 text-right">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                4.7
              </a>
            </td>
          </tr>
          <tr class="text-2xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
            >
              Nice Auto Garage
            </th>
            <td class="px-6 py-4">Mr. Jaiswal</td>
            <td class="px-6 py-4">9772778422</td>
            <td class="px-6 py-4">
              9F89,Beside{" "}
              {/* <span className="font-bold text-black">
                {" "} */}
              Ashoka Bar, Butibori, Nagpur
              {/* </span> */}
            </td>
            <td class="px-6 py-4 text-right">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                3.9
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      {/* <Table
        name="Ajmera Honda"
        owner="Amrinder sokhi"
        contact="9898283442"
        rating="4.8"
        address="Ram Bhavan, Dharampeth Nagpur"
      />
      <Table
        name="Sai Garage"
        owner="Guddu Mishra"
        contact="7887778733"
        address="48/3, Near GMC Hospital, Reshimbuagh, Nagpur"
        rating="3.9"
      />

      <Table
        name="Guru Gobind Car Garage"
        owner="Harpal Kour"
        contact=" 7886678333"
        address="32, Near Shanivar wada sadashivpeth, Pune"
        rating="4.3"
      />
      <Table
        name="Samartha Garage"
        owner="Shridhar Lele"
        contact="988667832"
        address="30, shree apartments Kothrud, Pune"
        rating="4.7"
      />
      <Table
        name="Bombay Garage"
        owner="Manish Agrawal"
        contact="984467842"
        address="36, film city road, Goregaon East, Mumbai"
        rating="4.1"
      />
      <Table
        name="Nice Auto Garage"
        owner="Mr. Jaiswal"
        contact="9772778422"
        address="9F89,Beside Ashoka Bar, Butibori, Nagpur"
        rating="3.9"
      /> */}
    </>
  );
}

export default Customize;
