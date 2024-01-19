import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PageTabs from '../../common/Page Tabs/pages/PageTabs';
import { Bookings } from '../../../helpers/types/apiDataTypes';
import { CarAnimation, ContentLoader } from '../../../common/Loaders/Loaders';
import ListAllVehicles from './ListAllVehicles';
import noDataFound from '../../../assets/images/no-data-found.svg';
import handNavigate from '../../../assets/images/hand_navigate.jpg';
import {
    bookingRequests,
    bookingStatus1,
    viewDatatype,
} from '../../../helpers/constants/idConstants';
import '../styles/Bookings.css';
import { useEffect, useState } from 'react';
import VehicleBookingsCard from '../../common/Cards/Owner Vehicle/pages/VehicleBookingsCard';
import { useTranslation } from 'react-i18next';
import { vehicleOwnerBookingTabs } from '../../../helpers/constants/tabsData';
import { useGetOwnerBookingsByVehicleidAndStatusQuery } from '../../../redux/services/commonServices';
import { ImArrowRight } from 'react-icons/im';
import UserBookingcards from '../../common/Cards/BookingCards/pages/UserBookingcards';
import UserBookingsTable from '../../common/Data Tables/UserBookingsTable';
// import { useGetOwnerBookingsByVehicleidAndStatusQuery } from '../../../redux/services/commonServices';

const OwnerBookings = () => {
    const [t] = useTranslation('global');
    // const { vehicleid, status } = useParams();
    const [activeTab, setActiveTab] = useState(
        vehicleOwnerBookingTabs[0]?.value
    );
    const [isTabActive, setIsTabActive] = useState(bookingRequests?.requested);
    const [isTabApproved, setIsTabApproved] = useState(bookingStatus1?.pending);
    const [dataViewType, setDataViewType] = useState(viewDatatype?.card);
    const navigate = useNavigate();
    const location = useLocation();

    const [queryParams, setQueryParams] = useState(location.search);

    const oldQueryParams = new URLSearchParams(location.search);
    const vehicleIdold = oldQueryParams.get('vehicleDriverId');
    const [vehicleID, setVehicleID] = useState(vehicleIdold);

    const {
        data: bookingData,
        isLoading,
        refetch,
    } = useGetOwnerBookingsByVehicleidAndStatusQuery(queryParams);

    useEffect(() => {
        const vehicleIdold = oldQueryParams.get('vehicleDriverId');
        const existingSearchParams = new URLSearchParams(location.search);
        existingSearchParams.set('tab', activeTab);
        if (isTabApproved) {
            existingSearchParams.set('bookingStatus', isTabApproved);
        }
        if (isTabActive) {
            existingSearchParams.set('bookingRequest', isTabActive);
        }
        existingSearchParams.set('vehicleDriverId', vehicleIdold);
        setVehicleID(vehicleIdold);
        const options = {
            pathname: '/vehicle/bookings',
            search: `?${existingSearchParams.toString()}`,
        };
        setQueryParams(options.search);
        navigate(options, { replace: true });
    }, [vehicleID, isTabActive, isTabApproved, location.search, activeTab]);

    useEffect(() => {
        refetch();
    }, [queryParams]);

    const tableHeadings = [
        'Sr.',
        'Profile',
        'Name',
        'Email',
        'Mobile',
        'Age',
        'Gender',
        'Location',
        'Joining Date',
        'Action',
    ];

    return (
        <>
            <div className="container-fluid" style={{ minHeight: '87vh' }}>
                <div className="row">
                    <div
                        className="col-9"
                        style={{ borderRight: '2px dashed #D5D7E3' }}
                    >
                        <div className="data_main_ctn bookings_ctn">
                            <PageTabs
                                activeTab={activeTab}
                                handleTabs={(value: string) =>
                                    setActiveTab(value)
                                }
                                handleIsActive={(value: boolean) =>
                                    setIsTabActive(value)
                                }
                                handleStatus={(value: string) =>
                                    setIsTabApproved(value)
                                }
                                tabsData={vehicleOwnerBookingTabs}
                                handleDataView={(value: string) =>
                                    setDataViewType(value)
                                }
                                dataViewType={dataViewType}
                            />
                            {vehicleID !== 'vehicleid' ? (
                                dataViewType === viewDatatype?.card ? (
                                    <div
                                        className="overflow-auto mt-3 mx-2 px-3"
                                        id="card_ctn"
                                        style={{
                                            maxWidth: '100%',
                                            minHeight: 'calc(100vh - 215px)',
                                            maxHeight: 'calc(100vh - 215px)',
                                        }}
                                    >
                                        <div className="row d-flex justify-content-start">
                                            {bookingData &&
                                                bookingData.data.length > 0 && (
                                                    <>
                                                        {bookingData?.data?.map(
                                                            (
                                                                vehicle: Bookings
                                                            ) => (
                                                                <div
                                                                    className="col-4"
                                                                    style={{
                                                                        height: '100%',
                                                                    }}
                                                                    // key={index}
                                                                >
                                                                    <VehicleBookingsCard
                                                                        bookingData={
                                                                            vehicle
                                                                        }
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                        </div>
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
                                            bookingData &&
                                            bookingData?.data?.length <= 0 && (
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
                                                    {t('createvehicle.nodata')}
                                                </h1>
                                            </div> */}
                                                </>
                                            )}
                                    </div>
                                ) : (
                                    <div
                                        className="overflow-auto mt-3 mx-2 px-3"
                                        id="card_ctn"
                                        style={{
                                            maxWidth: '100%',
                                            minHeight: 'calc(100vh - 215px)',
                                            maxHeight: 'calc(100vh - 215px)',
                                        }}
                                    >
                                        <div className="row d-flex justify-content-start">
                                            {/* {bookingData &&
                                                bookingData.data.length > 0 && (
                                                    <>
                                                        {bookingData?.data?.map(
                                                            (
                                                                vehicle: Bookings
                                                            ) => (
                                                                <div
                                                                    className="col-4"
                                                                    style={{
                                                                        height: '100%',
                                                                    }}
                                                                    // key={index}
                                                                > */}
                                            <UserBookingsTable
                                                data={bookingData?.data}
                                                headings={tableHeadings}
                                            />
                                            {/* </div>
                                                            )
                                                        )}
                                                    </>
                                                )} */}
                                        </div>
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
                                            bookingData &&
                                            bookingData?.data?.length <= 0 && (
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
                                                {t('createvehicle.nodata')}
                                            </h1>
                                        </div> */}
                                                </>
                                            )}
                                    </div>
                                )
                            ) : (
                                <div>
                                    {/* <h1> {t('createvehicle.selectcar')}</h1> */}
                                    <div className="d-flex justify-content-center align-items-center navigate_div">
                                        <h1 className="heading_navigate">
                                            {t('createvehicle.selectcar')}
                                        </h1>
                                        <h1 className="heading_navigate">
                                            {t('createvehicle.selectcar2')}
                                        </h1>

                                        {/* <img
                                            src={handNavigate}
                                            className="navigate_img"
                                            alt=""
                                        /> */}
                                        <ImArrowRight
                                            color={'#5A607F'}
                                            className="mt-5"
                                            size={150}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-3 mt-3">
                        <div
                        // className="overflow-auto cards_container mt-3 px-3"
                        // id="card_ctn"
                        // style={{
                        //     maxWidth: '100%',
                        //     minHeight: 'calc(100vh - 215px)',
                        //     maxHeight: 'calc(100vh - 215px)',
                        // }}
                        >
                            <ListAllVehicles />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OwnerBookings;
