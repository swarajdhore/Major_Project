import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import SearchBar from "../Components/UI/SearchBar/SearchBar";
import Card from "../Components/UI/Card/Card";

import "./Buy.css";

function Buy() {
  const [inputData, setInputData] = useState({
    year: "",
    sellPrice: "100000",
    km_driven: "5000",
    fuel: "1",
    transmission: "0",
    owner: "1",
    mileage: "",
    max_power: "",
    seats: ""
  });
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputData);
    const response = await fetch("http://127.0.0.1:5000/process_data", {
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
      })
      .catch((error) => console.error(error));
    // const json = await response.json();
    // setResult(json.result);
  };

  return (
    <>

      <Navbar />

      {/* <div className="search-bar">
        <SearchBar />
      </div> */}
      <div className="buy-container">

        <div >
          <div className="w-25">
            <div className="ml-10 ">
              <center>
                <h1>Registration Form</h1>
              </center>
              <hr />
              <form onSubmit={handleSubmit}>
                {/* <form method="post" action="{{url_for('home')}}"> */}
                <p>Year : <input type="int" name="year" className="float-right" value={inputData.year} onChange={(e) => setInputData({ ...inputData, year: e.target.value })} /></p><br />

                <label for="sp">Selling price</label>
                <select id="sp" name="sp" className="float-right" value={inputData.sellPrice} onChange={(e) => setInputData({ ...inputData, sellPrice: e.target.value })}>
                  <option value="100000"> less than 100000</option>
                  <option value="200000">100000 to 300000</option>
                  <option value="400000">300000 to 500000</option>
                  <option value="600000">500000 to 700000</option>
                  <option value="800000">700000 to 900000</option>
                  <option value="1000000">900000 to 1100000</option>
                </select><br /><br />


                <label for="km">km_driven</label>
                <select id="km" name="km" className="float-right" value={inputData.km_driven} onChange={(e) => setInputData({ ...inputData, km_driven: e.target.value })}>
                  <option value="5000">less than 10000</option>
                  <option value="20000">10000 to 30000</option>
                  <option value="40000">30000 to 50000</option>
                  <option value="60000">50000 to 70000</option>
                  <option value="80000">70000 to 90000</option>
                  <option value="100000">90000 to 110000</option>
                  <option value="120000">110000 to 130000</option>
                  <option value="150000">Greater than 130000</option>
                </select><br /><br />
                <label for="fuel">Fuel</label>
                <select id="fuel" name="fuel" className="float-right" value={inputData.fuel} onChange={(e) => setInputData({ ...inputData, fuel: e.target.value })}>
                  <option value="1">Petrol</option>
                  <option value="2">Diesel</option>
                  <option value="3">CNG</option>
                </select><br /><br />

                <label for="transmission">transmission</label>
                <select id="transmission" className="float-right" name="transmission" value={inputData.transmission} onChange={(e) => setInputData({ ...inputData, transmission: e.target.value })}>
                  <option value="0">Manual</option>
                  <option value="1">Automatic</option>
                </select><br /><br />

                <label for="owner">owner</label>
                <select id="owner" name="owner" className="float-right" value={inputData.owner} onChange={(e) => setInputData({ ...inputData, owner: e.target.value })}>
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                  <option value="3">3rd</option>
                  <option value="4">4th and above</option>
                </select><br /><br />

                <p>mileage	engine   : <input className="float-right" type="float" name="mileage" value={inputData.mileage} onChange={(e) => setInputData({ ...inputData, mileage: e.target.value })} /></p><br />
                <p>max_power   : <input className="float-right" type="float" name="power" value={inputData.max_power} onChange={(e) => setInputData({ ...inputData, max_power: e.target.value })} /></p><br />
                <p>seats   : <input className="float-right" type="int" name="seats" value={inputData.seats} onChange={(e) => setInputData({ ...inputData, seats: e.target.value })} /></p><br /><br />


                <button type="submit">Submit</button>
              </form>
              {/* <div>Result: {result}</div> */}
              <div className="flex">
                {result.map(url => (
                  <img src={process.env.PUBLIC_URL + '/images/Cars/' + url + '.jpg'} alt={url} />
                ))}
              </div>
              {/* <img src={process.env.PUBLIC_URL + '/images/Cars/' + result[0] + '.jpg'} alt="My Image" /> */}
            </div>
          </div>
          {/* <div className="body">
          Hi
          <Card />
        </div> */}

          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Buy
