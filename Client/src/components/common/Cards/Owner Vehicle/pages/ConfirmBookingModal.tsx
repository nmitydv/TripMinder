import Modal from 'react-bootstrap/Modal';
// import { useCreateBookingByUserIdMutation } from '../../../../../redux/services/userServices';
import { useLocation, useParams } from 'react-router-dom';
import CardHeader from '../../../../../common/Card Header/CardHeader';
// import { IoCaretBackOutline, IoCaretForward } from 'react-icons/io5';
// import { FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/ConfirmBookingModal.css';
// import { useEffect } from 'react';
import Swal from 'sweetalert2';
// import date_icon from '../../../../../assets/images/date_picker.svg';
import {
    // formatDateWithDayMonth,
    formateDateYYYYMMDD,
} from '../../../../../helpers/Functions/dateFormaters';
import { useTranslation } from 'react-i18next';
// import { BiCalendar } from 'react-icons/bi';
import { imageBaseUrl } from '../../../../../helpers/constants/idConstants';
import { FaRupeeSign } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import { useCreateBookingByUserIdMutation } from '../../../../../redux/services/commonServices';
import PageLoader, { CarLoaderModal } from '../../../../../common/Loaders/Loaders';
import { useState } from 'react';

function ConfirmbookingModal(props) {
    const [t] = useTranslation('global');
    const [createBookSend, responce] = useCreateBookingByUserIdMutation();
    const userId = localStorage.getItem('userId');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [showPageLoader, setShowPageLoader] = useState(false);

    // Now you can access individual query parameters
    const { startDate, endDate } = useParams();
    const pickupLocation = queryParams.get('pickupLocation');
    const dropLocation = queryParams.get('dropLocation');
    // const startDate = queryParams.get('startDate');
    // const endDate = queryParams.get('endDate');
    //
    // // //('props.vehicleData', props.vehicleData);
    // // //('responce for booking', responce?.data?.statusCode);
    const bookingData = {
        userId: userId,
        vehicleDriverId: props?.vehicleData?._id,
        pickupLocation: pickupLocation,
        dropLocation: dropLocation,
        startDate: startDate,
        endDate: endDate,
        price: 0,
    };

    const handleBookingRequest = async () => {
        // await createBookSend(bookingData);
        try {
            setShowPageLoader(true);
            const resp = await createBookSend(bookingData);
            // //('$$$$$$$$$resp', resp?.data);
            if (resp?.data?.statusCode === 201) {
                setShowPageLoader(false);
                Swal.fire({
                    title: t('confirmbookingmodel.title'),
                    // title: 'Success',
                    text: t('confirmbookingmodel.text'),
                    confirmButtonText : t('confirmbookingmodel.okbtn'),
                    // text: 'Booking created succefully',
                    // icon: t('confirmbookingmodel.icon')
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

                props?.onHide();
            }
            if (resp?.error?.data?.statusCode === 400) {
                setShowPageLoader(false);
                Swal.fire({
                    // title: 'Invalid Data',
                     title: t('confirmbookingmodel.invalidtitle'),
                    // text: `Invalid data for create booking`,
                     text : t('confirmbookingmodel.invalidtext'),
                     
                     icon: 'error',
                });
            }
        } catch (error) {
            setShowPageLoader(false);
            Swal.fire({
                // title: 'Error',
                title: t('confirmbookingmodel.error'),
                text: t('confirmbookingmodel.errortext'),
                // text: 'Error creating booking, please try again later',
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
    };

    // useEffect(() => {
    //     if (responce?.data?.statusCode === 201) {
    //         props?.onHide();
    //         Swal.fire({
    //             title: 'Success',
    //             text: 'Your Booking is successful !',
    //             icon: 'success',
    //         });
    //     }
    // }, [responce]);

    let imgUrl = '';
    if (props?.vehicleData?.vehiclePictures?.length > 0) {
        imgUrl = `${imageBaseUrl}${props?.vehicleData?.vehiclePictures[0]}`;
    } else if (props?.vehicleData?.user && props?.vehicleData?.user[0]) {
        imgUrl = `${imageBaseUrl}${props?.vehicleData?.user[0]?.profilePicture}`;
        // // //('???...???...???', props?.vehicleData?.user[0]?.profilePicture)
        // // //('.././././././/././././');
    }

    // // //('imgUrl', imgUrl);

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                contentClassName="modal_class"
            >
                <Modal.Body>
                    <CardHeader
                        onClose={() => props?.onHide()}
                        title={t('booking.confirmheading')}
                    />

                    {/* <div className="d-flex align-items-center mt-4">
                    <div className="col-6">
                        <img
                            src={imgUrl}
                            // src="https://hips.hearstapps.com/hmg-prod/images/2024-lamborghini-revuelto-127-641a1d518802b.jpg?crop=0.813xw:0.721xh;0.0994xw,0.128xh&resize=1200:*"
                            className="card_img_cnf mb-3"
                            alt=""
                        /> */}
                    {/* </div>
                    <div className="col-4 ms-5 d-flex justify-content-center ">
                        <div className="price_box text-center">
                            <p className=" price_tag mt-5">PRICE</p>
                            <p className="mt-1">
                                {props?.vehicleData?.kmPrice} <FaRupeeSign />/
                                km
                            </p>
                        </div>
                    </div>
                </div> */}

                    {/* <hr className="horizantal_line mb-3" />
                <div className="d-flex lock_card_label my-1">
                    <div className="col">
                        <p className="upper_heading ms-2">
                            {' '}
                            {t('booking.pickup')}
                        </p>
                    </div>
                    <div className="col">
                        <p className="upper_heading ms-2">
                            {' '}
                            {t('booking.drop')}
                        </p>
                    </div>
                </div>

                <div className="d-flex">
                    <div className="col-6 popup_heading ">
                        <div className="row  mb-3 mx-2  p-2 location_field">
                            {pickupLocation}
                        </div>
                        <div className="lock_card_label ">
                            <p className="upper_heading ms-2">
                                {' '}
                                {t('booking.pickup')}
                            </p>
                        </div>
                        <div className="row mx-2 p-2 date_field">
                            {formateDateYYYYMMDD(startDate ? startDate : '')}
                        </div>
                    </div>
                    <div className="col-6  popup_heading ">
                        <div className="row mx-2 mb-3 p-2 location_field">
                            {dropLocation}
                        </div>
                        <div className="lock_card_label ">
                            {' '}
                            <p className="upper_heading ms-2">
                                {' '}
                                {t('booking.drop')}
                            </p>
                        </div>
                        <div className="row mx-2 p-2 date_field">
                            {formateDateYYYYMMDD(endDate ? endDate : '')}
                        </div>
                    </div>

                  </div> */}

                    <div className="d-flex p-3">
                        <div className="col-6 me-1">
                            <img
                                className="card_img_cnf "
                                src={imgUrl}
                                // src="https://i0.wp.com/www.99percentlifestyle.com/wp-content/uploads/2022/05/kenny-eliason-yDekvyZ52dU-unsplash-scaled.jpg?fit=2560%2C1549&ssl=1"
                                alt=""
                            />
                        </div>
                        <div className="col-6 mx-4 pe-3">
                            <div className="row mb-3">
                                <p className=" car_name_field ms-1">
                                    {/* {props?.vehicleData?.user[0]
                                    ? props?.vehicleData?.user[0]?.name
                                    : props?.vehicleData?.vehicleName} */}
                                    {/* {props?.vehicleData?.vehicleName} */}
                                    {/* {props?.vehicleData?.user
                                    ? props?.vehicleData?.user[0]
                                        ? props?.vehicleData?.user[0]?.name
                                        : props?.vehicleData?.vehicleName
                                    : 'helllo'} */}
                                    {props?.vehicleData &&
                                    props?.vehicleData?.user
                                        ? props?.vehicleData?.user[0]?.name
                                        : props?.vehicleData?.vehicleName}
                                </p>
                                <p className="ms-1">
                                    {/* {props?.vehicleData?.user[0]
                                    ? props?.vehicleData?.user[0]?.mobileNumber
                                    : props?.vehicleData?.modelNumber} */}
                                    {/* {props?.vehicleData?.user
                                    ? props?.vehicleData?.user[0]
                                        ? props?.vehicleData?.user[0]
                                              ?.mobileNumber
                                        : props?.vehicleData?.modelNumber
                                    : 'jiiii'} */}
                                    {props?.vehicleData &&
                                    props?.vehicleData?.user
                                        ? props?.vehicleData?.user[0]
                                              ?.mobileNumber
                                        : props?.vehicleData?.modelNumber}
                                </p>
                            </div>

                            <div className="row mx-1 mb-3 p-2 location_field">
                                {pickupLocation}
                            </div>
                            <div className="row mx-1 mb-3 p-2 location_field">
                                {dropLocation}
                            </div>

                            <div className="row">
                                <div className="col d-flex mx-3 p-2 date_field">
                                    <div className="col-1 date_field_icon ">
                                        {' '}
                                        <FaCalendarDays />
                                    </div>
                                    <div className="col ms-3">
                                        {formateDateYYYYMMDD(
                                            startDate ? startDate : ''
                                        )}
                                    </div>
                                </div>
                                <div className="col d-flex mx-3 p-2 date_field">
                                    <div className="col-1 date_field_icon ">
                                        {' '}
                                        <FaCalendarDays />
                                    </div>
                                    <div className="col ms-3">
                                        {formateDateYYYYMMDD(
                                            endDate ? endDate : ''
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className=" price_tag mt-3 ms-2">
                                    {/* {props?.vehicleData?.kmPrice} <FaRupeeSign />/
                                km */}
                                    {props?.vehicleData &&
                                    props?.vehicleData?.user
                                        ? t('rs.rs') +
                                          props?.vehicleData?.dayWisePrice +
                                          t('rs.day') 
                                        : t('rs.rs')  +
                                          props?.vehicleData?.kmPrice +
                                          t('rs.km') }
                                </p>
                            </div>

                            <div className="d-flex align-items-center mt-3">
                                <button
                                    type="button"
                                    className="cancel_btn fw-bold"
                                    onClick={props?.onHide}
                                >
                                    {t('booking.cancle')}
                                </button>
                                <button
                                    className="send_btn fw-bold"
                                    onClick={handleBookingRequest}
                                >
                                    {responce?.isLoading ? (
                                        <div
                                            className="spinner-border spinner_custom"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                {t('booking.cancle')}
                                            </span>
                                        </div>
                                    ) : (
                                        t('booking.sendrequest')
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <PageLoader show={showPageLoader} />{' '}
        </>
    );
}

export default ConfirmbookingModal;
