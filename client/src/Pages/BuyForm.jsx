import React, { useState } from "react";
import Form from "../Components/UI/Form/Form";
import ToggleVisiblity from "../Components/UI/ToggleVisiblity";
import CarDetails from "../Components/CarDetails/CarDetails";
// import Modal from "../Components/UI/Modal/Modal";
import LoadingScreen from "../Components/UI/LoadingScreen/LoadingScreen";

import "./Buy.css";

// var carData;
function BuyForm() {
    const [inputData, setInputData] = useState({
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
    const [loading, setLoading] = useState(false);

    // const [show, setShow] = useState(true);

    const image = process.env.PUBLIC_URL + "/images/Cars/";

    const [result, setResult] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputData);
        // console.log(key_dict);
        const response = await fetch(`http://localhost:4000/process_data`, {
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
    };


    const carArr = Object.values(result);
    // console.log(result);
    // console.log(result["Datsun GO Plus D1"]);
    // console.log(carArr[0]);

    // const [cars] = carArr;
    // console.log(carArray[result]);
    return (
        <>
            <div className="buy-container">
                <div className="grid place-items-center">
                    <ToggleVisiblity>
                        <Form
                            heading="Recommendation Form"
                            handleSubmit={handleSubmit}
                            loading={() => { setLoading(true) }}
                            year={inputData.year}
                            onChangeYear={(e) =>
                                setInputData({ ...inputData, year: e.target.value })
                            }
                            SellingPrice={inputData.sellPrice}
                            onChangeSellingPrice={(e) =>
                                setInputData({ ...inputData, sellPrice: e.target.value })
                            }
                            KmDriven={inputData.km_driven}
                            onChangeKmDriven={(e) =>
                                setInputData({ ...inputData, km_driven: e.target.value })
                            }
                            Fuel={inputData.fuel}
                            onChangeFuel={(e) =>
                                setInputData({ ...inputData, fuel: e.target.value })
                            }
                            Transmission={inputData.transmission}
                            OnChangeTransmission={(e) =>
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
                            onChangeSeats={
                                (e) => setInputData({ ...inputData, seats: e.target.value })
                                // Engine={}
                            }
                        />
                    </ToggleVisiblity>
                </div>
                {loading ? <LoadingScreen />
                    : <div className="flex flex-wrap">
                        {carArr.map((car, key) => (
                            <span
                                key={key}
                                className="justify-center mx-0.5 hover:shadow-2xl my-2 item"
                            >
                                <a href="/car-information">
                                    <CarDetails key={key} car={car} alt={car} />
                                </a>
                            </span>
                        ))}
                    </div>}
            </div>
        </>
    );
}

export default BuyForm;
