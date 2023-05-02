import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { useState } from 'react';
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import VehicleManagement from "../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json"
// import dotenv from 'dotenv';
// dotenv.config();
import { create } from "ipfs-http-client";

const ipfs = create({ host: "localhost", port: "5001", protocol: "http" });
var docID = 0;
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
    const navigate = useNavigate();
    const toBuyCar = () => {
        navigate("/buycar", { state: { price: price } });
    };


    var userAddress = localStorage.getItem("account");
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
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    async function uploadFile(event) {
        console.log("Uploaded");
        event.preventDefault();

        if (!file) {
            console.log("No file selected");
            return;
        }
        const added = await ipfs.add(file);
        console.log(added)
        const hash = added.path;
        // var hash = hashi.toString();
        // const truncatedStr = hash.substring(0, 32);
        // const utf8Bytes = ethers.utils.toUtf8Bytes(truncatedStr);
        // const bytes = ethers.utils.formatBytes32String(utf8Bytes);
        // const bytes = ethers.utils.id(hash);
        console.log(hash);
        // console.log(bytes);
        var selectedDocId = docID++;
        const docHashBytes32 = await vehicleManagementContract.addDocument(userAddress, selectedDocId, hash);
        console.log(docHashBytes32)
    }
    return (
        <>
            <div className="bg-bgcolor">
                <Navbar />

            </div>
            <div className="flex justify-center">
                <div className="flex items-center justify-center increase-height mx-12">
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
                            <input type="number" placeholder="Price" className="rounded-lg appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        {/* <div class="mb-3 pt-0">
                        <label for="first_name" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Price:</label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" placeholder="Price" required />
                    </div> */}
                        <div>
                            <button type="submit" className="button" >Set Price</button>
                        </div>
                    </form>
                </div>


                <div className="mx-12">
                    <form class="flex flex-column items-center justify-center space-x-6 m-4" onSubmit={uploadFile}>
                        <div class="text-2xl">
                            Upload Documents
                        </div>
                        <div class="">
                            <img class="h-64 w-64 object-cover rounded-full" src="./images/documents.png" alt="document image" />
                        </div>
                        <label class="block">
                            <span class="sr-only">Choose profile photo</span>
                            <input onChange={handleFileChange} type="file" class="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100
                                "/>
                            <button type="submit" class="my-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded" disabled={!file}>Upload</button>
                        </label>
                    </form>

                </div>
            </div>
            {successMessage && <p className="text-center text-[#FF0000]">{successMessage}</p>}
            {/* <div className="footer">
                <Footer />
            </div> */}
        </>
    )
}

export default SellMyCar;