import { FaLongArrowAltRight } from 'react-icons/fa';
import {
    useApproveBookingRequestByBookingIdMutation,
    useGetDriverByDriverIdQuery,
    useGetUserByIdQuery,
} from '../../../../../redux/services/commonServices';
// import { IoLocation } from 'react-icons/io5';
import {
    dayDifferenceInDays,
    formateDateYYYYMMDD,
} from '../../../../../helpers/Functions/dateFormaters';
import {
    bookingApproveRequest,
    bookingRequests,
    bookingStatus1,
    imageBaseUrl,
} from '../../../../../helpers/constants/idConstants';
import Swal from 'sweetalert2';
// import {
//     useApproveBookingRequestByBookingIdMutation,
//     // useGetDriverByDriverIdQuery,
// } from '../../../../../redux/services/driverServices';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CompleteDriverBookingModal from './CompleteDriverBookingModal';
import { CarLoaderModal } from '../../../../../common/Loaders/Loaders';
import { bookingStatusFormatter } from '../../../../../helpers/Functions/bookingStatusFormatter';

const DriverBookingDetailas = ({ booking }) => {
    const [t] = useTranslation('global');
    const { data: driverdata } = useGetDriverByDriverIdQuery(
        localStorage.getItem('driverId')
    );
    const [showPageLoader, setShowPageLoader] = useState(false);
    // // //('........,,,,,', booking);
    // const {
    //     data: userData,
    //     error: userError,
    //     isLoading: userLoading,
    // } = useGetUserByIdQuery(booking?.userId);

    const [sendApproveBooking, responce] =
        useApproveBookingRequestByBookingIdMutation();
    const [completeModal, setCompleteModal] = useState(false);
    // //('Aprove Booking.................', booking);
    // if (userData) {
    //     // //(userData);
    // }
    // if (userError) {
    //     // //(userError);
    // }
    // if (userLoading) {
    //     // //(userLoading);
    // }

    const handleApproveBooking = () => {
        const bookingStartDate = formateDateYYYYMMDD(
            new Date(booking?.startDate)
        );
        const todayDate = formateDateYYYYMMDD(new Date());
        Swal.fire({
            title: t('booking2.title'),
            text: t('booking2.text'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('booking2.cancel'),
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('booking2.yes'),
            showClass: {
                popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
            },
            hideClass: {
                popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                setShowPageLoader(true);
                let confirmedStatus = '';
                let confirmedRequest = '';

                if (bookingStartDate === todayDate) {
                    confirmedRequest = bookingRequests?.approved;
                    confirmedStatus = bookingStatus1?.inrunning;
                } else if (bookingStartDate < todayDate) {
                    confirmedRequest = bookingRequests?.rejected;
                    confirmedStatus = bookingStatus1?.pending;
                } else if (bookingStartDate > todayDate) {
                    confirmedRequest = bookingRequests?.approved;
                    confirmedStatus = bookingStatus1?.pending;
                }

                // await sendApproveBooking({
                //     ...booking,
                //     bookingStatus: confirmedStatus,
                //     bookingRequest: confirmedRequest,
                // });
                try {
                    const resp = await sendApproveBooking({
                        ...booking,
                        bookingStatus: confirmedStatus,
                        bookingRequest: confirmedRequest,
                    });
                    // // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('booking2.Approvedtitle'),
                            confirmButtonText: t('booking2.yesh'),
                            text: t('booking2.Approvedtext'),
                            icon: 'success',
                            cancelButtonText: t('booking2.cancell'),

                            // 'Approved',
                            // confirmdriverbooking: t('booking2.yesh'),
                            // `Booking approved successfully`,
                            // confirmdriverbooking: t('booking2.cancel')


                            showClass: {
                                popup: `
                              animate__animated
                              animate__fadeInUp
                              animate__faster
                            `,
                            },
                            hideClass: {
                                popup: `
                              animate__animated
                              animate__fadeOutDown
                              animate__faster
                            `,
                            },
                        });
                    }
                    if (resp?.error?.data?.statusCode === 400) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('booking2.driverinvaliddata'),
                            // 'Invalid Data',
                            text: t('booking2.driverinvalidrequest'),
                            // `Invalid data in approve booking request`,
                            icon: 'error',
                            confirmButtonText: t('booking2.okkcostombtn'),
                            showClass: {
                                popup: `
                              animate__animated
                              animate__fadeInUp
                              animate__faster
                            `,
                            },
                            hideClass: {
                                popup: `
                              animate__animated
                              animate__fadeOutDown
                              animate__faster
                            `,
                            },
                        });
                    }
                } catch (error) {
                    setShowPageLoader(false);
                    Swal.fire({
                        title: t('booking2.drivertitle1'),
                        // 'Error',
                        text:t('booking2.drivertext1'),
                        //  'An error occurred while approving booking.',
                        icon: 'error',
                        showClass: {
                            popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `,
                        },
                        hideClass: {
                            popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `,
                        },
                    });
                }
            }
        });
    };
    const handleRejectBooking = () => {
        Swal.fire({
            title: t('booking2.title'),
            text: t('booking2.text2'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('booking2.cancel'),
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('booking2.yes'),
            showClass: {
                popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
            },
            hideClass: {
                popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                // await sendApproveBooking({
                //     ...booking,
                //     bookingStatus: bookingStatus1?.pending,
                //     bookingRequest: bookingRequests?.rejected,
                // });
                try {
                    const resp = await sendApproveBooking({
                        ...booking,
                        bookingStatus: bookingStatus1?.pending,
                        bookingRequest: bookingRequests?.rejected,
                    });
                    // // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title:  t('booking2.drivertitle2'),
                            // 'Rejected',
                            text:  t('booking2.drivertext2'),
                            // `Booking rejected successfully`,
                            confirmButtonText: t('booking2.okkkbtn'),
    
                            icon: 'success',
                            showClass: {
                                popup: `
                              animate__animated
                              animate__fadeInUp
                              animate__faster
                            `,
                            },
                            hideClass: {
                                popup: `
                              animate__animated
                              animate__fadeOutDown
                              animate__faster
                            `,
                            },
                        });
                    }
                    if (resp?.error?.data?.statusCode === 400) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title:  t('booking2.drivertitle3'),
                            // 'Invalid Data',
                            text:  t('booking2.drivertext3'),
                            // `Invalid data in reject booking request`,
                            icon: 'error',
                            confirmButtonText: t('booking2.okkkbtn'),
                            showClass: {
                                popup: `
                              animate__animated
                              animate__fadeInUp
                              animate__faster
                            `,
                            },
                            hideClass: {
                                popup: `
                              animate__animated
                              animate__fadeOutDown
                              animate__faster
                            `,
                            },
                        });
                    }
                } catch (error) {
                    setShowPageLoader(false);
                    Swal.fire({
                        title:  t('booking2.drivertitle4'),
                        // 'Error',
                        text:  t('booking2.drivertext4'),
                        // 'An error occurred while rejecting booking.',
                        icon: 'error',
                        confirmButtonText: t('booking2.okkkbtn'),

                        showClass: {
                            popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `,
                        },
                        hideClass: {
                            popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `,
                        },
                    });
                }
            }
        });
    };

    const calculatePriceMoney = () => {
        const days = dayDifferenceInDays(booking?.startDate, booking?.endDate);
        const price = parseInt(driverdata?.data?.dayWisePrice);
        const total = days === 0 ? price : days >= 1 ? days * price : 0;
        return `${total.toFixed(2)}`;
    };

    return (
        <>
            <div className="row user_booking_card driver_profile_card_image">
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                    {/* <div className=' d-flex justify-content-center align-items-center'>
                    <img
                        
                        src={`${imageBaseUrl}${booking?.userId?.profilePicture}`}
                        className="user_booking_image "
                    />
                </div> */}

                    <div className="row">
                        <div className="xol-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
                            <div className=" d-flex justify-content-center align-items-center">
                                <img
                                    src={`${imageBaseUrl}${booking?.userId?.profilePicture}`}
                                    className="user_booking_image "
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-1">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <div className=" d-flex justify-content-center">
                                <span>
                                    {booking?.userId
                                        ? booking?.userId?.name
                                        : '---'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-1">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <div className="d-grid">
                                <span className=" text-center">
                                    {' '}
                                    {booking?.userId
                                        ? booking?.userId?.email
                                        : '---'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* <div className="d-flex align-items-center flex-column mt-2 fw-semibold">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        

                        <span>
                            {booking?.userId ? booking?.userId?.name : '---'}
                        </span>

                       
                        
                        <span className="mt-1 ">
                            {' '}
                            {booking?.userId ? booking?.userId?.email : '---'}
                        </span>
                       
                    </div>
                </div> */}
                </div>
                <div className="col-12 col-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                    <div className="row mt-3 ">
                        <div className="col-5 col-sm-5 col-md-5 col-xl-5 col-xxl-5 ">
                            <p className=" user_booking_small_font">
                                {t('booking.pickup')}
                            </p>
                            <p className="font_colr fw-bold m-0 ">
                                {booking?.pickupLocation}
                            </p>
                        </div>
                        <div className="col-2 col-sm-2 col-md-2 col-xl-2 col-xxl-2 ">
                            <FaLongArrowAltRight />
                        </div>
                        <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                            <p className=" user_booking_small_font">
                                {t('booking.drop')}
                            </p>
                            <p className="font_colr fw-bold m-0">
                                {booking?.droplocation}
                            </p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-5 col-sm-5 col-md-5 col-xl-5 col-xxl-5">
                            <p className=" user_booking_small_font">
                                {t('booking.pickupdate')}
                            </p>
                            <p className="font_colr fw-bold m-0">
                                {' '}
                                {formateDateYYYYMMDD(booking?.startDate)}
                            </p>
                        </div>
                        <div className="col-2 col-sm-2 col-md-2 col-xl-2 col-xxl-2 ">
                            <FaLongArrowAltRight />
                        </div>
                        <div className="col-5 col-sm-5 col-md-5 col-xl-5 col-xxl-5">
                            <p className=" user_booking_small_font">
                                {t('booking.dropdate')}
                            </p>
                            <p className="font_colr fw-bold m-0">
                                {formateDateYYYYMMDD(booking?.endDate)}
                            </p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-5 col-sm-5 col-md-5 col-xl-5 col-xxl-5">
                            <p className=" user_booking_small_font">
                                {t('booking.price')}
                            </p>
                            <p className="font_colr fw-bold m-0 ">
                                ₹{' '}
                                {/* {dayDifferenceInDays(
                                    booking?.startDate,
                                    booking?.endDate
                                )} */}
                                {/* {() =>{
                                    let days = dayDifferenceInDays(
                                        booking?.startDate,
                                        booking?.endDate
                                    )
                                    let price = booking?.price
                                    let total = days * price
                                    return total
                                }} */}
                                {calculatePriceMoney()}
                                /-
                            </p>
                        </div>
                        <div className="col-2 col-sm-2 col-md-2 col-xl-2 col-xxl-2 ">
                            <FaLongArrowAltRight />
                        </div>
                        <div className="col-5 col-sm-5 col-md-5 col-xl-5 col-xxl-5">
                            <p className=" user_booking_small_font">
                                {t('booking.status')}
                            </p>
                            <p className="font_colr fw-bold m-0">
                                {bookingStatusFormatter(
                                    booking?.bookingStatus,
                                    booking?.bookingRequest
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="row mt-1">
                        <div>
                            {booking?.bookingRequest === 'Pending' && (
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="custom-btn mx-3"
                                        onClick={handleApproveBooking}
                                    >
                                        {t('booking.accept')}
                                    </button>
                                    <button
                                        className="custom-btn custom-btn-non-primary"
                                        onClick={handleRejectBooking}
                                    >
                                        {t('booking.reject')}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="">
                            {booking?.bookingRequest === 'Approve' &&
                                booking?.bookingStatus === 'Pending' && (
                                    <div className="d-flex justify-content-end ">
                                        <button
                                            className="driver_action_btn custom-btn-non-primary top_btn d-flex align-items-center justify-content-center fw-semibold ms-2 w-50 mt-1 mb-1"
                                            onClick={handleRejectBooking}
                                        >
                                            {t('booking.cancelbtn')}
                                            {/* Cancel */}
                                        </button>
                                    </div>
                                )}
                            {booking?.bookingStatus ===
                                bookingStatus1?.inrunning && (
                                <div className="d-flex justify-content-end ">
                                    <button
                                        className="custom-btn"
                                        onClick={() => setCompleteModal(true)}
                                    >
                                        {t('booking2.complete')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CompleteDriverBookingModal
                show={completeModal}
                onHide={() => setCompleteModal(false)}
                bookingData={booking}
                driverdata={driverdata}
            />
            <CarLoaderModal show={showPageLoader} />{' '}
        </>
    );
};
export default DriverBookingDetailas;
