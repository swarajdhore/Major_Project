import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VehicleManagement from "../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json";
import Navbar from '../Components/Navbar/Navbar';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const contract = new ethers.Contract(
    contractAddress,
    VehicleManagement.abi,
    provider
);

function Profile() {
    const [user, setUser] = useState(null);
    var userData;
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
            userData = await contract.getUserDetails(userAddress);
            console.log(userData)
            console.log(userData[0])
            setUser({
                name: userData[0],
                age: userData[1].toNumber(),
                email: userData[2]
            });
            // }
        }
        if (window.ethereum) {
            getUserDetails();
        }
    }, []);


    return (

        <>
            <Navbar />
            {user ? (
                <div class="sticky top-0 bg-[url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHRpbmd8ZW58MHx8MHx8&w=1000&q=80')] bg-no-repeat bg-cover">

                    {/* <img src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHRpbmd8ZW58MHx8MHx8&w=1000&q=80" alt="John Doe" /> */}
                    <div class="opacity-80 flex items-center h-screen w-full justify-center">

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

                    </div>
                </div>
            ) : (<h1>You aren't registered yet</h1>)}
        </>
    )
};

export default Profile

