// import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import '../style/UserBookingcards.css';
// import { useGetBookingIdByUserIdQuery } from '../../../../../redux/services/userServices';
// import { imageBaseUrl } from '../../../../../helpers/constants/idConstants';
import { formateDateYYYYMMDD } from '../../../../../helpers/Functions/dateFormaters';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import {
    bookingRequests,
    bookingStatus,
    bookingStatus1,
    imageBaseUrl,
} from '../../../../../helpers/constants/idConstants';
import {
    useApproveBookingRequestByBookingIdMutation,
    useCreateRatingsByBookingMutation,
    useGetRatingsByBookingsIdQuery,
} from '../../../../../redux/services/commonServices';
import { useEffect, useState } from 'react';
import { CarLoaderModal } from '../../../../../common/Loaders/Loaders';
import CreateRatings from '../../../../User/pages/CreateRatings';
import { bookingStatusFormatter } from '../../../../../helpers/Functions/bookingStatusFormatter';
// import { useApproveBookingRequestByBookingIdMutation } from '../../../../../redux/services/driverServices';
// import { FaLocationArrow } from 'react-icons/fa6'

const UserBookingcards = (props: any) => {
    const [t] = useTranslation('global');
    const { booking } = props;

    const profileImgUrl = `${imageBaseUrl}${booking?.userData[0]?.profilePicture}`;
    const vehicleImgUrl = `${imageBaseUrl}${booking?.vehicleData?.vehiclePictures[0]}`;

    console.log(
        'profileImgUrl',
        profileImgUrl,
        '\n',
        'vehicleImgUrl',
        vehicleImgUrl
    );

    const [sendApproveBooking, responce] =
        useApproveBookingRequestByBookingIdMutation();
    const [showPageLoader, setShowPageLoader] = useState(false);
    const {
        data: ratingsData,
        isLoading: ratingLoad,
        isSuccess: ratingSuccess,
    } = useGetRatingsByBookingsIdQuery(booking?._id);
    const [ratings, setRatings] = useState();
    // console.log('BOOOKINGS RATINGS: ', ratingsData);

    // console.log('........ SELECTED RATINGS:', ratings);

    // console.log('BOOKING DATA@@@@@@@@', booking);
    const [createRatingsSend] = useCreateRatingsByBookingMutation();

    useEffect(() => {
        const createRatings = async () => {
            if (!ratingsData?.data?._id) {
                console.log('********* Runned Create Ratings Function');
                const resp = await createRatingsSend({
                    bookingId: booking?._id,
                    rating: ratings,
                    userId: localStorage.getItem('userId'),
                    vehicleDriverId: booking?.vehicleDriverId,
                    comment: '',
                });
                if (resp?.data) {
                    if (resp?.data?.statusCode === 201) {
                        Swal.fire({
                            title: 'Thankyou',
                            text: 'Thankyou for your ratings',
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
                }
                console.log('resp.... of creating ratings: ', resp);
            } else if (ratingsData?.data?._id) {
                console.log('########## Runned Update Ratings Function');
                const resp = await createRatingsSend({
                    ratingId: ratingsData?.data?._id,
                    bookingId: booking?._id,
                    rating: ratings,
                    userId: localStorage.getItem('userId'),
                    vehicleDriverId: booking?.vehicleDriverId,
                    comment: '',
                });
                if (resp?.data) {
                    if (resp?.data?.statusCode === 201) {
                        Swal.fire({
                            title: 'Thankyou',
                            text: 'Thankyou for your feedback',
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
                }
                console.log('resp.... of creating ratings: ', resp);
            }
        };
        createRatings();
    }, [ratings]);

    // {
    //     "ratingId": "string",
    //     "rating": 0,
    //     "userId": "string",
    //     "vehicleDriverId": "string",
    //     "bookingId": "string",
    //     "comment": "string"
    //   }

    const handleRejectBooking = () => {
        Swal.fire({
            title: t('booking2.title'),
            text: t('booking2.text3'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('booking2.cancel'),
            cancelButtonColor: '#D5D7E3',
            // confirmButtonColor: '#3085d6',
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
                try {
                    const resp = await sendApproveBooking({
                        ...booking,
                        bookingStatus: bookingStatus1?.pending,
                        bookingRequest: bookingRequests?.rejected,
                    });
                    // console.log('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('booking2.titlecanceled'),
                            // 'Canceled',
                            text: t('booking2.textcanceled'),
                            // `Booking canceled successfully`,
                            icon: 'success',
                            confirmButtonText: t('booking.ok'),
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
                            title: t('booking2.invaliddatatitle'),
                            // 'Invalid Data',
                            text: t('booking2.invaliddatatext'),
                            // `Invalid data for cancelling booking request`,
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
                } catch (error) {
                    setShowPageLoader(false);
                    Swal.fire({
                        title: t('booking2.errtitle'),
                        // 'Error',
                        text: t('booking2.errtext'),
                        // 'Error in cancelling booking request',
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

    return (
        <>
            {/* <div className="row ">
                <div className="col-12 user_booking_card p-2">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 d-flex justify-content-center flex-column ">
                            <div className=" d-flex justify-content-center align-items-center main_profile_edit">
                                <img
                                    src={`${
                                        booking?.vehicleData === null
                                            ? profileImgUrl
                                            : vehicleImgUrl
                                    }`}
                                    className="booking_imgss"
                                />
                            </div>
                            <div className="d-flex align-items-center flex-column mt-2 fw-semibold main_profile_edit">
                                {booking?.vehicleData === null ? (
                                    <>
                                        <div className="d-flex flex-column justify-content-center align-items-start">
                                            <span>
                                                {booking?.userData[0]?.name
                                                    ? booking?.userData[0]?.name
                                                    : '------'}
                                            </span>
                                            <span>
                                                {booking?.userData[0]?.email
                                                    ? booking?.userData[0]
                                                          ?.email
                                                    : '------'}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="d-flex flex-column justify-content-center align-items-start">
                                            <span>
                                                {
                                                    booking?.vehicleData
                                                        .vehicleName
                                                }
                                            </span>
                                            <span>
                                                {
                                                    booking?.vehicleData
                                                        .modelNumber
                                                }
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
                            <div className="row">
                                <div className="col-5">
                                    <p className=" user_booking_small_font">
                                        {t('booking.pickup')}
                                    </p>
                                    <p className="font_colr fw-bold m-0 ">
                                        {booking?.pickupLocation}
                                    </p>
                                </div>
                                <div className="col-2 d-flex justify-content-center align-items-center">
                                    <FaLongArrowAltRight />
                                </div>
                                <div className="col-5">
                                    <p className=" user_booking_small_font">
                                        {t('booking.drop')}
                                    </p>
                                    <p className="font_colr fw-bold m-0">
                                        {booking?.droplocation}
                                    </p>
                                </div>
                            </div>

                            <div className="row d-flex ">
                                <div className="col-5">
                                    <p className=" user_booking_small_font">
                                        {t('booking.pickupdate')}
                                    </p>
                                    <p className="font_colr fw-bold m-0">
                                        {' '}
                                        {formateDateYYYYMMDD(
                                            booking?.startDate
                                        )}
                                    </p>
                                </div>
                                <div className="col-2 d-flex justify-content-center align-items-center">
                                    {' '}
                                    <FaLongArrowAltRight />
                                </div>
                                <div className="col-5">
                                    <p className=" user_booking_small_font">
                                        {t('booking.dropdate')}
                                    </p>
                                    <p className="font_colr fw-bold m-0">
                                        {formateDateYYYYMMDD(booking?.endDate)}
                                    </p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-5">
                                    <p className=" user_booking_small_font">
                                        {t('booking.price')}
                                    </p>
                                    <p className="font_colr fw-bold m-0">
                                        ₹ {booking.price}/-
                                    </p>
                                </div>
                                <div className="col-2 d-flex justify-content-center align-items-center">
                                    {' '}
                                    <FaLongArrowAltRight />
                                </div>
                                <div className="col-5">
                                    <p className=" user_booking_small_font">
                                        {t('booking.status')}
                                    </p>
                                    <p className="font_colr fw-bold m-0">
                                        {booking?.bookingStatus}
                                    </p>
                                </div>
                            </div>

                            <div>
                                {(booking?.bookingRequest ==='Pending' && booking?.bookingStatus === 'Pending') && (
                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="custom-btn mx-3"
                                                onClick={
                                                    handleRejectBooking
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                            </div>

                            <div className='d-flex justify-content-end mx-5'>
                                {(booking?.bookingRequest ==='Approve'&& booking?.bookingStatus === 'Pending') && (
                                        <div className="d-flex justify-content-end ">
                                            <button
                                                className="custom-btn"
                                                onClick={
                                                    handleRejectBooking
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                            </div> 
                        </div>
                    </div>
                </div>
            </div> */}
            {props?.isRating ? (
                ratingSuccess &&
                !ratingLoad && (
                    <div className="row user_booking_card driver_profile_card_image">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="row mt-1">
                                <div className="xol-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
                                    <div className=" d-flex justify-content-center align-items-center mt-2">
                                        <img
                                            src={`${
                                                booking?.vehicleData === null
                                                    ? profileImgUrl
                                                    : vehicleImgUrl
                                            }`}
                                            className="booking_imgss"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                {booking?.vehicleData === null  ? (
                                    <>
                                        <div className="row mt-1">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <div className=" d-flex justify-content-center">
                                                    <span>
                                                        {booking?.userData[0]
                                                            ?.name
                                                            ? booking
                                                                  ?.userData[0]
                                                                  ?.name
                                                            : '------'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-1">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <div className="d-grid">
                                                    <span>
                                                        {booking?.userData[0]
                                                            ?.email
                                                            ? booking?.userData[0]?.email.trim()
                                                                  .length > 22
                                                                ? booking?.userData[0]?.email
                                                                      .trim()
                                                                      .slice(
                                                                          0,
                                                                          22
                                                                      ) + '...'
                                                                : booking?.userData[0]?.email.trim()
                                                            : '------'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-1 ps-3">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <div className="d-grid justify-content-center mb-2">
                                                    {
                                                        <span>
                                                            {booking?.bookingRequest ===
                                                                'Approve' &&
                                                                booking?.bookingStatus ===
                                                                    bookingStatus1?.completed && (
                                                                    <div>
                                                                        <CreateRatings
                                                                            rate={
                                                                                ratingsData
                                                                                    ?.data
                                                                                    ?.rating
                                                                                    ? ratingsData
                                                                                          ?.data
                                                                                          ?.rating
                                                                                    : ratings
                                                                            }
                                                                            handleChangeRatings={(
                                                                                value
                                                                            ) =>
                                                                                setRatings(
                                                                                    value
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="row mt-1">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <div className=" d-flex justify-content-center">
                                                    <span>
                                                        {
                                                            booking?.vehicleData
                                                                .vehicleName
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-1">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <div className=" d-grid justify-content-center">
                                                    <span>
                                                        {
                                                            booking?.vehicleData
                                                                .modelNumber
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-1 ps-3">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <div className="d-grid justify-content-center mb-2">
                                                    {
                                                        <span>
                                                            {booking?.bookingRequest ===
                                                                'Approve' &&
                                                                booking?.bookingStatus ===
                                                                    bookingStatus1?.completed && (
                                                                    <div>
                                                                        <CreateRatings
                                                                            rate={
                                                                                ratingsData
                                                                                    ?.data
                                                                                    ?.rating
                                                                                    ? ratingsData
                                                                                          ?.data
                                                                                          ?.rating
                                                                                    : ratings
                                                                            }
                                                                            handleChangeRatings={(
                                                                                value
                                                                            ) =>
                                                                                setRatings(
                                                                                    value
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
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
                                        {formateDateYYYYMMDD(
                                            booking?.startDate
                                        )}
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
                                        {/* ₹ {booking?.vehicleData?.kmPrice}/Km. */}
                                        {booking?.driverData
                                            ? booking?.driverData
                                                  ?.dayWisePrice + '/day'
                                            : booking.vehicleData?.kmPrice +
                                              '/Km.'}
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
                                        {/* {booking?.bookingStatus} */}
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
                                            {/* <button
                                        className="custom-btn mx-3"
                                        onClick={handleApproveBooking}
                                    >
                                        {t('booking.accept')}
                                    </button> */}
                                            <button
                                                className="custom-btn custom-btn-non-primary "
                                                onClick={handleRejectBooking}
                                            >
                                                {t('booking2.cnlbutton')}
                                                {/* Cancel */}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="">
                                    {booking?.bookingRequest === 'Approve' &&
                                        booking?.bookingStatus ===
                                            'Pending' && (
                                            <div className="d-flex justify-content-end ">
                                                <button
                                                    className="custom-btn custom-btn-non-primary"
                                                    onClick={
                                                        handleRejectBooking
                                                    }
                                                >
                                                    {t('booking2.cancel2')}
                                                    {/* Cancel */}
                                                </button>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="row user_booking_card driver_profile_card_image">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                        <div className="row mt-1">
                            <div className="xol-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
                                <div className=" d-flex justify-content-center align-items-center">
                                    <img
                                        src={`${
                                            booking?.vehicleData === null
                                                ? profileImgUrl
                                                : vehicleImgUrl
                                        }`}
                                        className="booking_imgss"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            {booking?.vehicleData === null ? (
                                <>
                                    <div className="row mt-1">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <div className=" d-flex justify-content-center">
                                                <span>
                                                    {booking?.userData[0]
                                                        ? booking?.userData[0]
                                                              ?.name
                                                        : '------'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-1">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <div className="d-grid">
                                            <span>
                                                        {booking?.userData[0]
                                                            ?.email
                                                            ? booking?.userData[0]?.email.trim()
                                                                  .length > 22
                                                                ? booking?.userData[0]?.email
                                                                      .trim()
                                                                      .slice(
                                                                          0,
                                                                          22
                                                                      ) + '...'
                                                                : booking?.userData[0]?.email.trim()
                                                            : '------'}
                                                    </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-1">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <div className="d-grid justify-content-center mb-2">
                                                {
                                                    <span>
                                                        {booking?.bookingRequest ===
                                                            'Approve' &&
                                                            booking?.bookingStatus ===
                                                                bookingStatus1?.completed && (
                                                                <div>
                                                                    <CreateRatings
                                                                        rate={
                                                                            ratingsData
                                                                                ?.data
                                                                                ?.rating
                                                                                ? ratingsData
                                                                                      ?.data
                                                                                      ?.rating
                                                                                : ratings
                                                                        }
                                                                        handleChangeRatings={(
                                                                            value
                                                                        ) =>
                                                                            setRatings(
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="row mt-1">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <div className=" d-flex justify-content-center">
                                                <span>
                                                    {
                                                        booking?.vehicleData
                                                            .vehicleName
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-1">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <div className=" d-grid justify-content-center">
                                                <span>
                                                    {
                                                        booking?.vehicleData
                                                            .modelNumber
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-1">
                                        {/* isLoading: ratingLoad,
        isSuccess: ratingSuccess, */}
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <div className="d-grid justify-content-center mb-2">
                                                {
                                                    <span>
                                                        {booking?.bookingRequest ===
                                                            'Approve' &&
                                                            booking?.bookingStatus ===
                                                                bookingStatus1?.completed && (
                                                                <div>
                                                                    <CreateRatings
                                                                        rate={
                                                                            ratingsData
                                                                                ?.data
                                                                                ?.rating
                                                                                ? ratingsData
                                                                                      ?.data
                                                                                      ?.rating
                                                                                : ratings
                                                                        }
                                                                        handleChangeRatings={(
                                                                            value
                                                                        ) =>
                                                                            setRatings(
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
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
                                    {/* ₹ {booking?.vehicleData?.kmPrice}/Km. */}
                                    {booking?.driverData
                                        ? booking?.driverData?.dayWisePrice +
                                          '/day'
                                        : booking.vehicleData?.kmPrice + '/Km.'}
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
                                    {/* {booking?.bookingStatus} */}
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
                                        {/* <button
                                        className="custom-btn mx-3"
                                        onClick={handleApproveBooking}
                                    >
                                        {t('booking.accept')}
                                    </button> */}
                                        <button
                                            className="custom-btn custom-btn-non-primary "
                                            onClick={handleRejectBooking}
                                        >
                                            {t('booking2.cnlbutton')}
                                            {/* Cancel */}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="">
                                {booking?.bookingRequest === 'Approve' &&
                                    booking?.bookingStatus === 'Pending' && (
                                        <div className="d-flex justify-content-end ">
                                            <button
                                                className="custom-btn custom-btn-non-primary"
                                                onClick={handleRejectBooking}
                                            >
                                                {t('booking2.cancel2')}
                                                {/* Cancel */}
                                            </button>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <CarLoaderModal show={showPageLoader} />{' '}
        </>
    );
};

export default UserBookingcards;
