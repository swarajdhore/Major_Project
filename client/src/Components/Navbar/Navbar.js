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
    var currentAccount;
    const accounts = await provider.listAccounts().then((accounts) => {
      currentAccount = accounts[0];
      setAccount(currentAccount);
      localStorage.setItem("account", currentAccount);
    });

    let isUserRegistered = false;
    console.log(typeof currentAccount);
    const registered = await contract.getUserDetails(currentAccount);
    console.log(registered);
    if (registered != undefined) {
      isUserRegistered = true;
    }
    setIsRegistered(isUserRegistered);
  }

  const isMetaMaskInstalled = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed");
    } else alert("MetaMask is not installed");
  };

  useEffect(() => {
    checkRegistrationStatus();
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    if (buttonClicked) {
      console.log("Hello");
      if (typeof window.ethereum !== "undefined") {
        const maskEnable = async () => {
          try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });

            // await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            setButtonClicked(false);
          } catch (e) {
            setButtonClicked(false);
          }
        };

        // const loadProvider = async () => {
        //   const provider = new ethers.providers.Web3Provider(window.ethereum);
        //   if (provider) {

        //   }
        // };
        maskEnable();
      }
    }
  }, [buttonClicked]);

  function handleButtonClick() {
    isMetaMaskInstalled();
    setButtonClicked(true);
  }
  return (
    <nav class="bg-blue-100 w-100 inset-x-0 top-0 h-15 py-0">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center text-decoration-none">
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
                  Buy
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
          {console.log(isRegistered)}
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {window.ethereum ? (
              isRegistered ? (
                <p class="ml-10 block px-4 py-2 text-sm text-gray-700">
                  Profile Complete 100%.
                </p>
              ) : (
                <Register />
              )
            ) : (
              ""
            )}
            <a
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0"
            >
              <button className="button" onClick={handleButtonClick}>
                {" "}
                Connect Metamask
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
