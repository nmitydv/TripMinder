import { useState } from 'react';
import ConfirmbookingModal from '../../Owner Vehicle/pages/ConfirmBookingModal';
import './style/DuserCards.css';
import { imageBaseUrl } from '../../../../../helpers/constants/idConstants';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Rate } from 'rsuite';

function DuserCards({ data }) {
    const [t] = useTranslation('global');

    const [modalShow, setModalShow] = useState(false);
    const location = useLocation();
    const { startDate, endDate } = useParams();
    const queryParams = new URLSearchParams(location.search);
    const handleBookingModal = () => {
        // Now you can access individual query parameters
        const pickupLocation = queryParams.get('pickupLocation');
        const dropLocation = queryParams.get('dropLocation');
        let errorMsg = '';
        if (!startDate) errorMsg = t('userdriver.errormessage1');
        // 'Please choose pickup date.';
        else if (!endDate) errorMsg = t('userdriver.errormessage2');
        // 'Please choose drop date.';
        else if (!pickupLocation) errorMsg = t('userdriver.errormessage3');
        // 'Please select a pickup location';
        else if (!dropLocation) errorMsg = t('userdriver.errormessage4');
        // 'Please select a drop location';
        else errorMsg = t('userdriver.errormessage5');
        // 'Please fill all necesory information!';

        // //('error msg :', errorMsg);

        if (!startDate || !endDate || !pickupLocation || !dropLocation) {
            Swal.fire({
                title: t('userdriver.errormessage6'),
                // 'Invalid data',
                text: errorMsg,
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
        } else {
            setModalShow(true);
        }
    };

    return (
        <div>
            <>
                <div className="vehicle_card Driver_user_card_image">
                    <div className="">
                        <div className="">
                            <div className="d-flex flex-row p-2 justify-content-start">
                                <img
                                    className="profile_main_img"
                                    src={`${data?.user[0] &&
                                        imageBaseUrl +
                                        data?.user[0]?.profilePicture
                                        }`}
                                />

                                <div className="mx-3">
                                    <div className="d-flex flex-column ">
                                        {/* <span>.</span> */}
                                        <span className="fw-bold">
                                            {data?.user[0]?.name
                                                ? data?.user[0]?.name
                                                : '---'}
                                        </span>
                                        <span className="fw-normal">
                                            {data?.user[0]?.email
                                                ? data?.user[0]?.email
                                                : '---'}
                                        </span>
                                        <span className="fw-normal">
                                            {data?.user[0]?.mobileNumber
                                                ? data?.user[0]?.mobileNumber
                                                : '---'}
                                        </span>
                                        <span>
                                            {data?.user[0]?.location
                                                ? data?.user[0]?.location
                                                : '---'}
                                        </span>
                                        <span>
                                            {data?.user[0]?.gender
                                                ? data?.user[0]?.gender
                                                : '---'}
                                        </span>
                                        <span>
                                            <Rate
                                                size="xs"
                                                color="yellow"
                                                defaultValue={parseInt(
                                                    data?.rating && data?.rating
                                                )}
                                                allowHalf
                                                readOnly
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="driver_line" />

                            <div className="row mt-2">
                                <div className="col-4">
                                    <div className="d-flex flex-column align-items-start">
                                        <span
                                            className="fw-normal"
                                            style={{ fontSize: '12px' }}
                                        >
                                            {t('userdriver.vehicletype')}
                                        </span>
                                        <span className="fw-bold">
                                            {data?.vehiclesType?.length > 0
                                                ? data?.vehiclesType?.map(
                                                    (item) => item + ', '
                                                )
                                                : '----'}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="d-flex flex-column align-items-start">
                                        <span
                                            className="fw-normal"
                                            style={{ fontSize: '12px' }}
                                        >
                                            {t('userdriver.experience')}
                                        </span>
                                        <span className="fw-bold">
                                            {data?.experience
                                                ? data?.experience
                                                : '----'}{' '}
                                            {t('userdriver.year')}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="d-flex flex-column align-items-start">
                                        <span
                                            className="fw-normal"
                                            style={{ fontSize: '12px' }}
                                        >
                                            {t('userdriver.rate')}
                                        </span>
                                        <span className="fw-bold">
                                            {data?.dayWisePrice
                                                ? `₹ ${data?.dayWisePrice}`
                                                : '---'}
                                        </span>
                                    </div>
                                </div>

                                <div />

                                <div className="third mt-4">
                                    <button
                                        className="profileDriver_button"
                                        type="submit"
                                        // onClick={() => setModalShow(true)}
                                        onClick={() => handleBookingModal()}
                                    >
                                        {' '}
                                        {t('userdriver.booknow')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ConfirmbookingModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    vehicleData={data}
                />
            </>
        </div>
    );
}

export default DuserCards;
