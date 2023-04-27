import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { ethers } from "ethers";
// import { Button, Container, Checkbox, Grid, Modal } from "semantic-ui-react";
import VehicleManagement from "../../../artifacts/contracts/VehicleManagement.sol/VehicleManagement.json";
// import ReactDOM from "react-dom";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const ModalForm = ({ showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    // message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      VehicleManagement.abi,
      signer
    );

    const transaction = await contract.register(
      formData.name,
      formData.age,
      formData.email
    );

    await transaction.wait();
    console.log("Form data:", formData);
    setShowModal(false);
  }

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)} closeIcon>
        <Modal.Header>Modal Form</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="message">Age</label>
              <textarea
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ModalForm;

// import React, { useState } from "react";
// import "./Modal.css";

// export default function Modal() {
//   const [modal, setModal] = useState(false);

//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   if (modal) {
//     document.body.classList.add("active-modal");
//   } else {
//     document.body.classList.remove("active-modal");
//   }

//   return (
//     <>
//       <button onClick={toggleModal} className="btn-modal">
//         Open
//       </button>

//       {modal && (
//         <div className="modal">
//           <div onClick={toggleModal} className="overlay"></div>
//           <div className="modal-content">
//             <h2>Hello Modal</h2>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//             <button className="close-modal" onClick={toggleModal}>
//               CLOSE
//             </button>
//           </div>
//         </div>
//       )}
//       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//     </>
//   );
// }
