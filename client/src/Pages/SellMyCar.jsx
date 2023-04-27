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
            <div className="flex items-center justify-center increase-height">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-bold mb-1">
                            Car No. Plate
                        </label>
                        <input type="text" className="rounded-lg appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="exampleFormControlInput1" placeholder="Car Number Plate" value={carNumberPlate} onChange={(e) => setCarNumberPlate(e.target.value)} />
                        {/* <div className="grid gap-6 mb-6 md:grid-cols-2"></div> */}
                        {/* <div class="mb-3 pt-0">
                        <label for="first_name" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Car number plate:</label>
                        <input type="text" value={carNumberPlate} onChange={(e) => setCarNumberPlate(e.target.value)} class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" placeholder="Car No. Plate" required />
                    </div> */}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-bold mb-1">
                            Price:
                        </label>
                        <input type="number" className="rounded-lg appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    {/* <div class="mb-3 pt-0">
                        <label for="first_name" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Price:</label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" placeholder="Price" required />
                    </div> */}
                    <div>
                        <button type="submit">Set Price</button>
                    </div>
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