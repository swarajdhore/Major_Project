import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VehicleManagement from "../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json";
import Navbar from '../Components/Navbar/Navbar';
import ErrorPage from '../Components/UI/UIPages/ErrorPages';


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
console.log(contractAddress)
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const vehicleManagementContract = new ethers.Contract(contractAddress, VehicleManagement.abi, signer);

function Profile() {
    const [user, setUser] = useState(null);
    const [vehicles, setVehicles] = useState(null);
    var [vehicleData, setVehicleData] = useState([]);
    var userData;
    // var vehicleData;
    var userAddress;
    var address = localStorage.getItem("account");
    useEffect(() => {
        async function getUserDetails() {

            userAddress = localStorage.getItem("account");
            console.log(userAddress)
            // address = userAddress.toString();
            // const userExists = await contract.getUserDetails(userAddress).exists();
            // console.log(userExists)
            // if (userExists) {
            userData = await vehicleManagementContract.getUserDetails(userAddress);
            setUser({
                name: userData[0],
                age: userData[1].toNumber(),
                email: userData[2]
            });
            var vehicleDetails = await vehicleManagementContract.displayVehiclesforSale({ from: userAddress });
            console.log(vehicleDetails)

            vehicleData = await vehicleManagementContract.displayVehiclesOwned(userAddress);
            setVehicleData(vehicleData);
            console.log(vehicleData)
            console.log(vehicleData[0])
            console.log(vehicleData[0][0])

            console.log(userData)
            console.log(userData[0])

            // }
        }
        if (window.ethereum) {
            getUserDetails();
        }
    }, []);

    const image = process.env.PUBLIC_URL + "/images/Cars/";



    console.log(vehicleData);


    return (

        <>
            <Navbar />
            {user ? (
                <div class="sticky top-0 bg-[url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHRpbmd8ZW58MHx8MHx8&w=1000&q=80')] bg-no-repeat bg-cover">

                    {/* <img src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHRpbmd8ZW58MHx8MHx8&w=1000&q=80" alt="John Doe" /> */}
                    <div class="opacity-80 flex flex-col items-center h-screen w-full justify-center">

                        <div class="max-w-4xl">
                            <div class="bg-white shadow-xl rounded-lg py-5">
                                {/* <div class="photo-wrapper p-2">
                                    <img class="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe" />
                                </div> */}
                                <div class="p-2">
                                    <h1 class="text-center text-4xl text-gray-900 leading-8">{user.name}</h1>
                                    <div class="text-center text-gray-400 text-lg font-semibold">
                                        <p>Blockchain Developer</p>
                                    </div>
                                    <table class="text-xs my-3">
                                        <tbody><tr>
                                            <td class="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                            <td class="px-2 py-2">{address}</td>
                                        </tr>
                                            <tr>
                                                <td class="px-2 py-2 text-gray-500 font-semibold">Age</td>
                                                <td class="px-2 py-2">{user.age}</td>
                                            </tr>
                                            <tr>
                                                <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                                <td class="px-2 py-2">{user.email}</td>
                                            </tr>
                                        </tbody></table>


                                    {/* <div class="text-center my-3">
                                        <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
                                    </div> */}

                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row span-cont h-40">
                            {/* TODO : Display vehicle data line number 32*/}
                            {vehicleData.map((vehicle, index) => (
                                <div key={index} className="card-container text-white text-center ">
                                    <img className="image-container" src={image + vehicle[3] + ".jpg"} alt="" />
                                    {/* <p>Vehicle ID: {vehicle[0].toString()}</p> */}
                                    <p>Vehicle ID: {vehicle[1].toString()}</p>
                                    {/* <p>Make: {vehicle[1]}</p> */}
                                    <p>Name: {vehicle[3].toString()}</p>
                                    <p>Year: {vehicle[4].toString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (<ErrorPage message="You aren't registered yet" />)}
        </>
    )
};

export default Profile