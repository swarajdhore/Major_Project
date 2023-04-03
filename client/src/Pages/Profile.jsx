import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VehicleManagement from "../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json";

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const contract = new ethers.Contract(
    contractAddress,
    VehicleManagement.abi,
    provider
);

function Profile() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function getUserDetails() {

            const userAddress = localStorage.getItem("account");
            console.log(userAddress)
            // const userExists = await contract.getUserDetails(userAddress).exists();
            // console.log(userExists)
            // if (userExists) {
            const userData = await contract.getUserDetails(userAddress);
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
            {/* <h1>Profile</h1> */}
            {/* <>
        <Navbar />
      </> */}
            <main className="profile-pages">
                <section className="relative block h-500-px">
                    <div
                        className="bg-img absolute top-0 w-full h-full bg-center bg-cover"
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>
                    <div
                        className="img-circular top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-blueGray-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img
                                                alt="..."
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Earth_from_Space.jpg/800px-Earth_from_Space.jpg"
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                            />
                                        </div>
                                    </div>

                                </div>
                                <h1>Profile</h1>
                                {user ? (
                                    <>
                                        <p>Name: {user.name}</p>
                                        <p>Age: {user.age}</p>
                                        <p>Email: {user.email}</p>


                                        <div className="text-center info-box">
                                            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                                                Your Name
                                            </h3>
                                            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                                City , Country
                                            </div>
                                            <div className="mb-2 text-blueGray-600 mt-10">
                                                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                                Position - Work Place
                                            </div>
                                            <div className="mb-2 text-blueGray-600">
                                                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                                Place of Study Or Work
                                            </div>
                                        </div>
                                    </>
                                )
                                    : (
                                        <>
                                            <p>Please connect to MetaMask and register to view your profile</p>

                                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                                <div className="flex flex-wrap justify-center">
                                                    <div className="w-full lg:w-9/12 px-4">
                                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                            Eos cum unde exercitationem molestias excepturi
                                                            temporibus nihil reprehenderit soluta eveniet,
                                                            perferendis accusamus dolore eum fugit provident placeat
                                                            delectus sequi voluptatum veritatis.
                                                        </p>
                                                        <a href="#pablo" className="font-normal text-pink-500">
                                                            Show more
                                                        </a>
                                                    </div>
                                                </div>

                                            </div>
                                        </>
                                    )}


                            </div>
                        </div>
                    </div>
                    <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap items-center md:justify-between justify-center">
                                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                    {/* <div className="text-sm text-blueGray-500 font-semibold py-1">
                    Made with{" "}
                    <a
                      href="https://www.creative-tim.com/product/notus-js"
                      className="text-blueGray-500 hover:text-gray-800"
                      target="_blank"
                    >
                      Notus JS
                    </a>{" "}
                    by{" "}
                    <a
                      href="https://www.creative-tim.com"
                      className="text-blueGray-500 hover:text-blueGray-800"
                      target="_blank"
                    >
                      {" "}
                      Creative Tim
                    </a>
                    .
                  </div> */}
                                </div>
                            </div>
                        </div>

                    </footer>
                </section>
            </main>

        </>
    )
}

export default Profile


// import React from "react";

// import "./Profile.css";
// // import Navbar from "../Components/Navbar/Navbar";

// function Profile() {
//     return (
//         <>
//             {/* <h1>Profile</h1> */}
//             {/* <>
//         <Navbar />
//       </> */}
//             <main className="profile-pages">
//                 <section className="relative block h-500-px">
//                     <div
//                         className="bg-img absolute top-0 w-full h-full bg-center bg-cover"
//                     >
//                         <span
//                             id="blackOverlay"
//                             className="w-full h-full absolute opacity-50 bg-black"
//                         ></span>
//                     </div>
//                     <div
//                         className="img-circular top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
//                     >
//                         <svg
//                             className="absolute bottom-0 overflow-hidden"
//                             xmlns="http://www.w3.org/2000/svg"
//                             preserveAspectRatio="none"
//                             version="1.1"
//                             viewBox="0 0 2560 100"
//                             x="0"
//                             y="0"
//                         >
//                             <polygon
//                                 className="text-blueGray-200 fill-current"
//                                 points="2560 0 2560 100 0 100"
//                             ></polygon>
//                         </svg>
//                     </div>
//                 </section>
//                 <section className="relative py-16 bg-blueGray-200">
//                     <div className="container mx-auto px-4">
//                         <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
//                             <div className="px-6">
//                                 <div className="flex flex-wrap justify-center">
//                                     <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
//                                         <div className="relative">
//                                             <img
//                                                 alt="..."
//                                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Earth_from_Space.jpg/800px-Earth_from_Space.jpg"
//                                                 className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
//                                             />
//                                         </div>
//                                     </div>
//                                     {/* <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
//                     <div className="py-6 px-3 mt-32 sm:mt-0">
//                       <button
//                         className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
//                         type="button"
//                       >
//                         Connect
//                       </button>
//                     </div>
//                   </div> */}
//                                 </div>
//                                 <div className="text-center info-box">
//                                     <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
//                                         Your Name
//                                     </h3>
//                                     <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
//                                         <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
//                                         City , Country
//                                     </div>
//                                     <div className="mb-2 text-blueGray-600 mt-10">
//                                         <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
//                                         Position - Work Place
//                                     </div>
//                                     <div className="mb-2 text-blueGray-600">
//                                         <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
//                                         Place of Study Or Work
//                                     </div>
//                                 </div>
//                                 <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
//                                     <div className="flex flex-wrap justify-center">
//                                         <div className="w-full lg:w-9/12 px-4">
//                                             <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
//                                                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                                                 Eos cum unde exercitationem molestias excepturi
//                                                 temporibus nihil reprehenderit soluta eveniet,
//                                                 perferendis accusamus dolore eum fugit provident placeat
//                                                 delectus sequi voluptatum veritatis.
//                                             </p>
//                                             <a href="#pablo" className="font-normal text-pink-500">
//                                                 Show more
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
//                         <div className="container mx-auto px-4">
//                             <div className="flex flex-wrap items-center md:justify-between justify-center">
//                                 <div className="w-full md:w-6/12 px-4 mx-auto text-center">
//                                     {/* <div className="text-sm text-blueGray-500 font-semibold py-1">
//                     Made with{" "}
//                     <a
//                       href="https://www.creative-tim.com/product/notus-js"
//                       className="text-blueGray-500 hover:text-gray-800"
//                       target="_blank"
//                     >
//                       Notus JS
//                     </a>{" "}
//                     by{" "}
//                     <a
//                       href="https://www.creative-tim.com"
//                       className="text-blueGray-500 hover:text-blueGray-800"
//                       target="_blank"
//                     >
//                       {" "}
//                       Creative Tim
//                     </a>
//                     .
//                   </div> */}
//                                 </div>
//                             </div>
//                         </div>
//                     </footer>
//                 </section>
//             </main>
//         </>
//     );
// }

// export default Profile;

