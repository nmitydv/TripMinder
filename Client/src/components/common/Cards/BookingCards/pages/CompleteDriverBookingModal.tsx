import Modal from 'react-bootstrap/Modal';
// import { useCreateBookingByUserIdMutation } from '../../../../../redux/services/userServices';
import CardHeader from '../../../../../common/Card Header/CardHeader';
// import '../styles/ConfirmBookingModal.css';

import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import {
    bookingRequests,
    bookingStatus1,
} from '../../../../../helpers/constants/idConstants';
import { useApproveBookingRequestByBookingIdMutation } from '../../../../../redux/services/commonServices';
import PageLoader, {
    CarLoaderModal,
} from '../../../../../common/Loaders/Loaders';
// import {
//     useApproveBookingRequestByBookingIdMutation,
//     // useGetDriverByDriverIdQuery,
// } from '../../../../../redux/services/driverServices';

function CompleteDriverBookingModal(props) {
    const [t] = useTranslation('global');
    const bookingPrice = parseFloat(localStorage.getItem('booking_price'));

    console.log('Driver Data', props.driverdata?.data?.dayWisePrice);

    const [sendApproveBooking, responce] =
        useApproveBookingRequestByBookingIdMutation();
    const [totalKm, setTotalKm] = useState(0);
    const [totalAmount, setTotalAmount] = useState(
        totalKm * props.driverdata?.data?.dayWisePrice
    );
    const [showPageLoader, setShowPageLoader] = useState(false);

    const initialData = {
        totalDays: 0,
        totalAmount: 0,
    };

    useEffect(() => {
        setTotalAmount(totalKm * props.driverdata?.data?.dayWisePrice);
    }, [totalKm, props.driverdata?.data?.dayWisePrice]);

    const handleBookingRequest = async () => {
        // await createBookSend(bookingData);
        Swal.fire({
            title: t('booking.titlesure'),
            // 'Are you sure?',
            text: t('booking.textwant'),
            // 'You want to complete this booking.',
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('booking2.cancel'),
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            // confirmButtonText: 'Yes Complete It',
            confirmButtonText: t('booking.completebtn'),
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
                        ...props?.bookingData,
                        price: totalAmount,
                        totalKmDays: totalKm,
                        bookingStatus: bookingStatus1?.completed,
                        bookingRequest: bookingRequests?.approved,
                    });
                    // console.log('Booking Complete Resp :', resp?.data);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('booking2.successtitle'),
                            // 'Success',
                            text: t('booking2.successtext'),
                            confirmButtonText: t('booking2.okaybtn'),
                            // `Booking completed successfully`,
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
                            title: t('booking2.invliddatatitle'),
                            // 'Invalid data',
                            text: t('booking2.invliddatatext'),
                            // `Please enter a valid data.`,
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
                        title: t('booking2.invliddataerror'),
                        // 'Error',
                        text: t('booking2.invliddatatext'),
                        // 'Error to completed booking',
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
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                // contentClassName="modal_class"
            >
                <Modal.Body>
                    <CardHeader
                        onClose={() => props?.onHide()}
                        title={t('booking.completebooking')}
                    />

                    <Formik
                        initialValues={initialData}
                        onSubmit={handleBookingRequest}
                    >
                        <Form>
                            <div className="col d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                <Field
                                    type="number"
                                    className="form-control input__field"
                                    placeholder=" "
                                    id="totalDays"
                                    value={totalKm}
                                    name="totalDays"
                                    onChange={(event) =>
                                        setTotalKm(event.target.value)
                                    }
                                />
                                <label htmlFor="totalKm" className="lable__box">
                                    {/* {t('booking2.totalKm')} */}
                                    {t('booking2.totaldays')}
                                </label>
                                <div className="err_div mb-3 mt-0">
                                    <p className="text-danger stu_sign_err pt-1">
                                        <ErrorMessage name="totalDays" />
                                    </p>
                                </div>
                            </div>

                            <div className="col d-flex flex-column justify-content-lg-start justify-content-center mt-4 position-relative">
                                <Field
                                    type="number"
                                    className="form-control input__field"
                                    placeholder=" "
                                    id="totalAmount"
                                    value={totalAmount}
                                    name="totalAmount"
                                    onChange={(event) =>
                                        setTotalAmount(event.target.value)
                                    }
                                />
                                <label
                                    htmlFor="totalAmount"
                                    className="lable__box"
                                >
                                    {t('booking2.totalamount')}
                                </label>
                                <div className="err_div mb-3 mt-0">
                                    <p className="text-danger stu_sign_err pt-1">
                                        <ErrorMessage name="totalAmount" />
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end align-items-center mt-4">
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
                                                {t('booking.sendrequest')}
                                            </span>
                                        </div>
                                    ) : (
                                        t('booking.sendrequest')
                                    )}
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
            <PageLoader show={showPageLoader} />{' '}
        </>
    );
}

export default CompleteDriverBookingModal;
