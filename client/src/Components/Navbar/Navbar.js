import React from "react";
import "./Navbar.css";
import VehicleManagement from "../../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Register from "../UI/Modal/Register";
import Modal from "../UI/Modal/Modal";
import { Button } from "@material-tailwind/react";
import Profile from "../../Pages/Profile";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Navbar() {
  const [account, setAccount] = useState(localStorage.getItem("account") || "");
  // const [contract, setContract] = useState(null);
  // const [provider, setProvider] = useState(null);
  // const [modalOpen, setModalOpen] = useState(false);
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
    <nav class=" bg-blue-100 top-0 max-w-full inset-x-0 h-15 py-0 sticky z-999">
      <div class="mx-auto px-2 sm:px-6 lg:px-8">
        <div class=" flex h-18 items-center justify-between space-y-3 space-x-6">
          <div class="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center text-decoration-none">
              <img src="/images/logo/mylogo.png" width="100px" alt="logo" />
            </div>
            <div class="hidden mt-2.5 items-center sm:ml-6 sm:block">
              <div class="flex items-center space-x-2">
                <a
                  href="/"
                  class="text-black-300 hover:bg-gray-900 hover:text-white mx-1 px-6 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Dashboard
                </a>
                <a
                  href="/sell"
                  class="text-black-300 hover:bg-gray-900 hover:text-white mx-1 px-6 py-2 rounded-md text-sm font-medium"
                >
                  Sell
                </a>
                <a
                  href="/buy"
                  class="text-black-300 hover:bg-gray-900 hover:text-white mx-1 px-6 py-2 rounded-md text-sm font-medium"
                >
                  Buy
                </a>
                <a
                  href="/customize"
                  class="text-black-300 hover:bg-gray-900 hover:text-white mx-1 px-6 py-2 rounded-md text-sm font-medium"
                >
                  Customize
                </a>
                <span class="bg-gray-900 text-white mr-2 px-2 py-2 rounded-md text-sm font-mediumm">
                  Account : {account ? account : "Not connected"}
                  {/* account */}
                </span>
              </div>
            </div>
          </div>
          {console.log(isRegistered)}
          <div class="mt-2 inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {window.ethereum ? (
              isRegistered ? (
                <p class="block ml-4 px-1 py-2 text-sm text-gray-700">
                  Profile Complete 100%.
                </p>
              ) : (
                <div className="flex justify-center">
                  <Register />
                </div>
              )
            ) : (
              ""
            )}
            <span className="block mx-2 px-6 py-1 text-sm text-gray-700 no-underline">
              <button
                className="button flex text-center py-1.5 font-[Hind] px-3 !no-underline"
                onClick={handleButtonClick}
              >
                <img src="./images/logo/metamask.png" alt="metamask logo" />
                <p className="align-center px-2 py-1.5 hover:no-underline text-lg font-normal">
                  Connect Metamask
                </p>
              </button>
            </span>
            <button className="button flex text-center py-1.5 font-[Hind]">
              <a
                href="/profile"
                className=" text-black hover:text-black font-normal  px-3"
              >
                Profile
              </a>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
