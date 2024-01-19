import Swal from 'sweetalert2';
import { formateDateYYYYMMDD } from '../../../../../helpers/Functions/dateFormaters';
import {
    bookingRequests,
    bookingStatus1,
    imageBaseUrl,
} from '../../../../../helpers/constants/idConstants';
// import { useApproveBookingRequestByBookingIdMutation } from '../../../../../redux/services/driverServices';
import { Modal } from 'rsuite';
import CardHeader from '../../../../../common/Card Header/CardHeader';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CompleteBookingModal from './CompleteBookingModal';
import ConfirmbookingModal from './ConfirmBookingModal';
import '../styles/VehicleBookingsCards.css';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useApproveBookingRequestByBookingIdMutation } from '../../../../../redux/services/commonServices';
import { CarLoaderModal } from '../../../../../common/Loaders/Loaders';

const VehicleBookingsCard = ({ bookingData }) => {
    const [t] = useTranslation('global');
    const [sendApproveBooking] = useApproveBookingRequestByBookingIdMutation();
    const [showPageLoader, setShowPageLoader] = useState(false);

    const [completeModal, setCompleteModal] = useState(false);
    const bookingPrice = localStorage.getItem('booking_price');

    // //('Booking Data', bookingData);
    const handleApproveBooking = () => {
        const bookingStartDate = formateDateYYYYMMDD(
            new Date(bookingData?.startDate)
        );
        const todayDate = formateDateYYYYMMDD(new Date());

        Swal.fire({
            title: t('vehiclebookings.title'),
            text: t('vehiclebookings.text'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('booking2.cancel'),
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('vehiclebookings.confirm'),
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
                //     ...bookingData,
                //     bookingStatus: confirmedStatus,
                //     bookingRequest: confirmedRequest,
                // });
                try {
                    const resp = await sendApproveBooking({
                        ...bookingData,
                        bookingStatus: confirmedStatus,
                        bookingRequest: confirmedRequest,
                    });
                    // // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('vehiclebookings.vehiclecardtitle1'),
                            // 'Approved',
                            text: t('vehiclebookings.vehiclecardtext1'),
                            // `Booking approved successfully`,
                            icon: 'success',
                            confirmButtonText:t('vehiclecards.okkbutton'),
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
                            title: t('vehiclebookings.vehiclecardtitle2'),
                            // 'Invalid Data',
                            text: t('vehiclebookings.vehiclecardtext2'),
                            // `Invalid data in approve booking request`,
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
                        title: t('vehiclebookings.vehiclecardtitle3'),
                        // 'Error',
                        text: t('vehiclebookings.vehiclecardtitle3'),
                        // 'An error occurred while approving booking.',
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
            title: t('vehiclebookings.title'),
            text: t('vehiclebookings.text2'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('booking2.cancel'),
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('vehiclebookings.confirm2'),
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
                        ...bookingData,
                        bookingStatus: bookingStatus1?.pending,
                        bookingRequest: bookingRequests?.rejected,
                    });
                    // // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('vehiclebookings.vehiclecardtitle4'),
                            // 'Rejected',
                            text: t('vehiclebookings.vehiclecardtext4'),
                            // `Booking rejected successfully`,
                            confirmButtonText:t('vehiclecards.okkbutton'),
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
                            title: t('vehiclebookings.vehiclecardtitle5'),
                            // 'Invalid Data',
                            text: t('vehiclebookings.vehiclecardtitle5'),
                            // `Invalid data in reject booking request`,
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
                        title: t('vehiclebookings.vehiclecardtitle6'),
                        // 'Error',
                        text: t('vehiclebookings.vehiclecardtitle6'),
                        // 'An error occurred while rejecting booking.',
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
    // const handleCompleteBooking = () => {};

    return (
        <>
            <div className="container-fluid d-flex ">
                {/* <div className="card col-12 ">
                    <div className="card-body row d-flex">
                        <div className="col-3">
                            <img
                                src={`${
                                    bookingData?.userId
                                        ? imageBaseUrl +
                                          bookingData?.userId?.profilePicture
                                        : ''
                                }`}
                                alt="user image"
                                className="booking_img_owner"
                            />
                        </div>

                        <div className="col-9 d-flex justify-content">
                            <div className="col-6 d-flex text-wrap mt-3 ">
                                <div className="row">
                                    <div className="row d-flex mb-2">
                                        <div className="col-4 d-flex justify-content-start">
                                            {t('vehiclebookings.name')}
                                        </div>
                                        <div className="driver-card-data col-8 d-flex justify-content-start">
                                            {bookingData?.userId
                                                ? bookingData?.userId?.name
                                                : '---'}{' '}
                                        </div>
                                    </div>

                                    <div className="row d-flex mb-2">
                                        <div className="col-4 d-flex justify-content-start">
                                            {t('vehiclebookings.contact')}
                                        </div>
                                        <div className="driver-card-data col-8 d-flex justify-content-start">
                                            {bookingData?.userId
                                                ? bookingData?.userId
                                                      ?.mobileNumber
                                                : '---'}{' '}
                                        </div>
                                    </div>

                                    <div className="row d-flex mb-2">
                                        <div className="col-4 d-flex justify-content-start">
                                            {t('vehiclebookings.email')}
                                        </div>
                                        <div className="driver-card-data col-8 d-flex justify-content-start">
                                            {bookingData?.userId
                                                ? bookingData?.userId?.email
                                                : '---'}{' '}
                                        </div>
                                    </div>
                                </div>
                                <div className="verticle-line mx-3 mt-1 ">
                                    {' '}
                                </div>
                            </div>
                            <div className="col-6 d-flex text-wrap mt-3">
                                <div className="container-fluid row">
                                    <div className="row d-flex mb-1">
                                        <div className="col-6 d-flex justify-content-start">
                                            {t('vehiclebookings.pickup')}
                                        </div>
                                        <div className="driver-card-data col-6 d-flex justify-content-start">
                                            {formateDateYYYYMMDD(
                                                bookingData?.startDate
                                            )}{' '}
                                        </div>
                                    </div>

                                    <div className="row d-flex mb-1">
                                        <div className="col-6 d-flex justify-content-start">
                                            {t('vehiclebookings.drop')}
                                        </div>
                                        <div className="driver-card-data col-6 d-flex justify-content-start">
                                            {formateDateYYYYMMDD(
                                                bookingData?.endDate
                                            )}
                                        </div>
                                    </div>

                                    <div className="row d-flex mb-1">
                                        <div className="col-6 d-flex justify-content-start">
                                            {t(
                                                'vehiclebookings.pickuplocation'
                                            )}
                                        </div>
                                        <div className="driver-card-data col-6 d-flex justify-content-start">
                                            {bookingData?.pickupLocation}
                                        </div>
                                    </div>

                                    <div className="row d-flex mb-1">
                                        <div className="col-6 d-flex justify-content-start">
                                            {t(
                                                'vehiclebookings.dropuplocation2'
                                            )}
                                        </div>
                                        <div className="driver-card-data col-6 d-flex justify-content-start">
                                            {bookingData?.droplocation}{' '}
                                        </div>
                                    </div>

                                    <div className="row d-flex mb-1">
                                        <div className="col-6 d-flex justify-content-start">
                                            {t('vehiclebookings.price')}
                                        </div>
                                        <div className="driver-card-data col-6 d-flex justify-content-start">
                                            {t('vehiclebookings.rs')}{' '}
                                            {bookingData?.price}{' '}
                                            {t('vehiclebookings.km')}{' '}
                                        </div>
                                    </div>
                                    <div>
                                        {bookingData?.bookingRequest ===
                                            bookingRequests?.requested && (
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="custom-btn mx-3"
                                                    onClick={
                                                        handleApproveBooking
                                                    }
                                                >
                                                    {t(
                                                        'vehiclebookings.accept'
                                                    )}
                                                </button>

                                                <button
                                                    className="custom-btn "
                                                    onClick={
                                                        handleRejectBooking
                                                    }
                                                >
                                                    {t(
                                                        'vehiclebookings.reject'
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                        {bookingData?.bookingStatus ===
                                            bookingStatus1?.inrunning && (
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    className="custom-btn mx-3"
                                                    onClick={() =>
                                                        setCompleteModal(true)
                                                    }
                                                >
                                                    {t('booking2.complete')}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                {/* </div> */}

                <div className="col-12 main_ctn booking_card_body mt-3">
                    <div className="">
                        <div className="col d-flex">
                            <div>
                                <img
                                    className="booking_img_owner ms-3 mt-3"
                                    src={`${
                                        bookingData?.userId
                                            ? imageBaseUrl +
                                              bookingData?.userId
                                                  ?.profilePicture
                                            : ''
                                    }`}
                                    // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS93OtoBotASw6MA7T-VkfduWetrDp27Q3Ttg&usqp=CAU"
                                    alt=""
                                />
                            </div>
                            <div className="ms-3 mt-4">
                                <p className="name_field ms-1 mb-1 text-capitalize">
                                    {' '}
                                    {bookingData?.userId
                                        ? bookingData?.userId?.name
                                        : '---'}{' '}
                                </p>
                                <p className="row text-left ms-1 detail_field">
                                    {' '}
                                    {bookingData?.userId
                                        ? bookingData?.userId?.email
                                        : '---'}{' '}
                                </p>
                            </div>
                        </div>

                        <div className="">
                            <div className="row my-3 ms-3">
                                <div className="col-5 me-3">
                                    <div className="row lable_field">
                                        {t('vehiclebookings.contact')}
                                    </div>
                                    <div className="row detail_field">
                                        {bookingData?.userId
                                            ? bookingData?.userId?.mobileNumber
                                            : '---'}{' '}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="row lable_field">
                                        {' '}
                                        {t('vehiclebookings.price')}
                                    </div>
                                    <div className="row detail_field">
                                        {t('vehiclebookings.rs')}.{' '}
                                        {bookingPrice}
                                        {t('vehiclebookings.km')}{' '}
                                    </div>
                                </div>
                            </div>

                            <div className="row my-3 ms-3">
                                <div className="col-5 me-3">
                                    <div className="row lable_field">
                                        {t('vehiclebookings.pickup')}
                                    </div>
                                    <div className="row detail_field">
                                        {formateDateYYYYMMDD(
                                            bookingData?.startDate
                                        )}{' '}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="row lable_field">
                                        {t('vehiclebookings.drop')}
                                    </div>
                                    <div className="row detail_field">
                                        {formateDateYYYYMMDD(
                                            bookingData?.endDate
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="row my-3 ms-3">
                                <div className="col-5 me-3">
                                    <div className="row lable_field">
                                        {t('vehiclebookings.pickuplocation')}
                                    </div>
                                    <div className="row detail_field">
                                        {bookingData?.pickupLocation}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="row lable_field">
                                        {t('vehiclebookings.dropuplocation2')}
                                    </div>
                                    <div className="row detail_field">
                                        {bookingData?.droplocation}{' '}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex accept_reject_btn justify-content-end">
                                {bookingData?.bookingRequest ===
                                    bookingRequests?.requested && (
                                    <>
                                        <div className=" accept_reject_btn ">
                                            {' '}
                                            <button
                                                className="accept_btn bg-primary text-white"
                                                onClick={handleApproveBooking}
                                            >
                                                {t('vehiclebookings.accept')}
                                                {/* Accept */}
                                            </button>
                                        </div>
                                        <div className=" accept_reject_btn">
                                            <button
                                                className="reject_btn custom-btn-non-primary "
                                                onClick={handleRejectBooking}
                                            >
                                                {t('vehiclebookings.reject')}
                                                {/* Reject */}
                                            </button>
                                        </div>
                                    </>
                                )}
                                {bookingData?.bookingStatus ===
                                    bookingStatus1?.inrunning && (
                                    <div className="col-12 justify-content-end accept_reject_btn ">
                                        <button
                                            className="complete_btn bg-primary text-white w-100"
                                            onClick={() =>
                                                setCompleteModal(true)
                                            }
                                        >
                                            {t('booking2.complete')}
                                        </button>
                                    </div>
                                )}
                                {bookingData?.bookingRequest === 'Approve' &&
                                    bookingData?.bookingStatus ===
                                        'Pending' && (
                                        <div className="d-flex justify-content-end ">
                                            <button
                                                className="driver_action_btn custom-btn-non-primary top_btn d-flex align-items-center justify-content-center fw-semibold ms-2  mt-1 mb-1"
                                                onClick={handleRejectBooking}
                                            >
                                                {t('booking.cancelbtn')}
                                                {/* Cancel */}
                                            </button>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CompleteBookingModal
                show={completeModal}
                onHide={() => setCompleteModal(false)}
                bookingData={bookingData}
            />
            <CarLoaderModal show={showPageLoader} />{' '}
        </>
    );
};

export default VehicleBookingsCard;

{
    /* <div className=''>
<p>Name</p>
<div className='row'>
  <div className='col-5'>
    Contact
  </div>
  <div className='col-2'>
    <FaLongArrowAltRight />
  </div>
  <div className='col-5'>
 Email
  </div>

  <div className='row'>
  <div className='col-5'>
    Pickup Date
  </div>
  <div className='col-2'>
    <FaLongArrowAltRight />
  </div>

  <div className='col-5'>
 Drop Data
  </div>

  <div className='row'>
  <div className='col-5'>
    Pickup Location
  </div>
  <div className='col-2'>
    <FaLongArrowAltRight />
  </div>
  <div className='col-5'>
 Drop Location
  </div>

  <div className='row'>
  <div className='col-5'>
    
  </div>
  <div className='col-2'>
    <FaLongArrowAltRight />
  </div>

  <div className='col-5'>
 Email
  </div>
</div>
</div>
</div>
</div> */
}
