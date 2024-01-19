import { FaCarRear } from 'react-icons/fa6';
import { GiCarSeat, GiPriceTag } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { IoLogoModelS } from 'react-icons/io';
import { SlCreditCard } from 'react-icons/sl';
import { BiLike } from 'react-icons/bi';
import {
    IoCheckmarkDoneCircleSharp,
    IoCalendarNumberOutline,
} from 'react-icons/io5';
import { CgUnavailable } from 'react-icons/cg';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import date_picker from '../../../../../assets/images/date_picker.svg';
import '../styles/VehicleCard.css';
import '../styles/VehicleCard.css';
import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Badge, Rate } from 'rsuite';
import { VscStarFull } from 'react-icons/vsc';
import {
    bookingRequests,
    bookingStatus1,
    imageBaseUrl,
    vehicleStatus,
} from '../../../../../helpers/constants/idConstants';
import {
    isAdmin,
    isCustomer,
    isVehicleOwner,
} from '../../../../../Auth/userRoles';
import ConfirmbookingModal from './ConfirmBookingModal';
import { useCreteApproveVehiclesMutation } from '../../../../../redux/services/adminServices';
import Swal from 'sweetalert2';
import { formateDateYYYYMMDD } from '../../../../../helpers/Functions/dateFormaters';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { vehicleOwnerVehicleTabs } from '../../../../../helpers/constants/tabsData';
import { useTranslation } from 'react-i18next';
import {
    useActivateDeactivateVehicleMutation,
    useGetUserByIdQuery,
} from '../../../../../redux/services/commonServices';
import PageLoader, {
    CarLoaderModal,
} from '../../../../../common/Loaders/Loaders';
// import { useActivateDeactivateVehicleMutation } from '../../../../../redux/services/vehicleOwnerServices';

import { SiOpensourcehardware } from 'react-icons/si';
import { SlSpeedometer } from 'react-icons/sl';
import { BsFuelPumpFill } from 'react-icons/bs';
import { FaRupeeSign } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';

