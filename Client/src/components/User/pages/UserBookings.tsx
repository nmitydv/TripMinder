// import { useGetBookingByUserRequestQuery } from '../../../redux/services/userServices';
import UserBookingcards from '../../common/Cards/BookingCards/pages/UserBookingcards';
import '../style/UserBooking.css';
import { CarAnimation, ContentLoader } from '../../../common/Loaders/Loaders';
import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PageTabs from '../../common/Page Tabs/pages/PageTabs';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    bookingRequests,
    bookingStatus1,
} from '../../../helpers/constants/idConstants';
// import GlobalPagination from '../../common/Pagination/Pages/GlobalPagination';
import noDataFound from '../../../assets/images/no-data-found.svg';
import { useTranslation } from 'react-i18next';
import { userBookingsTabs } from '../../../helpers/constants/tabsData';
import { useGetBookingByUserRequestQuery } from '../../../redux/services/commonServices';

const UserBookings = () => {
    const [t] = useTranslation('global');
    // For Pagination
    // const [total, setTotal] = useState(400);
    // const [limit, setLimit] = useState(20);
    // const [activePage, setActivePage] = useState(1);

    // For Tabs
    // const [activeTab, setActiveTab] = useState('InRunning');
    const [activeTab, setActiveTab] = useState(userBookingsTabs[0]?.value);

    const [isTabActive, setIsTabActive] = useState(bookingRequests.requested);
    // const [isTabStatus, setIsTabStatus] = useState(bookingStatus.inRunning);
    const [isTabStatus, setIsTabStatus] = useState(bookingStatus1?.pending);

    // useEffect(() => {
    //     setActivePage(1);
    // }, [limit]);

    const location = useLocation();

    const navigate = useNavigate();

    const [queryParams, setQueryParams] = useState<string>(
        location.search.includes('bookingStatus=Pending&bookingRequest=Pending')
            ? location.search
            : `?bookingStatus=Pending&bookingRequest=Pending&userId=${localStorage.getItem(
                  'userId'
              )}`
    );

    let userID = localStorage.getItem('userId');

    const {
        data: initialData,
        isLoading: loding,
        refetch,
    } = useGetBookingByUserRequestQuery(queryParams);

    useEffect(() => {
        const existingSearchParams = new URLSearchParams();
        if (isTabStatus) {
            existingSearchParams.set('bookingStatus', isTabStatus);
        }
        if (isTabActive) {
            existingSearchParams.set('bookingRequest', isTabActive.toString());
        }
        existingSearchParams.set('userId', userID);

        const options = {
            pathname: `/user/bookings`,
            search: `?${existingSearchParams}`,
        };
        // //('existingSearchParams', options.search);
        setQueryParams(options.search);
        navigate(options, { replace: true });
    }, [activeTab, location.search, isTabActive, isTabStatus]);

    useEffect(() => {
        refetch();
    }, [queryParams]);

    interface tab {
        name: string;
        value: string;
        isActive: boolean;
        status: string;
    }
    // console.log('...................ACTIVE TAB IS THIS : ', activeTab)
    // : tab[] =

    const handleTabChange = (value: string) => {
        setActiveTab(value);

        navigate(`/ user / bookings ? bookingRequest = ${value}`);
    };

    return (
        <>
            {/* <Row className="fixed-row "> */}
            {/* <Col sm={12} md={12}> */}
            <div className="data_main_ctn bookings_user_ctn">
                <PageTabs
                    activeTab={activeTab}
                    // handleTabs={handleTabChange}
                    handleIsActive={(value: boolean) => setIsTabActive(value)}
                    handleTabs={(value: string) => setActiveTab(value)}
                    tabsData={userBookingsTabs}
                    handleStatus={(value: string) => setIsTabStatus(value)}
                />
                {/* </Col> */}
                {/* </Row> */}

                <div
                    // className="row "
                    className=" row overflow-auto cards_container px-3 mx-2"
                    id="card_ctn"
                    style={{
                        maxWidth: '100%',
                        minHeight: 'calc(100vh - 340px)',
                        maxHeight: 'calc(100vh - 340px)',
                    }}
                >
                    {/* {loding ? (
                    <div id="main_loder">
                        <ContentLoader />
                    </div>
                ) : erroremsg ? (
                    <p>Data Is Not Availavle </p>
                ) : (
                    initialData?.data?.map((booking: any) => (
                        <div
                            key={booking.id}
                            className="col-12 col-md-12 col-lg-6 col-xl-6 p-4"
                        >
                            <UserBookingcards booking={booking} />
                        </div>
                    ))
                )} */}

                    {/* {initialData?.data?.length > 0 && ( */}
                    <div className="row">
                        {initialData?.data?.length > 0 && (
                            <>
                                {initialData?.data
                                    ?.slice()
                                    .reverse()
                                    .map((booking: any) => (
                                        <>
                                            <div
                                                key={booking.id}
                                                className="col-4 p-3"
                                            >
                                                <UserBookingcards
                                                    booking={booking}
                                                    isRating={
                                                        activeTab ===
                                                        'completed'
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </div>
                                        </>
                                    ))}
                            </>
                        )}
                    </div>
                    {loding && (
                        <div
                            className="d-flex justify-content-center align-items-center w-100"
                            style={{ height: '70vh' }}
                        >
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
                                {t('booking.nodata')}
                            </h1>
                        </div> */}
                        </>
                    )}

                    {/* <div>
                    <GlobalPagination
                        total={total}
                        limit={limit}
                        activePage={activePage}
                        handleLimit={(value: number) => setLimit(value)}
                        handleActivePage={(value: number) =>
                            setActivePage(value)
                        }
                    />
                </div> */}
                </div>
            </div>
        </>
    );
};

export default UserBookings;
