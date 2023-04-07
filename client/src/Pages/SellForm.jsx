import React, { useState } from "react";
import FormPred from "../Components/UI/Form/FormPred";
import ToggleVisiblity from "../Components/UI/ToggleVisiblity";
import LoadingScreen from "../Components/UI/LoadingScreen/LoadingScreen";

import "./Sell.css";
// import dotenv from 'dotenv';
// const path = require('path')

// require('dotenv').config({
//   path: require("path").resolve(__dirname, "../../.env"),
// })
function SellForm() {
    const [inputData, setInputData] = useState({
        car: "Skoda",
        year: "",
        sellPrice: "100000",
        km_driven: "5000",
        fuel: "1",
        transmission: "0",
        owner: "1",
        mileage: "",
        max_power: "110",
        seats: "4",
    });
    const [result, setResult] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputData);

        const response = await fetch(`http://localhost:5000/predict_price`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                input_data: inputData,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setResult(data.result);
                setLoading(false);
            })
            .catch((error) => console.error(error));
        // const json = await response.json();
        // setResult(json.result);
    };

    return (
        <>
            <div className="sell-container">

                <div className="grid place-items-center">
                    <ToggleVisiblity>
                        <FormPred
                            heading="Price Prediction Form"
                            handleSubmit={handleSubmit}
                            car={inputData.car}
                            onChangeCar={(e) =>
                                setInputData({ ...inputData, car: e.target.value })
                            }
                            year={inputData.year}
                            onChangeYear={(e) =>
                                setInputData({ ...inputData, year: e.target.value })
                            }
                            // SellingPrice={inputData.sellPrice}
                            // onChangeSellingPrice={(e) =>
                            //     setInputData({ ...inputData, sellPrice: e.target.value })
                            // }
                            KmDriven={inputData.km_driven}
                            onChangeKmDriven={(e) =>
                                setInputData({ ...inputData, km_driven: e.target.value })
                            }
                            Fuel={inputData.fuel}
                            onChangeFuel={(e) =>
                                setInputData({ ...inputData, fuel: e.target.value })
                            }
                            Transmission={inputData.transmission}
                            onChangeTransmission={(e) =>
                                setInputData({ ...inputData, transmission: e.target.value })
                            }
                            Owner={inputData.owner}
                            onChangeOwner={(e) =>
                                setInputData({ ...inputData, owner: e.target.value })
                            }
                            Mileage={inputData.mileage}
                            onChangeMileage={(e) =>
                                setInputData({ ...inputData, mileage: e.target.value })
                            }
                            MaxPower={inputData.max_power}
                            onChangeMaxPower={(e) =>
                                setInputData({ ...inputData, max_power: e.target.value })
                            }
                            Seats={inputData.seats}
                            onChangeSeats={(e) =>
                                setInputData({ ...inputData, seats: e.target.value })
                            }
                        />
                    </ToggleVisiblity>
                </div>
                {loading ? <LoadingScreen /> :
                    <div>Result: {result}</div>}
                {/* <div className="body">
            Hi
            <Card />
          </div> */}

                {/* <div className="footer">
            <Footer />
          </div> */}
                {/* </div> */}
            </div>
        </>
    );
}

export default SellForm;
