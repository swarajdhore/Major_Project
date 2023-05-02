import React, { useState } from 'react'
// import Card from '../UI/Card/Card';
import SellCarDetails from './SellCarDetails';

function SellingCars({ details }) {

    return (
        <div className="flex px-4">
            {(details.map(detail => (
                <SellCarDetails key={detail.carName}
                    name={detail.carName}
                    year={detail.year}
                    numberPlate={detail.numberPlate}
                    price={detail.price}

                    userName={detail.userName}>
                    <div className="px-4" key={detail.carName}>
                        <h2>{detail.carName}</h2>
                        <p>{detail.year}</p>
                        <p>{detail.numberPlate}</p>
                        <p>{detail.price}</p>
                        <p>{detail.userName}</p>
                    </div>
                </SellCarDetails>
            )))}
        </div>
    );
}

export default SellingCars;