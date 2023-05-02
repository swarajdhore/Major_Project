import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Grid, Modal } from "semantic-ui-react";
import SmallClose from "../Icons/SmallClose";
import "./Register.css";
import VehicleManagement from "../../../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json";
// import ReactDOM from "react-dom";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function exampleReducer(state, action) {
  switch (action.type) {
    case "CONFIG_CLOSE_ON_DIMMER_CLICK":
      return { ...state, closeOnDimmerClick: action.value };
    case "CONFIG_CLOSE_ON_ESCAPE":
      return { ...state, closeOnEscape: action.value };
    case "OPEN_MODAL":
      return { ...state, open: true };
    case "CLOSE_MODAL":
      return { ...state, open: false };
    default:
      throw new Error();
  }
}

const Register = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = state;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      VehicleManagement.abi,
      signer
    );

    const transaction = await contract.register(name, age, email);

    await transaction.wait();

    alert("Register successful!");
    dispatch({ type: "CLOSE_MODAL" });
    window.location.reload(true);
  }

  return (
    <>
      {/* <Container className='m-10'> */}
      <Grid columns={1}>
        <Grid.Column className="">
          <Modal
            closeOnEscape={closeOnEscape}
            closeOnDimmerClick={closeOnDimmerClick}
            open={open}
            onOpen={() => dispatch({ type: "OPEN_MODAL" })}
            onClose={() => dispatch({ type: "CLOSE_MODAL" })}
            trigger={
              <span
                className="block pl-16 py-2 text-sm text-gray-700"
                id="user-menu-item-0"
              >
                <button className="button font-[Hind] font-normal py-3 px-3">
                  {/* <Register /> */}
                  Build Profile
                </button>
              </span>
            }
            className="left-[22%] bg-transparent"
          >
            <div className="flex justify-center z-50 left-[30%] overflow-y-hidden">
              <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed bg-gray-500 bg-opacity-75 transition-opacity" />
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                  <div className="max-w-md mx-auto">
                    <form
                      className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                      onSubmit={onSubmit}
                    >
                      <Modal.Header className="flex justify-between">
                        <h1>Register</h1>
                        {/*  */}
                        <span className="h-2 w-16">
                          <Button
                            onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                            negative
                          // className="h-2 top-0"
                          >
                            <SmallClose />
                          </Button>
                        </span>
                      </Modal.Header>
                      <Modal.Content>
                        <div className="m-6">
                          <div>
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="name"
                            >
                              Name:
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div>
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="age"
                            >
                              Age:
                            </label>
                            <input
                              type="number"
                              id="age"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />
                          </div>
                          <div>
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="email"
                            >
                              Email:
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </Modal.Content>
                      <Modal.Actions>
                        {/* <Button
                          onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                          negative
                        >
                          No
                        </Button> */}
                        <Button type="submit" positive>
                          Submit
                        </Button>
                      </Modal.Actions>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </Grid.Column>
      </Grid>
      {/* </Container> */}
    </>
  );
};

export default Register;
