import { React, useState } from "react";

import "./SellCarDetails.css";
import { ethers } from "ethers";
import VehicleManagement from "../../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json";

function SellCarDetails(props) {
  const image = process.env.PUBLIC_URL + "/images/Cars/";
  const [docApprovalStatus, setDocApprovalStatus] = useState(false);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  console.log(contractAddress);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const vehicleManagementContract = new ethers.Contract(
    contractAddress,
    VehicleManagement.abi,
    signer
  );
  async function handleChange() {
    var userAddresses = await vehicleManagementContract.getVehicleOwnerHistory(
      props.numberPlate
    );
    for (const user of userAddresses) {
      for (let docId = 0; docId <= 10; docId++) {
        const verified = await vehicleManagementContract.verifyDocument(
          user,
          docId
        );
        if (verified) {
          setDocApprovalStatus(true);
          break;
        }
        // setDocApprovalStatus(false);
      }
    }
    // var value = await vehicleManagementContract.getApprovalStatus(
    //   selectedUser,
    //   selectedDocId
    // );
    // setDocApprovalStatus(value);
  }
  handleChange();
  return (
    <div className="card-container-1 justify-center">
      <img
        className="image-container"
        src={image + props.name + ".jpg"}
        alt="img"
      />
      <div className="comments-container">{props.name}</div>
      <div className="comments-container">{props.year}</div>
      {/* <div className="comments-container">{props.numberPlate}</div> */}
      <div className="comments-container card-price text-center ">
        ETH {props.price}
      </div>
      <div className="comments-container">{props.numberPlate}</div>

      {docApprovalStatus && <div className="text-white">Verified User</div>}
      {/* <div className="comments-container">{props.userName}</div> */}
    </div>
  );
}

export default SellCarDetails;
