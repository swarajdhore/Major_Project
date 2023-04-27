import React from "react";
import "./Form.css";

function FormPred(props) {
  console.log(props.car);
  return (
    <form onSubmit={props.handleSubmit} className="grid grid-row-2">
      <div className="mx-2 my-2 px-2 py-2 text-center text-2xl">
        <h1 className=" text-black">{props.heading}</h1>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-6 md:mb-0">
        <div className="">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="Car"
          >
            Car
          </label>
          <select
            type="string"
            name="Car"
            className="appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 w-full rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={props.car}
            onChange={props.onChangeCar}
          >
            <option value="1">Skoda</option>
            <option value="2">Maruti</option>
            <option value="3">Honda</option>
            <option value="4">Hyundai</option>
            <option value="5">Toyota</option>
            <option value="6">Ford</option>
            <option value="7">Renault</option>
            <option value="8">Mahindra</option>
            <option value="9">Tata</option>
            <option value="10">Chevrolet</option>
            <option value="11">Datsun</option>
            <option value="12">Jeep</option>
            <option value="13">Mercedes-Benz</option>
            <option value="14">Mitsubishi</option>
            <option value="15">Audi</option>
            <option value="16">Volkswagen</option>
            <option value="17">BMW</option>
            <option value="18">Nissan</option>
            <option value="19">Lexus</option>
            <option value="20">Jaguar</option>
            <option value="21">Land</option>
            <option value="22">MG</option>
            <option value="23">Volvo</option>
            <option value="24">Daewoo</option>
            <option value="25">Kia</option>
            <option value="26">Fiat</option>
            <option value="27">Force</option>
            <option value="28">Ambassador</option>
            <option value="29">Ashok</option>
            <option value="30">Isuzu</option>
            <option value="31">Opel</option>
          </select>
        </div>
        <div className="">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="Year"
          >
            Year
          </label>
          <input
            type="number"
            name="Year"
            className="appearance-none  bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 pr-8  mb-3 leading-tight focus:outline-none focus:bg-white"
            value={props.year}
            onChange={props.onChangeYear}
          />
        </div>
        {/* <div className=" ">
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
        </div> */}
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
            type="number"
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
          <select
            type="int"
            name=""
            className=" appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 w-full rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={props.MaxPower}
            onChange={props.onChangeMaxPower}
          >
            <option value="110">100-120</option>
            <option value="130">120-140 </option>
            <option value="150">140-160 </option>
            <option value="170">160-180 </option>
            <option value="190">180-200 </option>
            <option value="210">200 and above </option>
          </select>
        </div>
        <div className=" place-items-center">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor=""
          >
            Seats
          </label>
          <select
            type="int"
            name=""
            className=" appearance-none  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 w-full rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={props.Seats}
            onChange={props.onChangeSeats}
          >
            {/* <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option> */}
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
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
        Get Price!
      </button>
    </form>
  );
}

export default FormPred;
