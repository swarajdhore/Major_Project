import React from "react";
import "./Navbar.css";
import VehicleManagement from "../../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Register from "../UI/Modal/Register";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Navbar() {
  const [account, setAccount] = useState(localStorage.getItem("account") || "");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  async function checkRegistrationStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      contractAddress,
      VehicleManagement.abi,
      provider
    );

    const accounts = await provider.listAccounts().then((accounts) => {
      const currentAccount = accounts[0];
      setAccount(currentAccount);
      localStorage.setItem("account", currentAccount);
    });

    let isUserRegistered = false;
    for (let i = 0; i < accounts.length; i++) {
      const registered = await contract.isRegistered(accounts[i]);
      if (registered) {
        isUserRegistered = true;
        break;
      }
    }
    if (isUserRegistered) {
      // Display a message to the user indicating that one of their accounts is already registered
      alert("One of your accounts is already registered.");
      return;
    }
    setIsRegistered(isUserRegistered);
  }

  const isMetaMaskInstalled = async () => {
    if (typeof window.ethereum !== "undefined") {
      //const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("MetaMask is installed");
    } else alert("MetaMask is not installed");
  };

  useEffect(() => {
    if (buttonClicked) {
      if (typeof window.ethereum !== "undefined") {
        const maskEnable = async () => {
          try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });

            // await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            checkRegistrationStatus();
          } catch (e) {
            setButtonClicked(false);
          }
        };
        const loadProvider = async () => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          if (provider) {
            window.ethereum.on("chainChanged", () => {
              window.location.reload();
            });

            window.ethereum.on("accountsChanged", () => {
              window.location.reload();
            });

            // let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
            // const contract = new ethers.Contract(
            //   contractAddress,
            //   Upload.abi,
            //   signer
            // );
            // //console.log(contract);
            // setContract(contract);
            // setProvider(provider);
          }
        };
        maskEnable() || loadProvider();
      }
    }
  }, [buttonClicked]);

  function handleButtonClick() {
    isMetaMaskInstalled();
    setButtonClicked(true);
  }

  // Call the function
  // isMetaMaskInstalled().then((result) => {
  //   if (result) {
  //     console.log('MetaMask is installed');
  //   } else {
  //     console.log('MetaMask is not installed');
  //   }
  // });
  return (
    <nav class="bg-blue-100 w-100 inset-x-0 top-0 h-15 py-0">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          {/* <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Menu</span>
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              {/* <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              > *
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              {/* </svg>
            </button>
          </div> */}
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center text-decoration-none">
              {/* <h1 className="text-decoration-none text-white">LOGO</h1> */}
              <img src="/images/logo/mylogo.png" width="70px" />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <a
                  href="/"
                  class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Dashboard
                </a>

                <a
                  href="/sell"
                  class="text-black-300 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sell
                </a>

                <a
                  href="/buy"
                  class="text-black-300 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {/* <Buy />  */} Buy
                </a>

                <a
                  href="/customize"
                  class="text-black-300 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Customize
                </a>
                <a class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-mediumm">
                  Account : {account ? account : "Not connected"}
                </a>
              </div>
            </div>
          </div>

          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <a
              href="/login"
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0"
            >
              <button className="button">LogIn</button>
            </a>
            <a
              // href="/register"
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0"
            >
              <button className="button" onClick={handleButtonClick}>
                {" "}
                {/* onClick={handleButtonClick} */}
                Register
              </button>
            </a>

            {/* <button
              type="button"
              class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button> */}
            {/* <div class="relative ml-3">
              <div>
                <button
                  type="button"
                  class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="../../images/logo/logo1.png"
                    alt=""
                  />
                </button>
              </div> */}
            {/* <div
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-1"
                >
                  Settings
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                >
                  Sign out
                </a>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* <div class="sm:hidden" id="mobile-menu"> */}
      {/* <div class="space-y-1 px-2 pt-2 pb-3"> */}
      {/* <a
            href="#"
            class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Team
          </a>

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Projects
          </a>

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Calendar
          </a> */}
      {/* </div> */}
      {/* </div> */}

      <div>
        {window.ethereum ? (
          isRegistered ? (
            <p>You are already registered.</p>
          ) : (
            <Register />
          )
        ) : (
          <p>Please connect your Metamask wallet to register.</p>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