const VehicleCard = ({ data, index }) => {
    const [t] = useTranslation('global');
    // // //('Data inside Vehicle card comp', data);
    const [expanded, setExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('link-1'); // Default active tab
    const [modalShow, setModalShow] = useState(false);
    const [showPageLoader, setShowPageLoader] = useState(false);
    // const [isApprove, setisApprove] = useState();
    // const [isReject, setisReject] = useState();
    // // //('..././//.', isApprove);
    const navigate = useNavigate();
    const location = useLocation();

    const [sendApprove] = useCreteApproveVehiclesMutation();
    const [sendActivateDeactivate] = useActivateDeactivateVehicleMutation();
    const { data: ownerData } = useGetUserByIdQuery(data?.ownerId);
    const queryParams = new URLSearchParams(location.search);
    const tabValue = queryParams.get('tab');
    console.log('Approved Data', ownerData);

    const handleTabSelect = (tabKey: any) => {
        setActiveTab(tabKey);
    };

    // // //(
    //     'Current Location in vehicle Card:',
    //     vehicleOwnerVehicleTabs[1]?.value,
    //     tabValue
    // );

    const handleApproveVehicle = () => {
        Swal.fire({
            title: t('adminvehicleapprovepopupmsg.title'),
            text: t('adminvehicleapprovepopupmsg.text'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('adminvehicleapprovepopupmsg.cancle'),
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('adminvehicleapprovepopupmsg.confirm'),
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
                    const resp = await sendApprove({
                        vehicleId: data?._id,
                        isApproved: vehicleStatus?.approved,
                    });
                    // // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('adminvehicleapprovepopupmsg.approvedtitle'),
                            // text: `${resp?.data?.message}`,
                            text:t('adminvehicleapprovepopupmsg.approvedtext'),
                            confirmButtonText:t('createvehicle.okkk'),
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
                            title: t('adminvehicleapprovepopupmsg.admintitle'),
                            // 'Invalid Data',

                            text: `${resp?.error?.data?.message}`,

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
                        title: t('adminvehicleapprovepopupmsg.title2'),

                        text: t('adminvehicleapprovepopupmsg.text2'),

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

    const handleRejectVehicle = () => {
        Swal.fire({
            title: t('adminvehicleapprovepopupmsg.rejecttitle'),
            text: t('adminvehicleapprovepopupmsg.rejecttext'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('adminvehicleapprovepopupmsg.cancle'),
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('adminvehicleapprovepopupmsg.reject'),
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
                    const resp = await sendApprove({
                        vehicleId: data?._id,
                        isApproved: vehicleStatus?.rejected,
                    });
                    // // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('admindriver.reject'),
                            // text: `${resp?.data?.message}`,
                            text: t('adminvehicleapprovepopupmsg.rejecttext3'),
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
                            title: t('adminvehicleapprovepopupmsg.invaliddata'),
                            //  'Invalid Data',
                            text: `${resp?.error?.data?.message}`,

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
                        title: t('adminvehicleapprovepopupmsg.rejecttitle2'),
                        text: t('adminvehicleapprovepopupmsg.rejecttext2'),
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

    const handleDeactivateVehicle = () => {
        Swal.fire({
            title: t('vehiclecards.areyousure'),
            text: t('vehiclecards.text'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('adminvehicleapprovepopupmsg.cancle'),
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('vehiclecards.deactivate'),
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
                    const resp = await sendActivateDeactivate({
                        vehicleId: data?._id,
                        IsActive: false,
                    });
                    // // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('vehiclecards.success'),
                            text: t('vehicleactivate.deactivatetext'),
                            // `Your vehicle rejected successfully.`,
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
                            title: t('vehicleCard.invaliddata'),
                            // 'Invalid Data',
                            text: t('vehicleCard.invalidtext'),
                            // `Invalid data while for deactivate this vahicle`,
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
                        title: t('adminvehicleapprovepopupmsg.rejecttitle2'),
                        text: t('adminvehicleapprovepopupmsg.rejecttext2'),
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

    const handleActivateVehicle = () => {
        Swal.fire({
            title: t('vehicleCard.title'),
            text: t('vehicleCard.text'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('adminvehicleapprovepopupmsg.cancle'),
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('vehicleactivate.activebtn'),
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
                    const resp = await sendActivateDeactivate({
                        vehicleId: data?._id,
                        IsActive: true,
                    });
                    // // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('vehicleCard.active'),
                            text: t('vehicleCard.vehicleactivesuccessfuly'),
                            // `Your vehicle is activated successfully.`,
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
                            title: t('vehicleCard.invalid'),
                            // 'Invalid Data',
                            text: t('vehicleCard.valid'),
                            // `Invallid data for activate vehicle.`,
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
                        title: t('vehicleCard.errors'),
                        // 'Error',
                        text: t('vehicleCard.somethingwent'),
                        // 'Something went wrong. Please try again.',
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

    const handleSiftToBookings = () => {
        const params: {
            vehicleDriverId?: string;
            bookingRequest?: string;
            bookingStatus?: string;
        } = {
            vehicleDriverId: data?._id,
            bookingRequest: bookingRequests?.approved,
            bookingStatus: bookingStatus1?.inrunning,
        };
        localStorage.setItem('booking_price', data?.kmPrice.toString());

        const searchParams = new URLSearchParams(params);

        const options = {
            pathname: '/vehicle/bookings',
            search: `?${searchParams.toString()}`,
        };
        navigate(options);
    };

    const { startDate, endDate } = useParams();
    const handleBookingModal = () => {
        // Now you can access individual query parameters
        const pickupLocation = queryParams.get('pickupLocation');
        const dropLocation = queryParams.get('dropLocation');
        let errorMsg = '';
        if (!startDate) errorMsg = t('vehiclecards.startdatemsg');
        // 'Please choose pickup date.';
        else if (!endDate) errorMsg = t('vehiclecards.enddatemsg');
        // 'Please choose drop date.';
        else if (!pickupLocation)
            errorMsg = t('vehiclecards.pickuplocationmsg');
        // 'Please select a pickup location';
        else if (!dropLocation) errorMsg = t('vehiclecards.droplocationmsg');
        // 'Please select a drop location';
        else errorMsg = t('vehiclecards.errormsg');

        // 'Please fill all necesory information!';

        // //('error msg :', errorMsg);

        if (!startDate || !endDate || !pickupLocation || !dropLocation) {
            Swal.fire({
                title: t('vehiclecards.datainvalid'),
                // 'Invalid data',
                text: errorMsg,
                icon: 'error',
                confirmButtonText: t('vehiclecards.okkbutton'),
            });
        } else {
            setModalShow(true);
        }
    };

    return (
        <>
            {/* <div className="vehicle_card w-100 mt-3">
                <div className="d-flex">
                    <div className="col-3">
                        <img
                            className="card_image"
                            src={`${imageBaseUrl}${data?.vehiclePictures[0]}`}
                            alt=""
                        />
                    </div>
                    <div className="col-9 ps-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h2>{data?.vehicleName}</h2>
                                <h4>{data?.modelNumber}</h4>
                            </div>
                            <div>
                                {isVehicleOwner() && (
                                    <>
                                        {tabValue ===
                                            t(
                                                vehicleOwnerVehicleTabs[0]
                                                    ?.value
                                            ) ||
                                        tabValue ===
                                            t(
                                                vehicleOwnerVehicleTabs[2]
                                                    ?.value
                                            ) ? (
                                            <button
                                                className="vehicle_action_btn fw-semibold me-3"
                                                onClick={handleSiftToBookings}
                                            >
                                                {t('vehiclecards.bookings')}
                                            </button>
                                        ) : (
                                            ''
                                        )}
                                        {/* {data?.isApprove ===
                                            vehicleStatus?.requested && (
                                            <button className="vehicle_action_btn fw-semibold">
                                                {t('vehiclecards.edit')}
                                            </button>
                                        )} 
                                        {data?.isApprove ===
                                            vehicleStatus?.approved &&
                                            (data?.isActive === true ? (
                                                <button
                                                    className="vehicle_action_btn fw-semibold"
                                                    onClick={
                                                        handleDeactivateVehicle
                                                    }
                                                >
                                                    {t(
                                                        'vehiclecards.deactivate'
                                                    )}
                                                </button>
                                            ) : (
                                                <button
                                                    className="vehicle_action_btn fw-semibold"
                                                    onClick={
                                                        handleActivateVehicle
                                                    }
                                                >
                                                    {t('vehiclecards.activate')}
                                                </button>
                                            ))}
                                    </>
                                )}
                                {isCustomer() && (
                                    <button
                                        className="vehicle_action_btn fw-semibold"
                                        onClick={() => handleBookingModal()}
                                    >
                                        {t('vehiclecard.bookbutton')}
                                    </button>
                                )}
                                {isAdmin() &&
                                    data?.isApprove ===
                                        vehicleStatus?.requested && (
                                        <>
                                            <button
                                                onClick={handleApproveVehicle}
                                                className="vehicle_action_btn mx-3 fw-semibold"
                                            >
                                                {t('vehiclecard.Approve')}
                                            </button>
                                            <button
                                                onClick={handleRejectVehicle}
                                                className="vehicle_action_btn fw-semibold"
                                            >
                                                {t('vehiclecard.Reject')}
                                            </button>
                                        </>
                                    )}
                            </div>
                        </div>
                        <div className="d-flex align-items-center details_box">
                            <div className="col-3 text-center detail_cell">
                                <FaCarRear size={30} className="mb-2" />
                                <p>
                                    {data?.vehicleType}{' '}
                                    {t('vehiclecard.Wheeler')}
                                </p>
                            </div>
                            <div className="col-3 text-center detail_cell">
                                <GiCarSeat size={30} className="mb-2" />
                                <p>
                                    {data?.seaters} {t('vehiclecard.Persons')}
                                </p>
                            </div>
                            <div className="col-3 text-center detail_cell">
                                <GiPriceTag size={30} className="mb-2" />
                                <p>
                                    {data?.kmPrice} {t('vehiclecard.Rs.km')}
                                </p>
                            </div>
                            <div
                                className="col-3 text-center detail_cell"
                                style={{ border: 'none' }}
                            >
                                <div
                                    className={`more_link ${
                                        expanded ? 'active' : ''
                                    }`}
                                    onClick={() => setExpanded(!expanded)}
                                >
                                    <MdOutlineKeyboardDoubleArrowRight
                                        size={30}
                                        className="mb-2"
                                    />
                                    <h6>{t('vehiclecard.specification')}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {expanded && (
                    <div className="col pt-3">
                        <Nav
                            variant="tabs"
                            className="d-flex justify-content-between"
                            activeKey={activeTab}
                            onSelect={handleTabSelect}
                        >
                            <div className="d-flex">
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="link-1"
                                        className="fw-semibold nav_link"
                                    >
                                        {t('vehiclecard.allspecification')}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="link-2"
                                        className="fw-semibold nav_link"
                                    >
                                        {t('vehiclecard.imagegallery')}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="link-3"
                                        className="fw-semibold nav_link"
                                    >
                                        {t('vehiclecard.features')}
                                    </Nav.Link>
                                </Nav.Item>
                            </div>
                            <div>
                                <IoClose
                                    size={30}
                                    className="mb-2"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setExpanded(false)}
                                />
                            </div>
                        </Nav>
                        {activeTab === 'link-1' && (
                            <div
                                style={{
                                    minHeight: '237px',
                                    maxHeight: '237px',
                                }}
                            >
                                <div className="d-flex justify-content-between">
                                    <div className="col d-flex align-items-center justify-content-between more_row">
                                        <div className="col-2">
                                            <FaCarRear size={30} />
                                        </div>
                                        <div className="col-4">
                                            <h6>{t('vehiclecard.types')}</h6>
                                        </div>
                                        <div className="col-6 text-end">
                                            <h6>{data?.vehicleType}</h6>
                                        </div>
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-between more_row">
                                        <div className="col-2">
                                            <GiCarSeat size={30} />
                                        </div>
                                        <div className="col-5">
                                            <h6>
                                                {t(
                                                    'vehiclecard.passengercapacity'
                                                )}
                                            </h6>
                                        </div>
                                        <div className="col-5 text-end">
                                            <h6>{data?.seaters}</h6>
                                        </div>
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-between more_row">
                                        <div className="col-2">
                                            <GiPriceTag size={30} />
                                        </div>
                                        <div className="col-4">
                                            <h6>{t('vehiclecard.price')}</h6>
                                        </div>
                                        <div className="col-6 text-end">
                                            <h6>
                                                {' '}
                                                {data?.kmPrice}
                                                {t('vehiclecard.rs')}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="col d-flex align-items-center justify-content-between more_row">
                                        <div className="col-2">
                                            <IoLogoModelS size={30} />
                                        </div>
                                        <div className="col-4">
                                            <h6>{t('vehiclecard.modalno')}</h6>
                                        </div>
                                        <div className="col-6 text-end">
                                            <h6>{data?.modelNumber}</h6>
                                        </div>
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-between more_row">
                                        <div className="col-2">
                                            <SlCreditCard size={30} />
                                        </div>
                                        <div className="col-4">
                                            <h6>
                                                {t('vehiclecard.vehicleno')}
                                            </h6>
                                        </div>
                                        <div className="col-6 text-end">
                                            <h6>{data?.vehicleNumber}</h6>
                                        </div>
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-between more_row">
                                        <div className="col-2">
                                            <BiLike size={30} />
                                        </div>
                                        <div className="col-4">
                                            <h6>{t('vehiclecard.isactive')}</h6>
                                        </div>
                                        <div className="col-6 d-flex align-items-center justify-content-end">
                                            <Badge
                                                color={`${
                                                    data?.isActive
                                                        ? 'green'
                                                        : 'red'
                                                }`}
                                                className="large-badge me-3"
                                            />
                                            <h6>
                                                {data?.isActive === true
                                                    ? 'Yes'
                                                    : 'No'}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="col d-flex align-items-center justify-content-between more_row">
                                        <div className="col-2">
            {/* <IoLogoModelS size={30} /> 
            {/* <img
                                                src={date_picker}
                                                style={{
                                                    height: '30px',
                                                    width: '30px',
                                                }}
                                            /> 
                                            <IoCalendarNumberOutline
                                                size={30}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <h6>
                                                {t('vehiclecard.joiningdate')}
                                            </h6>
                                        </div>
                                        <div className="col-6 text-end">
                                            <h6>
                                                {formateDateYYYYMMDD(
                                                    data?.joiningDate
                                                )}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-between more_row">
                                        <div className="col-2">
                                            <IoCheckmarkDoneCircleSharp
                                                size={30}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <h6>{t('vehiclecard.status')}</h6>
                                        </div>
                                        <div className="col-6 d-flex align-items-center justify-content-end">
                                            <Badge
                                                color={`${
                                                    data?.isApprove ===
                                                    vehicleStatus?.requested
                                                        ? 'yellow'
                                                        : data?.isApprove ===
                                                          vehicleStatus?.rejected
                                                        ? 'red'
                                                        : data?.isApprove ===
                                                          vehicleStatus?.approved
                                                        ? 'green'
                                                        : ''
                                                }`}
                                                className="large-badge me-3"
                                            />
                                            <h6>
                                                {data?.isApprove ===
                                                vehicleStatus?.requested
                                                    ? 'Pending'
                                                    : data?.isApprove ===
                                                      vehicleStatus?.rejected
                                                    ? 'Rejected'
                                                    : data?.isApprove ===
                                                      vehicleStatus?.approved
                                                    ? 'Approved'
                                                    : ''}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-between more_row">
                                        <div className="col-2">
                                            <CgUnavailable size={30} />
                                        </div>
                                        <div className="col-4">
                                            <h6>
                                                {t('vehiclecard.available')}
                                            </h6>
                                        </div>
                                        <div className="col-6 d-flex align-items-center justify-content-end">
                                            <Badge
                                                color={`${
                                                    data?.availability
                                                        ? 'green'
                                                        : 'red'
                                                }`}
                                                className="large-badge me-3"
                                            />
                                            <h6>
                                                {data?.availability === true
                                                    ? 'Yes'
                                                    : 'No'}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'link-2' && (
                            <div
                                className="row overflow-auto car_scroll mt-2"
                                id="inner_card"
                                style={{
                                    minHeight: '237px',
                                    maxHeight: '237px',
                                    maxWidth: '100%',
                                }}
                            >
                                <div className="row d-flex justify-content-start">
                                    <div className="col-4 mt-2 mb-3">
                                        <div className="d-flex justify-content-center align-items-center gallery_col">
                                            <img
                                                src={`${imageBaseUrl}${data?.numberPlatePic}`}
                                                alt=""
                                                height={'90%'}
                                                width={'90%'}
                                            />
                                        </div>
                                    </div>
                                    {data &&
                                        data?.vehiclePictures &&
                                        data?.vehiclePictures.length > 0 &&
                                        data?.vehiclePictures?.map((url) => (
                                            <div className="col-4 mt-2 mb-3">
                                                <div className="d-flex justify-content-center align-items-center gallery_col">
                                                    <img
                                                        src={`${imageBaseUrl}${url}`}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                        {activeTab === 'link-3' && (
                            <div
                                className="row overflow-auto car_scroll"
                                id="inner_card"
                                style={{
                                    minHeight: '237px',
                                    maxHeight: '237px',
                                    maxWidth: '100%',
                                }}
                            >
                                <div className="feature_main_div row d-flex">
                                    {data &&
                                        data?.features &&
                                        data?.features.length > 0 &&
                                        data?.features?.map((feature) => (
                                            <div>
                                                <div className="feature_div d-flex align-items-center">
                                                    <div>
                                                        {' '}
                                                        <p>
                                                            <VscStarFull />
                                                        </p>
                                                    </div>
                                                    <div>
                                                        {' '}
                                                        <p className="mx-3 ">
                                                            {feature}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <ConfirmbookingModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                vehicleData={data}
            /> */}
            <div className="vehicle_card col-12">
                <div className="card-body ">
                    <div className="row">
                        <div
                            id={`imageid_${index}slider`}
                            className="carousel slide"
                            data-bs-ride="carousel"
                        >
                            {/* <div className="carousel-inner">
                                <div className="carousel-item active">
                                    
                                    <img
                                       src={`${imageBaseUrl}${data?.vehiclePictures[0]}`}
                                        className="d-block w-100"
                                        alt="..."
                                    />
                                </div>
                                {/* <div className="carousel-item">
                                    <img
                                    
                                        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9lnaHnIsJ5QUoVgwts4eSJibGWYc309Nugw&usqp=CAU"
                                        className="d-block w-100"
                                        alt="..."
                                    />
                                </div> 
                                <div className="carousel-item">
                                    <img
                                     src={`${imageBaseUrl}${data?.numberPlatePic}`}
                                        // src="https://bsmedia.business-standard.com/_media/bs/img/article/2023-04/11/full/1681202601-0323.jpg?im=FeatureCrop,size=(826,465)"
                                        className="d-block w-100"
                                        alt="..."
                                    />
                                </div>
                            </div> */}
                            <div className="carousel-inner">
                                <div className="carousel-item">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img
                                            src={`${imageBaseUrl}${data?.numberPlatePic}`}
                                            // src="https://bsmedia.business-standard.com/_media/bs/img/article/2023-04/11/full/1681202601-0323.jpg?im=FeatureCrop,size=(826,465)"
                                            className=""
                                            alt="..."
                                            style={{
                                                height: '220px',
                                                borderRadius: '10px',
                                                width: 'auto',
                                            }}
                                        />
                                    </div>
                                </div>
                                {data?.vehiclePictures.map(
                                    (image, imageIndex) => (
                                        <div
                                            key={imageIndex}
                                            className={`carousel-item ${
                                                imageIndex === 0 ? 'active' : ''
                                            }`}
                                        >
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img
                                                    src={`${imageBaseUrl}${image}`}
                                                    className=""
                                                    alt={`Image ${imageIndex}`}
                                                    style={{
                                                        height: '220px',
                                                        borderRadius: '10px',
                                                        width: 'auto',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target={`#imageid_${index}slider`}
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon "
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">
                                    Previous
                                </span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target={`#imageid_${index}slider`}
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div>
                            <h4 className="vehicle_name">
                                {data?.vehicleName}
                            </h4>
                            <p className="sub_text">{data?.vehicleNumber}</p>
                            {/* <p className="sub_text mt-0">{data?.rating ? data.rating + "/5 ⭐" : '0/5 ⭐'}</p> */}
                            <p className="sub_text mt-0">
                                <Rate
                                    size="xs"
                                    color="yellow"
                                    defaultValue={parseInt(
                                        data?.rating && data?.rating
                                    )}
                                    allowHalf
                                    readOnly
                                />
                            </p>
                        </div>
                        {location.pathname !== '/vehicle/vehicles' && (
                            <div className="">
                                <h5 className="owner_name fw-semibold">
                                    {ownerData?.data?.name}
                                </h5>
                                <p className="sub_text">
                                    {ownerData?.data?.email}
                                </p>
                                <p className="sub_text mt-0">
                                    {ownerData?.data?.mobileNumber}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="horizantal_line"></div>
                    {/* <div className="d-flex mt-2">
                        <div className="col">
                            <p className="d-flex vehicle_details">
                                <div className="">
                                  
                                    Modal number
                                </div>
                                <div className="ms-3"> {data?.modelNumber}</div>
                            </p>
                            <p className="d-flex vehicle_details">
                                <div className=''>
                                  
                                    Vehicle type
                                </div>
                                <div className="ms-3"> {data?.vehicleType}</div>
                            </p>
                        </div>
                       
                        <div className="col ">
                            <p className=" d-flex vehicle_details">
                                <div className=''>
                                   
                                    Price
                                </div>
                                <div className="ms-2">
                                    {data?.kmPrice} {t('vehiclecard.Rs.km')}
                                </div>
                            </p>
                            <p className="d-flex vehicle_details">
                               
                                <div className=''>
                                    Seater
                                </div>
                                <div className="ms-2">
                                    {data?.seaters} {t('vehiclecard.Persons')}
                                </div>
                            </p>
                        </div>
                    </div> */}

                    <div className="">
                        <div className="row mt-2 mb-1">
                            <div
                                className="col d-flex"
                                style={{ borderRight: '2px dashed #5A607F' }}
                            >
                                <div className="col-8 vehicle_labels fw-semibold">
                                    {t('vehiclecard.modalno')}
                                </div>
                                <div className="col-4 vehicle_details d-flex justify-content-center">
                                    {data?.modelNumber}
                                </div>
                            </div>
                            <div className="col d-flex">
                                <div className="col-6 vehicle_labels fw-semibold">
                                    {t('vehiclecard.price')}
                                </div>
                                <div className="col-6 vehicle_details d-flex justify-content-center">
                                    {data?.kmPrice} {''}
                                    {t('vehiclecard.rs')}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className="col d-flex"
                                style={{ borderRight: '2px dashed #5A607F' }}
                            >
                                <div className="col-8 vehicle_labels fw-semibold">
                                    {t('vehiclecard.types')}
                                </div>
                                <div className="col-4 vehicle_details d-flex justify-content-center">
                                    {data?.vehicleType}
                                </div>
                            </div>
                            <div className="col d-flex">
                                <div className="col-6 vehicle_labels fw-semibold">
                                    {t('vehiclecard.passengercapacity')}
                                </div>
                                <div className="col-6 vehicle_details d-flex justify-content-center">
                                    {data?.seaters} {t('vehiclecard.Persons')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="horizantal_line"></div> */}
                    {/* <div className="mt-4">
                        <div
                            id={`textid_${index}slider`}
                            className="carousel carousel_custom slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner carousel-inner_custom">
                                <div className="carousel-item active">
                                    <div className="carousel-caption carousel-caption_custom">
                                        <h3 className='text-danger'>Boyd W.</h3>
                                        <p>TEXT</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                <div className="carousel-caption carousel-caption_custom">
                                        <h3 className='text-danger'>Diane L</h3>
                                        <p>TEXT</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                <div className="carousel-caption carousel-caption_custom">
                                        <h3 className='text-danger'>Randall L</h3>
                                        <p>TEXT</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                <div className="carousel-caption carousel-caption_custom">
                                        <h3 className='text-danger'>John D.</h3>
                                        <p>TEXT</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                <div className="carousel-caption carousel-caption_custom">
                                        <h3 className='text-danger'>Jody B.</h3>
                                        <p>TEXT</p>
                                    </div>
                                </div>
                            </div>
                            <a
                                className="carousel-control-prev"
                                // href="#carouselExampleControls"
                                href={`#textid_${index}slider`}
                                role="button"
                                data-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="sr-only visually-hidden">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                // href="#carouselExampleControls"
                                href={`#textid_${index}slider`}
                                role="button"
                                data-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="sr-only visually-hidden">Next</span>
                            </a>
                        </div>
                    </div> */}

                    {/* <div className="row">
                        <div
                            id={`textid_${index}slider`}
                            className="carousel carousel_custom slide"
                            data-bs-ride="carousel"
                        >
                            <div className="carousel-inner carousel-inner_custom">
                                <div className="carousel-item active">
                                    <div className="carousel-caption">
                                        <h2 className="text-danger">
                                            Feature 1
                                        </h2>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="carousel-caption carousel-caption_custom">
                                        <h2 className="text-danger">
                                            Feature 1
                                        </h2>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="carousel-caption">
                                        <h2 className="text-danger">
                                            Feature 1
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target={`textid_${index}slider`}
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon btn_prev_custom"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">
                                    Previous
                                </span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target={`textid_${index}slider`}
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon btn_next_custom"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div> */}

                    <div className="d-flex justify-content-between mt-2">
                        {/* <button className="btn bg-primary text-white w-100 mt-3">
                            Book
                        </button> */}
                        {isVehicleOwner() && (
                            <>
                                {tabValue ===
                                    t(vehicleOwnerVehicleTabs[0]?.value) ||
                                tabValue ===
                                    t(vehicleOwnerVehicleTabs[2]?.value) ? (
                                    <button
                                        className={`vehicle_action_btn ${
                                            vehicleOwnerVehicleTabs[2].value ===
                                            tabValue
                                                ? 'custom-btn-non-primary '
                                                : ''
                                        }   fw-semibold w-100 me-3 d-flex align-items-center ${
                                            data?.requestedBookingCount &&
                                            data?.requestedBookingCount !== 0
                                                ? 'justify-content-between'
                                                : 'justify-content-center'
                                        } bookingbtn_custom`}
                                        onClick={handleSiftToBookings}
                                    >
                                        {t('vehiclecards.bookings')}{' '}
                                        {/* <div className="booking_count d-flex justify-content-center align-items-center pt-1">
                                            {data?.requestedBookingCount &&
                                            data?.requestedBookingCount > 0
                                                ? data?.requestedBookingCount
                                                : ''}
                                        </div> */}
                                        {data?.requestedBookingCount &&
                                        data?.requestedBookingCount !== 0 ? (
                                            <div className="booking_count d-flex justify-content-center align-items-center pt-1">
                                                {data?.requestedBookingCount}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </button>
                                ) : (
                                    ''
                                )}
                                {/* {data?.isApprove ===
                                    vehicleStatus?.requested && (
                                    <button className="vehicle_action_btn fw-semibold">
                                        {t('vehiclecards.edit')}
                                    </button>
                                )} */}
                                {data?.isApprove === vehicleStatus?.approved &&
                                    (data?.isActive === true ? (
                                        <button
                                            className="vehicle_action_btn custom-btn-non-primary w-100 fw-semibold"
                                            onClick={handleDeactivateVehicle}
                                        >
                                            {t('vehiclecards.deactivate')}
                                        </button>
                                    ) : (
                                        <button
                                            className="vehicle_action_btn w-100 fw-semibold"
                                            onClick={handleActivateVehicle}
                                        >
                                            {t('vehiclecards.activate')}
                                        </button>
                                    ))}
                            </>
                        )}
                        {isCustomer() && (
                            <button
                                className="vehicle_action_btn w-100 fw-semibold"
                                onClick={() => handleBookingModal()}
                            >
                                {t('vehiclecard.bookbutton')}
                            </button>
                        )}
                        {isAdmin() &&
                            data?.isApprove === vehicleStatus?.requested && (
                                <>
                                    <button
                                        onClick={handleApproveVehicle}
                                        className="vehicle_action_btn w-100 me-3 mt-1 fw-semibold"
                                    >
                                        {t('vehiclecard.Approve')}
                                    </button>
                                    <button
                                        onClick={handleRejectVehicle}
                                        className="vehicle_action_btn custom-btn-non-primary w-100 mt-1 fw-semibold"
                                    >
                                        {t('vehiclecard.Reject')}
                                    </button>
                                </>
                            )}
                    </div>
                </div>
            </div>
            <ConfirmbookingModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                vehicleData={data}
            />
            <CarLoaderModal show={showPageLoader} />{' '}
        </>
    );
};

export default VehicleCard;
