import React from 'react'
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Call the setVehiclePrice function

            var amount = 20;
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
            <button onClick={handleClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Show available cars</button>
            {details ? (<SellingCars details={details} />) : "Hello"}
            <div class="AvailableCars"></div>
            <form onSubmit={handleSubmit}>
                <label>
                    Car number plate:
                    <input type="text" value={carNumberPlate} onChange={(e) => setCarNumberPlate(e.target.value)} />
                </label>
                <button type="submit">Buy and Transfer</button>
            </form>
            {successMessage && <p>{successMessage}</p>}

        </>
    )
}

export default BuyCar