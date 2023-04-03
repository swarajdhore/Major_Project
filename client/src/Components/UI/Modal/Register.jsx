// import React from 'react'
// import Navbar from '../Components/Navbar/Navbar'
// function Register() {
//     return (
//         <>
//             <Navbar />
//             <div>
//                 <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
//                     <div>
//                         <a href="/">
//                             <h3 className="text-4xl font-bold text-purple-600">
//                                 Logo
//                             </h3>
//                         </a>
//                     </div>
//                     <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
//                         <form>
//                             <div>
//                                 <label
//                                     htmlFor="name"
//                                     className="block text-sm font-medium text-gray-700 undefined"
//                                 >
//                                     Name
//                                 </label>
//                                 <div className="flex flex-col items-start">
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="mt-4">
//                                 <label
//                                     htmlFor="email"
//                                     className="block text-sm font-medium text-gray-700 undefined"
//                                 >
//                                     Email
//                                 </label>
//                                 <div className="flex flex-col items-start">
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="mt-4">
//                                 <label
//                                     htmlFor="password"
//                                     className="block text-sm font-medium text-gray-700 undefined"
//                                 >
//                                     Password
//                                 </label>
//                                 <div className="flex flex-col items-start">
//                                     <input
//                                         type="password"
//                                         name="password"
//                                         className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="mt-4">
//                                 <label
//                                     htmlFor="password_confirmation"
//                                     className="block text-sm font-medium text-gray-700 undefined"
//                                 >
//                                     Confirm Password
//                                 </label>
//                                 <div className="flex flex-col items-start">
//                                     <input
//                                         type="password"
//                                         name="password_confirmation"
//                                         className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                     />
//                                 </div>
//                             </div>
//                             <a
//                                 href="#"
//                                 className="text-xs text-purple-600 hover:underline"
//                             >
//                                 Forget Password?
//                             </a>
//                             <div className="flex items-center mt-4">
//                                 <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
//                                     Register
//                                 </button>
//                             </div>
//                         </form>
//                         <div className="mt-4 text-grey-600">
//                             Already have an account?{" "}
//                             <span>
//                                 <a className="text-purple-600 hover:underline" href="#">
//                                     Log in
//                                 </a>
//                             </span>
//                         </div>

//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default Register

import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Container, Checkbox, Grid, Modal } from 'semantic-ui-react'
import VehicleManagement from "../../../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json";
import ReactDOM from "react-dom";


import Temp from "../Temp";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CONFIG_CLOSE_ON_DIMMER_CLICK':
      return { ...state, closeOnDimmerClick: action.value }
    case 'CONFIG_CLOSE_ON_ESCAPE':
      return { ...state, closeOnEscape: action.value }
    case 'OPEN_MODAL':
      return { ...state, open: true }
    case 'CLOSE_MODAL':
      return { ...state, open: false }
    default:
      throw new Error()
  }
}

const Register = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  })
  const { open, closeOnEscape, closeOnDimmerClick } = state

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, VehicleManagement.abi, signer);

    const transaction = await contract.register(name, age, email);

    await transaction.wait();

    alert("Register successful!");
  }

  return (
    <>
      <Container className='m-10'>
        <Grid columns={1}>


          <Grid.Column className='m-100'>
            <Modal
              closeOnEscape={closeOnEscape}
              closeOnDimmerClick={closeOnDimmerClick}
              open={open}
              onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
              onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
              trigger={<Button>Show Modal</Button>}
            >
              <form onSubmit={onSubmit}>
                <Modal.Header>Register</Modal.Header>
                <Modal.Content>

                  <div>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="age">Age:</label>
                    <input
                      type="number"
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>


                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} negative>
                    No
                  </Button>
                  <Button type="submit" positive>
                    Submit
                  </Button>
                </Modal.Actions>
              </form>
            </Modal>
          </Grid.Column>
        </Grid>
      </Container>




    </>
  );
}

export default Register;

