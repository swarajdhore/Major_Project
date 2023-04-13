import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { useState } from 'react';
import { ethers } from 'ethers';
import VehicleManagement from "../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json"
// import dotenv from 'dotenv';
// dotenv.config();

// Initialize an instance of the VehicleManagement contract
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
console.log(contractAddress)
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const vehicleManagementContract = new ethers.Contract(contractAddress, VehicleManagement.abi, signer);

function SellMyCar() {

    const [carNumberPlate, setCarNumberPlate] = useState('');
    const [price, setPrice] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handler for submitting the form
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Call the setVehiclePrice function
            const transaction = await vehicleManagementContract.setVehiclePrice(carNumberPlate, price);
            console.log(transaction)
            // Wait for the transaction to be mined
            await transaction.wait();

            // Display a success message
            setSuccessMessage(`Price set for vehicle ${carNumberPlate}`);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className="bg-bgcolor">
                <Navbar />

            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Car number plate:
                        <input type="text" value={carNumberPlate} onChange={(e) => setCarNumberPlate(e.target.value)} />
                    </label>
                    <label>
                        Price:
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <button type="submit">Set Price</button>
                </form>
                {successMessage && <p>{successMessage}</p>}
            </div>

            {/* <div className="footer">
                <Footer />
            </div> */}
        </>
    )
}

export default SellMyCar