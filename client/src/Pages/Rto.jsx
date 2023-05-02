import React, { useState } from "react";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import VehicleManagement from "../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json"
import Navbar from "../Components/Navbar/Navbar";
import ErrorPage404 from "../Components/UI/UIPages/ErrorPage404";

const ipfs = create({ host: "localhost", port: "5001", protocol: "http" });
// const { CID } = require('ipfs-http-client');
function App() {
    // const [provider, setProvider] = useState(null);
    // const [contract, setContract] = useState(null);
    const [docIds, setDocIds] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedDocId, setSelectedDocId] = useState("");
    const [docHash, setDocHash] = useState("");
    const [approvalStatus, setApprovalStatus] = useState(null);
    const [account, setAccount] = useState(null);


    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    console.log(contractAddress)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const vehicleManagementContract = new ethers.Contract(contractAddress, VehicleManagement.abi, signer);
    // async function connectWallet() {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await window.ethereum.enable();
    // const signer = provider.getSigner();
    // const contractAddress = "CONTRACT_ADDRESS_HERE";
    // const contractAbi = CONTRACT_ABI_HERE;
    // const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    // setProvider(provider);
    // setContract(contract);

    // }

    async function loadDocIds() {
        const docIds = [];
        const userAddresses = ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"];
        for (const user of userAddresses) {
            for (let docId = 0; docId <= 10; docId++) {
                const verified = await vehicleManagementContract.verifyDocument(user, docId);
                if (verified) {
                    docIds.push({ user, docId });
                }
            }
        }
        setDocIds(docIds);
    }
    var [DocApprovalStatus, setDocApprovalStatus] = useState(false);
    async function viewDocument() {
        const hash = await vehicleManagementContract.getDocumentHash(selectedUser, selectedDocId);
        console.log(hash)
        var value = await vehicleManagementContract.getApprovalStatus(selectedUser, selectedDocId);
        setDocApprovalStatus(value);
        // const hashi = ethers.utils.hexDataSlice(hash, 0, 32);
        // const truncatedStr2 = ethers.utils.parseBytes32String(hashi);


        // console.log(truncatedStr2);

        // const file = await ipfs.cat("QmewApqnvMn8DxtrwFdSNrJgzkaS7LVkvULRPg1EAJWrty");
        // const stream = ipfs.files.read("QmewApqnvMn8DxtrwFdSNrJgzkaS7LVkvULRPg1EAJWrty");
        // let data = '';
        // for await (const chunk of stream) {
        //     data += chunk.toString();
        // }
        // console.log(data);
        // console.log(file)
        setDocHash(hash);
    }

    async function approveDocument() {
        await vehicleManagementContract.approveDocument(selectedUser, selectedDocId);
        setApprovalStatus(true);
    }

    async function denyDocument() {
        await vehicleManagementContract.denyDocument(selectedUser, selectedDocId);
        setApprovalStatus(false);
    }

    async function uploadFile(event) {
        const file = event.target.files[0];
        const added = await ipfs.add(file);
        const hash = added.path;
        await vehicleManagementContract.setDocumentHash(selectedUser, selectedDocId, hash);
    }

    const userAddress = localStorage.getItem("account");

    return (
        <>
            {userAddress === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" ? (
                <div>
                    <Navbar />
                    {/* {!provider && <button onClick={connectWallet}>Connect Wallet</button>} */}
                    {/* {provider && ( */}
                    <div>
                        <div class="flex items-center flex-column bg-[#013263] h-[150vh]">
                            <div class="m-3">
                                <button onClick={loadDocIds} class="bg-white text-blue-400 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-black shadow-md py-2 px-6 inline-flex items-center">
                                    <span class="mr-2">Load Doc IDs</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="currentcolor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                                    </svg>
                                </button>
                            </div>
                            {/* <button ></button> */}
                            {docIds.length > 0 && (
                                <div className="flex flex-column justify-center items-center">
                                    <div className="flex flex-row justify-center items-center">
                                        <select className=" appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3 my-4 mx-16 px-4 pr-8 w-full rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(event) => setSelectedUser(event.target.value)}>
                                            <option value="">Select User</option>
                                            {docIds.map((doc) => (
                                                <option value={doc.user} key={`${doc.user}_${doc.docId}`}>
                                                    {doc.user}
                                                </option>
                                            ))}
                                        </select>
                                        <select className=" appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 w-full rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(event) => setSelectedDocId(event.target.value)}>
                                            <option value="">Select Document ID</option>
                                            {docIds
                                                .filter((doc) => doc.user === selectedUser)
                                                .map((doc) => (
                                                    <option value={doc.docId} key={`${doc.user}_${doc.docId}`}>
                                                        {doc.docId}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div>
                                        {selectedDocId && (
                                            <div >
                                                <button className="my-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={viewDocument}>View Document</button>

                                                {docHash && (
                                                    <div>
                                                        <iframe src={`https://ipfs.io/ipfs/${docHash}`} width="100%" height="600px" />
                                                    </div>
                                                )}
                                                {approvalStatus === null && (
                                                    <div>
                                                        <input className="appearance-none my-4 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 pr-8 mx-6  mb-3 leading-tight focus:outline-none focus:bg-white" type="file" onChange={uploadFile} />
                                                        <button className="rounded-lg my-4 mx-6 px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300" onClick={approveDocument}>
                                                            Approve
                                                        </button>
                                                        <button className="rounded-lg my-4 mx-6 px-4 py-2 bg-red-600 text-red-100 hover:bg-red-700 duration-300" onClick={denyDocument}>Deny</button>
                                                    </div>
                                                )}
                                                {DocApprovalStatus === true && <div className="text-white text-4xl ">Document Already Approved</div>}
                                                {approvalStatus === true && <div className="text-white text-4xl">Document approved</div>}
                                                {approvalStatus === false && <div className="text-white text-4xl">Document denied</div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div >
                </div >) : (<ErrorPage404 />)
            }
        </>
    );
}

export default App;








// import React, { useState, useEffect } from "react";
// // import { vehicleManagementContract } from "../contracts"; // import the IPFS contract
// import { ethers } from 'ethers';
// import VehicleManagement from "../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json"

// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// console.log(contractAddress)
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const signer = provider.getSigner();
// const vehicleManagementContract = new ethers.Contract(contractAddress, VehicleManagement.abi, signer);

// const Rto = () => {
//     const [ipfsHashes, setIpfsHashes] = useState([]);
//     const [approved, setApproved] = useState(false);
//     const [denied, setDenied] = useState(false);

//     useEffect(() => {
//         // retrieve the array of IPFS hashes from the contract and set it to state
//         async function getIpfsHashes() {
//             const result = await vehicleManagementContract.getIpfsHashes();
//             setIpfsHashes(result);
//         }
//         getIpfsHashes();
//     }, []);

//     async function handleApprove(hash) {
//         try {
//             await vehicleManagementContract.approveFile(hash);
//             setApproved(true);
//             setDenied(false);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async function handleDeny(hash) {
//         try {
//             await vehicleManagementContract.denyFile(hash);
//             setDenied(true);
//             setApproved(false);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     return (
//         <div>
//             <h2>View IPFS files</h2>
//             <ul>
//                 {ipfsHashes.map((hash) => (
//                     <li key={hash}>
//                         <a href={`https://ipfs.io/ipfs/${hash}`} target="_blank" rel="noopener noreferrer">
//                             {hash}
//                         </a>
//                         {!approved && !denied && (
//                             <>
//                                 <button onClick={() => handleApprove(hash)}>Approve</button>
//                                 <button onClick={() => handleDeny(hash)}>Deny</button>
//                             </>
//                         )}
//                         {approved && <span>Approved</span>}
//                         {denied && <span>Denied</span>}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Rto;
