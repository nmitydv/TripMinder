import { useState } from 'react';
import { imageBaseUrl } from '../../../helpers/constants/idConstants';
import '../styles/ListAllVehicles.css';
const VehicleSideCardSmall = ({
    data,
    index,
    activeCardIndex,
    handleActiveIndex,
}) => {
    // //(activeCardIndex, index);
    return (
        <>
            <div
                className={`side_vehicle_box d-flex align-items-center mb-3 py-2 ${
                    activeCardIndex == index ? 'bg-info' : ''
                }}`}
                onClick={() => handleActiveIndex(index)}
            >
                <div className="">
                    <img
                        // src={`${imageBaseUrl}${data?.vehiclePictures[0]}`}
                        src="https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=1600"
                        alt=""
                        className="side_vehicle_imgbox"
                    />
                </div>
                <div>
                    <h4 className="fw-bold">{data?.vehicleName}</h4>
                    <h6 className="fw-semibold">{data?.vehicleNumber}</h6>
                    <p>{data?.availability ? 'Available' : 'Not Available'}</p>
                </div>
            </div>
        </>
    );
};

export default VehicleSideCardSmall;
