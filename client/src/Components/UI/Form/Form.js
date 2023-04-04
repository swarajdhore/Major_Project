import React from "react";
import "./Form.css";

function Form(props) {
  return (
    <form onSubmit={props.handleSubmit} className="grid grid-row-2">
      <div className="mx-2 my-2 px-2 py-2 text-center text-2xl">
        <h1 className=" text-black">{props.heading}</h1>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-6 md:mb-0">
        <div className="">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="Year"
          >
            Year
          </label>
          <input
            type="int"
            name="Year"
            className="appearance-none  bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 pr-8  mb-3 leading-tight focus:outline-none focus:bg-white"
            value={props.year}
            onChange={props.onChangeYear}
          />
        </div>
        <div className=" ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="sp"
          >
            Selling price
          </label>
          <select
            id="sp"
            name="sp"
            className=" appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 w-full rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={props.SellingPrice}
            onChange={props.onChangeSellingPrice}
          >
            <option value="100000"> less than 100000</option>
            <option value="200000">100000 to 300000</option>
            <option value="400000">300000 to 500000</option>
            <option value="600000">500000 to 700000</option>
            <option value="800000">700000 to 900000</option>
            <option value="1000000">900000 to 1100000</option>
          </select>
        </div>
        <div className="  ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="km"
          >
            km_driven
          </label>
          <select
            id="km"
            name="km"
            className=" appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 w-full rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={props.KmDriven}
            onChange={props.onChangeKmDriven}
          >
            <option value="5000">less than 10000</option>
            <option value="20000">10000 to 30000</option>
            <option value="40000">30000 to 50000</option>
            <option value="60000">50000 to 70000</option>
            <option value="80000">70000 to 90000</option>
            <option value="100000">90000 to 110000</option>
            <option value="120000">110000 to 130000</option>
            <option value="150000">Greater than 130000</option>
          </select>
        </div>
        <div className="">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="fuel"
          >
            Fuel
          </label>
          <select
            id="fuel"
            name="fuel"
            className="appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 w-full rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={props.Fuel}
            onChange={props.onChangeFuel}
          >
            <option value="1">Petrol</option>
            <option value="2">Diesel</option>
            <option value="3">CNG</option>
          </select>
        </div>
        <div className="  ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="transmission"
          >
            transmission
          </label>
          <select
            id="transmission"
            className=" appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 w-full rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name="transmission"
            value={props.Transmission}
            onChange={props.onChangeTransmission}
          >
            <option value="1">Manual</option>
            <option value="2">Automatic</option>
          </select>
        </div>
        <div className=" ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="owner"
          >
            owner
          </label>
          <select
            id="owner"
            name="owner"
            className=" appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 w-full rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={props.Owner}
            onChange={props.onChangeOwner}
          >
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th and above</option>
          </select>
        </div>
        <div className=" ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor=""
          >
            Mileage
          </label>
          <input
            type="int"
            name=""
            className="appearance-none block  bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={props.Mileage}
            onChange={props.onChangeMileage}
          />
        </div>
        <div className=" ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor=""
          >
            Max Power
          </label>
          <input
            type="int"
            name=""
            className="appearance-none block  bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={props.MaxPower}
            onChange={props.onChangeMaxPower}
          />
        </div>
        <div className=" place-items-center">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor=""
          >
            Seats
          </label>
          <input
            type="int"
            name=""
            className="appearance-none block  bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={props.Seats}
            onChange={props.onChangeSeats}
          />
        </div>
      </div>
      {/* <div className="image-wrapper">
          <img
            className="image-element"
            src="/images/vector-img/images.png"
            alt="car-img"
          />
        </div> */}

      <button
        type="submit"
        className=" mx-5 rounded-md border bg-slate-800 text-white border-gray-600  py-1.5 text-base font-semibold leading-7 hover:text-gray-700 hover:bg-gray-600"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
