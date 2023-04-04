import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Container, Checkbox, Grid, Modal } from 'semantic-ui-react'
import VehicleManagement from "../../../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json";
import ReactDOM from "react-dom";

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
      {/* <Container className='m-10'> */}
      <Grid columns={1}>


        <Grid.Column className='m-100'>
          <Modal
            closeOnEscape={closeOnEscape}
            closeOnDimmerClick={closeOnDimmerClick}
            open={open}
            onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
            onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            trigger={<a
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"

              id="user-menu-item-0"
            >
              <button className="button">
                {/* <Register /> */}
                Build Profile
              </button></a>}
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
      {/* </Container> */}




    </>
  );
}

export default Register;

