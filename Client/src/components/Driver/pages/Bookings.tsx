import UserBookingcards from '../../common/Cards/BookingCards/pages/UserBookingcards';
import { CarAnimation, ContentLoader } from '../../../common/Loaders/Loaders';
import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PageTabs from '../../common/Page Tabs/pages/PageTabs';
import { useLocation, useNavigate } from 'react-router-dom';
import noDataFound from '../../../assets/images/no-data-found.svg';
import {
    bookingRequests,
    bookingStatus,
    bookingStatus1,
} from '../../../helpers/constants/idConstants';
import { useGetAllBookingsByDriverIdQuery } from '../../../redux/services/commonServices';
import DriverBookingDetailas from '../../common/Cards/BookingCards/pages/DriverBookingDetailas';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { driverBookingsTabs } from '../../../helpers/constants/tabsData';

const DriverBookings = () => {
    const [t] = useTranslation('global');
    // For Tabs
    const [activeTab, setActiveTab] = useState(driverBookingsTabs[0]?.value);
    const [isTabActive, setIsTabActive] = useState(bookingRequests?.requested);

    const [isTabStatus, setIsTabStatus] = useState(bookingStatus1.requested);

    const location = useLocation();
    const navigate = useNavigate();
    const userID = localStorage.getItem('driverId');
    const [queryParams, setQueryParams] = useState(location.search.includes("&tab=pending&bookingRequest=Pending") ? location.search : `?vehicleDriverId=${userID}&tab=pending&bookingRequest=Pending`);


    const {
        data: initialData,
        isLoading: loding,
        refetch,
    } = useGetAllBookingsByDriverIdQuery(queryParams);

    useEffect(() => {
        const existingSearchParams = new URLSearchParams(location.search);
        existingSearchParams.set('vehicleDriverId', userID);
        existingSearchParams.set('tab', activeTab);
        if (isTabStatus) {
            existingSearchParams.set('bookingStatus', isTabStatus);
        }
        if (isTabActive) {
            existingSearchParams.set('bookingRequest', isTabActive);
        }

        const options = {
            pathname: `/driver/bookings`,
            search: `?${existingSearchParams}`,
        };
        setQueryParams(options.search);
        navigate(options, { replace: true });
    }, [activeTab, isTabStatus, location.search, userID, isTabActive]);

    useEffect(() => {
        refetch();
    }, [queryParams]);

    // interface tab {
    //     name: string;
    //     value: string;
    //     isActive: boolean;
    //     status: string;
    // }

    // const handleTabChange = (value: string) => {
    //     setActiveTab(value);

    //     navigate(`/user/bookings?bookingRequest = ${value}`);
    // };

    return (
        <>
            {/* <Row className="fixed-row "> */}
            {/* <Col sm={12} md={12}> */}
            <div className="data_main_ctn bookings_user_ctn">
                <PageTabs
                    activeTab={activeTab}
                    handleIsActive={(value: boolean) => setIsTabActive(value)}
                    handleTabs={(value: string) => setActiveTab(value)}
                    tabsData={driverBookingsTabs}
                    handleStatus={(value: string) => setIsTabStatus(value)}
                    isBlocked={true}
                />
                {/* </Col> */}
                {/* </Row> */}

                <div
                    // className="row "
                    className="row overflow-auto px-3 mt-3 mx-2"
                    id="card_ctn"
                    style={{
                        maxWidth: '100%',
                        // minHeight: 'calc(100vh - 215px)',
                        maxHeight: 'calc(100vh - 215px)',
                    }}
                >
                    {/* {loding ? (
                    <div id="main_loder">
                        <ContentLoader />
                    </div>
                ) : erroremsg ? (
                    <>
                    <div className="card-body nodata_img_div">
                        <img
                            src={noDataFound}
                            className="nodata_img"
                            alt=""
                        />
                    </div>
                    <div>
                        <h1 className="text-center">
                            No Data Found
                        </h1>
                    </div>
                </>
                ) : (
                    initialData?.data?.map((booking: any) => (
                        <div
                            key={booking.id}
                            className="col-12 col-xm-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-3"
                        >
                           <DriverBookingDetailas booking={booking} />
                        </div>
                    ))
                )} */}

                    {initialData?.data?.length > 0 && (
                        <>
                            {initialData?.data?.slice().reverse().map((booking: any) => (
                                <>
                                    <div
                                        key={booking.id}
                                        className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-4 p-3"
                                    >
                                        <DriverBookingDetailas
                                            booking={booking}
                                        />
                                    </div>
                                </>
                            ))}
                        </>
                    )}
                    {loding && (
                        <div
                            className="d-flex justify-content-center align-items-center w-100"
                            style={{ height: '70vh' }}
                        >
                            {/* <ContentLoader /> */}
                            <CarAnimation />
                        </div>
                    )}
                    {!loding && initialData?.data?.length <= 0 && (
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
                                {t('booking.nodata2')}
                            </h1>
                        </div> */}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default DriverBookings;
