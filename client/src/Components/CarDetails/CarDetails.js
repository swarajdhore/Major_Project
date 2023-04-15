import React from "react";

import { useNavigate } from "react-router-dom";

import "./CarDetails.css";
// import CarPage from "../../Pages/CarPage";

// export data;
export function CarDetails(props) {
  const car = props.car;
  const navigate = useNavigate();

  const toCarPage = () => {
    navigate("/car-information", { state: { car: car } });
  };
  // const {}
  const image = process.env.PUBLIC_URL + "/images/Cars/";
  console.log(typeof car);
  console.log("Name", car.index);
  console.log("Object", car);

  return (
    <a onClick={() => toCarPage()} href="/car-information">
      <div className="card-container ">
        <img
          className="image-container"
          src={image + car.index + ".jpg"}
          alt={props.alt}
        />
        <p className="text-white">{car.index}</p>
        {/* <div hidden>
      <CarPage car={car} />
      </div> */}
      </div>
    </a>
  );
}

// export function CarPage(props) {
//   // const car = props.car;
//   const image = process.env.PUBLIC_URL + "/images/Cars/";
//   console.log(props.name);
//   // console.log("Name", car.index);

//   return (
//     <>
//       <Navbar></Navbar>
//       <div
//         className="car-info"
//         style={{
//           backgroundImage: `url(https://stimg.cardekho.com/images/carexteriorimages/630x420/Mercedes-Benz/AMG-GT-4-Door-Coupe/9792/1681201395108/front-left-side-47.jpg?tr=w-456)`,
//           // backgroundImage: `url(${process.env.PUBLIC_URL + "/image.png"})`,
//           // backgroundImage: {
//           //   // `url(https://stimg.cardekho.com/images/carexteriorimages/630x420/Mercedes-Benz/AMG-GT-4-Door-Coupe/9792/1681201395108/front-left-side-47.jpg?tr=w-456)`
//           //   flex: 1,
//           //   resizeMode: "cover", // or 'stretch'
//           // },
//         }}
//       ></div>
//       <div>
//         <div className="bg-img">
//           <img
//             className="img-container"
//             src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Mercedes-Benz/AMG-GT-4-Door-Coupe/9792/1681201395108/front-left-side-47.jpg?tr=w-456"
//             // src={image + car.index + ".jpg"}
//             // alt={props.alt}
//             alt="Image"
//           />
//         </div>
//         <div className="info-container">
//           <p className="name">
//             {/* {car.index} */}
//             Mercedes-Benz AMG GT
//           </p>
//           <div className="group-of-four">
//             {/* <div className="comments-container"> */}
//             {/* {car.index} */}
//             {/* {car.alt} */}
//             <p className="price">
//               &#8377; 3.3 Cr*
//               {/* Selling Price: */}
//               {/* {car.sellPrice} */}
//             </p>

//             <p>
//               Fuel:
//               {/* {car.fuel} */}
//             </p>
//             <p>
//               Id:
//               {/* {car.id} */}
//             </p>
//           </div>
//           <div className="group-of-four">
//             <p>
//               Kilometers Driven:
//               {/* {car.kmDriven} */}
//             </p>
//             <p>
//               Max Power:
//               {/* {car.maxPower} */}
//             </p>
//             <p>
//               Mileage:
//               {/* {car.mileage} */}
//             </p>
//             <p>
//               Owner:
//               {/* {car.owner} */}
//             </p>
//           </div>
//           <div className="group-of-four">
//             <p>
//               Seats:
//               {/* {car.seats} */}
//             </p>
//             <p>
//               Engine:
//               {/* {car.engine} */}
//             </p>
//             <p>
//               Transmission:
//               {/* {car.transmission} */}
//             </p>
//             <p>
//               Year:
//               {/* {car.year} */}
//             </p>
//           </div>
//           {/* </div> */}
//         </div>
//         <div className="buy-button">
//           <button className="bg-black text-white">Buy</button>
//         </div>
//       </div>
//     </>
//   );
// }
