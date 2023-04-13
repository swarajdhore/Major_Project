import React from 'react'

function SellingCars({ details }) {
    return (
        <div>
            {details.map(detail => (
                <div key={detail.carName}>
                    <h2>{detail.carName}</h2>
                    <p>{detail.year}</p>
                    <p>{detail.numberPlate}</p>
                    <p>{detail.price}</p>
                    <p>{detail.userName}</p>
                </div>
            ))}
        </div>
    );
}

export default SellingCars;