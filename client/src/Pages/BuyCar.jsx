import React from 'react'
// import { useLocation } from "react-router-dom";
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { useState } from 'react';
import { ethers } from 'ethers';
// const Web3 = require('web3');
import VehicleManagement from "../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json"
import SellingCars from '../Components/CarDetails/SellingCars';
// import dotenv from 'dotenv';
// dotenv.config();

// Initialize an instance of the VehicleManagement contract
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
console.log(contractAddress)
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const vehicleManagementContract = new ethers.Contract(contractAddress, VehicleManagement.abi, signer);


function BuyCar() {
    // var details;
    const [details, setDetails] = useState(null);
    const [carNumberPlate, setCarNumberPlate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    // const location = useLocation();

    const getVehiclesWithPriceSet = async () => {
        var vehicleDetails = await vehicleManagementContract.getVehiclesWithPriceSet();
        console.log(vehicleDetails)
        var details = vehicleDetails.map(vehicleDetail => ({
            carName: vehicleDetail.carName,
            year: vehicleDetail.year.toNumber(),
            numberPlate: vehicleDetail.numberPlate,
            price: vehicleDetail.price.toString(),
            userName: vehicleDetail.ownerName
        }));
        console.log(details);
        setDetails(details);

    }

    // console.log(location.state.price);
    const handleSubmit = async (event) => {
        event.preventDefault();
        var amount;
        try {
            var vehicleDetails = await vehicleManagementContract.getVehiclesWithPriceSet();
            vehicleDetails.forEach((vehicle) => {
                if (vehicle.numberPlate === carNumberPlate)
                    amount = vehicle.price
            });
            // console.log(vehicleDetails)
            // var details = vehicleDetails.map(vehicleDetail => ({
            //     carName: vehicleDetail.carName,
            //     year: vehicleDetail.year.toNumber(),
            //     numberPlate: vehicleDetail.numberPlate,
            //     price: vehicleDetail.price.toString(),
            //     userName: vehicleDetail.ownerName
            // }));
            // console.log(details);
            // Call the setVehiclePrice function

            // var amount = 20;

            console.log(amount)
            const valueToSend = ethers.utils.parseEther(amount.toString());
            const transaction = await vehicleManagementContract.buyVehicle(carNumberPlate, { value: valueToSend });
            console.log(transaction)
            // Wait for the transaction to be mined
            await transaction.wait();

            // Display a success message
            setSuccessMessage(`You just bought a vehicle ${carNumberPlate}`);
        } catch (error) {
            console.error(error);
        }
    };
    const handleClick = async () => {
        await getVehiclesWithPriceSet();
        // setDetails(details);
        // console.log(details)
        // setClicked(true);
    }



    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center py-12 px-12">
                <button onClick={handleClick} className='px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Get available cars</button>
                {details != null ? (<SellingCars details={details} />) : "No Car Available"}
            </div>
            <div class="AvailableCars"></div>
            <form onSubmit={handleSubmit} className="flex justify-center">
                {/* <label className="">
                    Car number plate:
                    <input type="text" className="rounded-lg" />
                </label> */}
                <div className="mb-3 pt-0 mx-4">
                    <input type="text" placeholder="Car Number Plate" value={carNumberPlate} onChange={(e) => setCarNumberPlate(e.target.value)} className="text-lg font-medium px-8 py-2 placeholder-slate-300 text-slate-600 relative bg-white  rounded border border-slate-300 outline-none focus:outline-none focus:ring w-full" />
                </div>
                <button type="submit" className="btn mt-0 py-0.7 border">Buy and Transfer</button>
            </form>
            {successMessage && <p>{successMessage}</p>}

        </>
    )
}

export default BuyCar;