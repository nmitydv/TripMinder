import { FaAngleRight } from 'react-icons/fa6';
import '../styles/ListAllVehicles.css';
import { CgMenuLeftAlt } from 'react-icons/cg';
import { useNavigate, useLocation } from 'react-router';
import {
    imageBaseUrl,
    vehicleStatus,
} from '../../../helpers/constants/idConstants';
// import { useGetAllVehiclesByOwnerIdQuery } from '../../../redux/services/vehicleOwnerServices';
import { useState } from 'react';
import { CarAnimation, ContentLoader } from '../../../common/Loaders/Loaders';
import { Vehicle } from '../../../helpers/types/apiDataTypes';
import VehicleSideCardSmall from './VehicleSideCardSmall';
import noDataFound from '../../../assets/images/no-data-found.svg';
import { useTranslation } from 'react-i18next';
import { useGetAllVehiclesByOwnerIdQuery } from '../../../redux/services/commonServices';
const ListAllVehicles = () => {
    const [t] = useTranslation('global');
    const navigate = useNavigate();
    const location = useLocation();
    const userId = localStorage.getItem('userId');

    const queryParams1 = new URLSearchParams(location.search);
    const tabValue = queryParams1.get('vehicleDriverId');
    console.log('........', tabValue);

    const [queryParams, setQueryParams] = useState(location.search);

    // const [activeTab, setActiveTab] = useState('Active');
    const [isTabActive, setIsTabActive] = useState(true);
    const [isTabApproved, setIsTabApproved] = useState(vehicleStatus?.approved);
    const [activeCardIndex, setActiveCardIndex] = useState();

    const handleTabChange = (tabData) => {
        setIsTabActive(tabData?.isActive);
        setIsTabApproved(tabData?.status);
    };

    const {
        data: vehiclesData,
        isLoading,
        // refetch,
    } = useGetAllVehiclesByOwnerIdQuery({
        userId: userId ?? '',
        isActive: isTabActive,
        isApprove: isTabApproved,
    });

    const handleSelectTabCard = (index) => {
        setActiveCardIndex(index);
        const existingSearchParams = new URLSearchParams(location.search);
        localStorage.setItem('activeCardIndexId', vehiclesData?.data[index]?._id);
        existingSearchParams.set(
            'vehicleDriverId',
            vehiclesData?.data[index]?._id
        );

        const options = {
            pathname: '/vehicle/bookings',
            search: `?${existingSearchParams.toString()}`,
        };
        setQueryParams(options.search);
        navigate(options, { replace: true });
    };

    const tabsData = [
        {
            name: t('listallvehicles.active'),
            value: 'Active',
            isActive: true,
            status: vehicleStatus?.approved,
        },
        {
            name: t('listallvehicles.deactivate'),
            value: 'Deactive',
            isActive: false,
            status: vehicleStatus?.approved,
        },
        // {
        //     name: 'Requested',
        //     value: 'Requested',
        //     isActive: false,
        //     status: vehicleStatus?.requested,
        // },
        // {
        //     name: 'Rejected',
        //     value: 'Rejected',
        //     isActive: false,
        //     status: vehicleStatus?.rejected,
        // },
    ];

    return (
        <>
            <div className="bookings_vehicle_ctn">
                <div className="d-flex justify-content-between list_top_header align-items-center w-100 ps-4 pe-2">
                    <h6>
                        {t('createvehicle.selectvehiclestatus')}{' '}
                        <FaAngleRight className="ms-3" />
                    </h6>
                    <div className="dropdown">
                        <button
                            className="btn bg-transparent border-0 text-dark fw-bold"
                            type="button"
                            id="dropdownMenu2"
                            data-bs-toggle="dropdown"
                        >
                            <CgMenuLeftAlt size={30} />
                        </button>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenu2"
                        >
                            {tabsData?.map((tab, index) => (
                                <>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => handleTabChange(tab)}
                                    >
                                        {tab.name}
                                    </button>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    className="overflow-auto cards_container mt-3 ms-2 ps-3 pe-2 me-2"
                    id="card_ctn"
                    style={{
                        maxWidth: '100%',
                        minHeight: 'calc(100vh - 183px)',
                        maxHeight: 'calc(100vh - 183px)',
                        borderRadius: '0px',
                    }}
                >
                    {vehiclesData && vehiclesData.data.length > 0 && (
                        <>
                            {vehiclesData?.data?.map(
                                (vehicle: Vehicle, index) => (
                                    <>
                                        <div
                                            className={`side_vehicle_box d-flex align-items-center mb-3 py-4 ${
                                                tabValue === vehicle?._id
                                                    ? 'side_vehicle_box_active_vehicle'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                handleSelectTabCard(index);
                                                localStorage.setItem(
                                                    'booking_price',
                                                    vehicle?.kmPrice.toString()
                                                );
                                            }}
                                        >
                                            <div className="">
                                                {/* {console.log(
                                                    'compare',
                                                    tabValue,
                                                    vehicle?._id
                                                )} */}
                                                <img
                                                    src={`${imageBaseUrl}${vehicle?.vehiclePictures[0]}`}
                                                    alt=""
                                                    className="side_vehicle_imgbox me-2"
                                                />
                                            </div>
                                            <div>
                                                <h5 className="fw-bold text-capitalize">
                                                    {vehicle?.vehicleName}
                                                </h5>
                                                <p className="">
                                                    {vehicle?.vehicleNumber}
                                                </p>
                                                <p>
                                                    {vehicle?.availability
                                                        ? t(
                                                              'listallvehicles.available'
                                                          )
                                                        : 'Not Available'}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )
                            )}
                        </>
                    )}
                    {isLoading && (
                        <div
                            className="d-flex justify-content-center align-items-center w-100"
                            style={{ height: '70vh' }}
                        >
                            {/* <ContentLoader /> */}
                            <CarAnimation />
                        </div>
                    )}
                    {!isLoading &&
                        vehiclesData &&
                        vehiclesData?.data?.length <= 0 && (
                            <>
                                <div className="card-body nodata_img_div d-flex justify-content-center align-items-center mt-5">
                                    <img
                                        src={noDataFound}
                                        className="nodata_img"
                                        alt=""
                                    />
                                </div>
                                {/* <div>
                                    <h1 className="text-center">
                                        {' '}
                                        {t('createvehicle.nodata')}
                                    </h1>
                                </div> */}
                            </>
                        )}
                </div>
            </div>
        </>
    );
};

export default ListAllVehicles;
