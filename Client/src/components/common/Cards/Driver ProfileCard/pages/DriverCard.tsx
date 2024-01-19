import { useEffect, useState } from 'react';
import '../styles/DriverCard.css';
import { IoImage } from 'react-icons/io5';
import {
    bookingRequests,
    imageBaseUrl,
    vehicleStatus,
} from '../../../../../helpers/constants/idConstants';
import Swal from 'sweetalert2';
import {
    useBlockUnblockUserMutation,
    useCreteApproveDriverMutation,
    useCreteApproveVehiclesMutation,
} from '../../../../../redux/services/adminServices';
import { Button, Modal } from 'react-bootstrap';
import CardHeader from '../../../../../common/Card Header/CardHeader';
import { useTranslation } from 'react-i18next';
import { CarLoaderModal } from '../../../../../common/Loaders/Loaders';

const LicenceModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <CardHeader
                    onClose={() => props?.onHide()}
                    title={`${props?.imgData?.name?.replace(/\b\w/g, (match) =>
                        match.toUpperCase()
                    )} (Lincence)`}
                />
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <img
                        src={props?.imgData?.image}
                        alt=""
                        height={'100%'}
                        width={'100%'}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
};

const DriverCard = ({ data }) => {
    const [t] = useTranslation('global');
    const [licenceModal, setLicenceModal] = useState(false);
    // const [isApprove, setisApprove] = useState();
    const [sendApprove] = useCreteApproveDriverMutation();
    const [sendBlockUnblock] = useBlockUnblockUserMutation();
    const [showPageLoader, setShowPageLoader] = useState(false);
    // console.log('.....////...///.', data);

    const handleBlockUser = () => {
        Swal.fire({
            title: t('admindrivercards.title1'),
            // 'Are you sure',
            text: t('admindrivercards.text1'),
            // 'You want to block this driver',
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('admindrivercards.cancelbutton'),
            // 'Cancel',
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('admindrivercards.yesadminbutton'),
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
            // 'Yes',
        }).then(async (result) => {
            if (result.isConfirmed) {
                setShowPageLoader(true);
                try {
                    const resp = await sendBlockUnblock({
                        userId: data?.userId?._id,
                        isActive: false,
                    });
                    // // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('admindrivercards.title2'),
                            //  'Success',
                            text: t('admindrivercards.text2'),
                            // 'Driver was successfully blocked.',
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
                        console.log(error?.data);
                        Swal.fire({
                            title: t('admindrivercards.title3'),
                            // 'Invalid data',
                            text: t('admindrivercards.text3'),
                            // 'Invalid data, please try again later.',
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
                        title: t('admindrivercards.title4'),
                        // 'Error',
                        text: t('admindrivercards.text4'),
                        // 'Error occured while block this driver',
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

    const handleUnblockUser = () => {
        Swal.fire({
            title: t('admindrivercards.title5'),
            // 'Are you sure?',
            text: t('admindrivercards.text5'),
            // 'You want to unblock this driver.',
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('admindrivercards.cancelbutton'),
            // 'Cancel',
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('admindrivercards.yesbutton'),
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
            // 'Yes',
        }).then(async (result) => {
            if (result.isConfirmed) {
                setShowPageLoader(true);
                try {
                    const resp = await sendBlockUnblock({
                        userId: data?.userId?._id,
                        isActive: true,
                    });
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('admindrivercards.title6'),
                            // 'Success',
                            text: t('admindrivercards.text6'),
                            // `Driver successfully unblocked`,
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
                            title: t('admindrivercards.title7'),
                            // 'Invalid Data',
                            text: t('admindrivercards.text7'),
                            // `Invalid data, please try again later.`,
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
                        title: t('admindrivercards.title8'),
                        // 'Error',
                        text: t('admindrivercards.text8'),
                        // 'ITS AN ERROR TO UNBLOCK THIS USER',
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

    const handleApproveDriver = () => {
        // // setisApprove(true);
        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: 'Do You Want To Approve this Driver ?',
        //     icon: 'warning',
        //     iconColor: '#ED6C02',
        //     showCancelButton: true,
        //     cancelButtonText: 'Cancel',
        //     cancelButtonColor: '#D5D7E3',
        //     confirmButtonColor: '#3085d6',
        //     confirmButtonText: 'Yes, Approve  it!',
        // }).then(async (result) => {
        //     if (result.isConfirmed) {
        //         await sendApprove({
        //             driverId: data?._id,
        //             isApproved: vehicleStatus?.approved,
        //         });
        //         // Swal.fire({
        //         //     title: 'Approved',
        //         //     text: 'This Driver has been Approved',
        //         //     icon: 'success',
        //         // });
        //         // setisApprove(null);
        //     }
        // });

        Swal.fire({
            title: t('admindriverapprovepopupmsg.title'),
            text: t('admindriverapprovepopupmsg.text'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('admindriverapprovepopupmsg.cancle'),
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#1e81f6',
            confirmButtonText: t('admindriverapprovepopupmsg.confirm'),
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
                        driverId: data?._id,
                        isApproved: vehicleStatus?.approved,
                    });
                    // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('admindriver.approve'),
                            text: t('admindriver.driversuccess'),
                            confirmButtonText: t('admindriver.okkk'),
                            // `Driver successfully approved`,

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
                            title: t('admindriver.titleinvaliddata'),
                            // 'Invalid Data',
                            text: t('admindriver.textinvaliddata'),
                            // `Invalid data`,
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
                        title: t('admindriver.errortitle'),
                        // 'Error',
                        text: t('admindriver.errortext'),
                        // 'Error while approving driver. Please try again later.',
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

    const handleRejectDriver = () => {
        Swal.fire({
            title: t('admindriver.rejectdrivertitle'),
            // 'Are you sure?',
            text: t('admindriver.rejectdrivertext'),
            // 'You want to reject this driver',
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            confirmButtonColor: '#1e81f6',
            cancelButtonColor: '#D5D7E3',
            cancelButtonText: t('admindriver.cancelbtn'),
            confirmButtonText: t('admindriverrejectpopupmsg.confirmbutton'),
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
                        driverId: data?._id,
                        isApproved: vehicleStatus?.rejected,
                    });
                    // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('admindriverrejectpopupmsg.approvedtitle'),
                            // 'Rejected',
                            text: t('admindriver.rejecttext'),
                            // `Driver rejected successfully.`,
                            confirmButtonText: t('admindriver.okkk'),
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
                            title: t('admindriver.errordatatitle'),
                            // 'Invalid Data',
                            text: t('admindriver.errordatatext'),
                            // 'Invalid data.',
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
                        title: t('admindriver.errtitle'),
                        // 'Error',
                        text: t('admindriver.errtext'),
                        // 'Something went wrong, please try again later.',
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
    // useEffect(() => {
    //     if (responce) {
    //         if (responce?.data?.statusCode === 200) {
    //             Swal.fire({
    //                 title: 'Rejected',
    //                 text: 'This Vehicle has been Rejected',
    //                 icon: 'success',
    //             });
    //         }
    //     }
    // }, [handleRejectDriver]);

    // useEffect(() => {
    //     if (responce) {
    //         if (responce?.data?.statusCode === 200) {
    //             Swal.fire({
    //                 title: 'Approved',
    //                 // title: 'Rejected',
    //                 text: 'This Vehicle has been Rejected',
    //                 icon: 'success',
    //             });
    //         }
    //     }
    // }, [handleApproveDriver]);

    return (
        // <>
        //     <div className="driver_card fs-6 my-2">
        //         <div className=" d-flex">
        //             <div className="col-3">

        //                 <img
        //                     className="card_image"
        //                     src={`${imageBaseUrl}${data?.userId?.profilePicture}`}

        //                     alt="---"
        //                 />
        //             </div>

        //             <div className=" driver_card_ctn col-9 d-flex text-wrap  ">
        //                 <div className="col-5 ms-3">
        //                     <div className="container-fluid row">
        //                         <div className="row d-flex mb-2">
        //                             <div className="col-6">
        //                                 {t('admindriver.name')}
        //                             </div>
        //                             <div className="driver-card-data col-6">
        //                                 {data?.userId?.name
        //                                     ? data?.userId?.name
        //                                     : '-'}{' '}
        //                             </div>
        //                         </div>

        //                         <div className="row d-flex mb-2">
        //                             <div className="col-6">
        //                                 {t('admindriver.experience')}
        //                             </div>
        //                             <div className="driver-card-data col-6">
        // {data?.experience
        //     ? data?.experience
        //     : '-'}
        //                             </div>
        //                         </div>

        //                         <div className="row d-flex mb-2">
        //                             <div className="col-6">
        //                                 {t('admindriver.age')}
        //                             </div>
        //                             <div className="driver-card-data col-6">
        //                                 {data?.userId?.age
        //                                     ? data?.userId?.age
        //                                     : '-'}{' '}
        //                             </div>
        //                         </div>

        //                         <div className="row d-flex mb-2">
        //                             <div className="col-6">
        //                                 {t('admindriver.email')}
        //                             </div>
        //                             <div className="driver-card-data col-6">
        //                                 {data?.userId?.email
        //                                     ? data?.userId?.email
        //                                     : '-'}
        //                             </div>
        //                         </div>

        //                         <div className="row d-flex mb-2">
        //                             <div className="col-6">
        //                                 {t('admindriver.contact')}
        //                             </div>
        //                             <div className="driver-card-data col-6">
        //                                 {data?.userId?.mobileNumber
        //                                     ? data?.userId?.mobileNumber
        //                                     : '-'}
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="verticle-line mx-3 mt-1 "> </div>
        //                 <div className="col-6 ">
        //                     <div className="container-fluid row">
        //                         <div className="container-fluid row">
        //                             <div className="col-6 ">
        //                                 <p>{t('admindriver.vehicletype')}</p>
        //                                 <p>{t('admindriver.location')}</p>
        //                                 <p>{t('admindriver.adharno')} </p>
        //                                 <p> {t('admindriver.licenseno')}</p>
        //                             </div>

        //                             <div className="col-6  ">
        //                                 <p>
        //                                     {' '}
        //                                     {data?.vehiclesType
        //                                         ? data?.vehiclesType
        //                                               ?.map(
        //                                                   (item: number) => item
        //                                               )
        //                                               .join(', ')
        //                                         : '-'}
        //                                 </p>
        //                                 <p>
        //                                     {' '}
        //                                     {data?.location
        //                                         ? data?.location
        //                                         : '-'}{' '}
        //                                 </p>
        //                                 <p>
        //                                     {' '}
        //                                     {data?.adharNumber
        //                                         ? data?.adharNumber
        //                                         : '-'}
        //                                 </p>
        //                                 <p>
        //                                     {' '}
        //                                     {data?.licenseNumber
        //                                         ? data?.licenseNumber
        //                                         : '-'}
        //                                 </p>
        //                             </div>
        //                             <div className="driver_line mt-3" />
        //                             <div className="col-12 ">
        //                                 <p className="">
        //                                     <div className="d-flex justify-content-between mt-4 ">
        //                                         <button
        //                                             className="driver_action_btn d-flex align-items-center justify-content-center fw-semibold  "
        //                                             onClick={() =>
        //                                                 setLicenceModal(true)
        //                                             }
        //                                         >
        //                                             {t(
        //                                                 'admindriver.viewlicense'
        //                                             )}
        //                                         </button>

        //                                         {data?.isApproved ===
        //                                             vehicleStatus?.requested && (
        //                                             <>
        //                                                 <button
        //                                                     onClick={
        //                                                         handleApproveDriver
        //                                                     }
        //                                                     className="driver_action_btn d-flex align-items-center justify-content-center fw-semibold "
        //                                                 >
        //                                                     {t(
        //                                                         'admindriver.approve'
        //                                                     )}
        //                                                 </button>
        //                                                 <button
        //                                                     onClick={
        //                                                         handleRejectDriver
        //                                                     }
        //                                                     className="driver_action_btn d-flex align-items-center justify-content-center fw-semibold "
        //                                                 >
        //                                                     {t(
        //                                                         'admindriver.reject'
        //                                                     )}
        //                                                 </button>
        //                                             </>
        //                                         )}
        //                                     </div>
        //                                 </p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>

        //             </div>
        //         </div>
        //     </div>
        //     <LicenceModal
        //         imgData={{
        //             image: `${imageBaseUrl}${data?.drivingLicence}`,
        //             name: data?.userId?.name,
        //         }}
        //         show={licenceModal}
        //         onHide={() => setLicenceModal(false)}
        //     />
        // </>

        <>
            <div className="container-fuild mb-2">
                <div className="col-12 driver_profile_card">
                    <div className="row mt-2">
                        <div className="col-3">
                            <img
                                className="driver_card_image mx-2 d-flex justify-content-center"
                                src={`${imageBaseUrl}${data?.userId?.profilePicture}`}
                                alt=""
                            />
                        </div>
                        <div className="col ps-5">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="">
                                    {' '}
                                    <h5 className="m-0">
                                        {data?.userId?.name
                                            ? data?.userId?.name
                                            : '-'}{' '}
                                    </h5>
                                    <p className="user_profile_details">
                                        {data?.userId?.email
                                            ? data?.userId?.email
                                            : '-'}
                                    </p>
                                </div>
                                {/* <div className="d-flex me-3">
                                    <button
                                        className="driver_action_btn top_btn d-flex align-items-center justify-content-center fw-semibold me-2"
                                        onClick={() => setLicenceModal(true)}
                                    >
                                        {t('admindriver.viewlicense')}
                                    </button>
                                    
                                </div> */}
                            </div>
                            <div className="horizantal_line_driver mt-2 mb-2"></div>

                            <div className="row mt-0">
                                <div className="col">
                                    {' '}
                                    <p className="user_profile_label">
                                        {' '}
                                        {t('admindriver.location')}
                                    </p>
                                </div>
                                <div className="col">
                                    {' '}
                                    <p className="user_profile_details">
                                        {data?.userId
                                            ? data?.userId?.location
                                            : '-'}{' '}
                                    </p>
                                </div>
                            </div>

                            <div className="row my-2">
                                <div className="col">
                                    {' '}
                                    <p className="user_profile_label">
                                        {' '}
                                        {t('admindriver.contact')}
                                    </p>
                                </div>
                                <div className="col">
                                    {' '}
                                    <p className="user_profile_details">
                                        {data?.userId?.mobileNumber
                                            ? data?.userId?.mobileNumber
                                            : '-'}{' '}
                                    </p>
                                </div>
                            </div>

                            <div className="row my-2">
                                <div className="col">
                                    {' '}
                                    <p className="user_profile_label">
                                        {t('admindriver.adharno')}
                                    </p>
                                </div>
                                <div className="col">
                                    <p className="user_profile_details">
                                        {data?.adharNumber
                                            ? data?.adharNumber
                                            : '-'}
                                    </p>
                                </div>
                            </div>

                            <div className="row my-2">
                                <div className="col">
                                    {' '}
                                    <p className="user_profile_label">
                                        {' '}
                                        {t('admindriver.licenseno')}
                                    </p>
                                </div>
                                <div className="col">
                                    {' '}
                                    <p className="user_profile_details">
                                        {data?.licenseNumber
                                            ? data?.licenseNumber
                                            : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4 ms-4">
                        <div className="col text-center data_row_bottom">
                            <div className="row">
                                <p className="user_profile_label">
                                    {t('admindriver.price')}
                                </p>
                            </div>
                            <div className="row">
                                <p className="user_profile_details">
                                    {t('admindriver.rs')}{' '}
                                    {data?.dayWisePrice
                                        ? data?.dayWisePrice
                                        : '-'}
                                </p>
                            </div>
                        </div>

                        <div className="col text-center data_row_bottom">
                            <div className="row">
                                <p className="user_profile_label">
                                    {t('adminuserinfo.age')}
                                </p>
                            </div>
                            <div className="row">
                                <p className="user_profile_details">
                                    {data?.userId?.age
                                        ? data?.userId?.age
                                        : '-'}{' '}
                                    {t('admindriver.years')}
                                </p>
                            </div>
                        </div>

                        <div className="col text-center data_row_bottom">
                            <div className="row">
                                <p className="user_profile_label">
                                    {' '}
                                    {t('admindriver.experience')}
                                </p>
                            </div>
                            <div className="row">
                                <p className="user_profile_details">
                                    {data?.experience ? data?.experience : '-'}{' '}
                                    {t('admindriver.years')}
                                </p>
                            </div>
                        </div>

                        <div className="col text-center">
                            <div className="row">
                                <p className="user_profile_label">
                                    {' '}
                                    {t('admindriver.vehicletype')}
                                </p>
                            </div>
                            <div className="row">
                                <p className="user_profile_details">
                                    {data?.vehiclesType
                                        ? data?.vehiclesType
                                              ?.map((item: number) => item)
                                              .join(', ')
                                        : '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row px-2">
                        <div className="col d-flex justify-content-center mt-4">
                            <button
                                className="driver_action_btn top_btn d-flex align-items-center justify-content-center fw-semibold me-2 w-100"
                                onClick={() => setLicenceModal(true)}
                            >
                                {t('admindriver.viewlicense')}
                            </button>
                            {data?.isApproved === vehicleStatus?.requested && (
                                <>
                                    {/* <button
                                        className="driver_action_btn top_btn d-flex align-items-center justify-content-center fw-semibold me-2 w-100"
                                        onClick={() => setLicenceModal(true)}
                                    >
                                        {t('admindriver.viewlicense')}
                                    </button> */}
                                    <button
                                        onClick={handleApproveDriver}
                                        className="driver_action_btn top_btn d-flex align-items-center justify-content-center fw-semibold ms-2 me-2 w-100 "
                                    >
                                        {t('admindriver.approve')}
                                    </button>
                                    <button
                                        onClick={handleRejectDriver}
                                        className="driver_action_btn custom-btn-non-primary top_btn d-flex align-items-center justify-content-center fw-semibold ms-2 w-100"
                                    >
                                        {t('admindriver.reject')}
                                    </button>
                                </>
                            )}
                            {data?.isApproved === bookingRequests?.approved && (
                                <>
                                    {data?.userId?.isActive === true && (
                                        <div className="d-flex justify-content-end w-100">
                                            <button
                                                className="driver_action_btn custom-btn-non-primary top_btn d-flex align-items-center justify-content-center fw-semibold me-2 w-100"
                                                onClick={handleBlockUser}
                                            >
                                                {t(
                                                    'admindrivercards.blockbutton'
                                                )}
                                                {/* Block */}
                                            </button>
                                            {/* <button
                                                className="driver_action_btn top_btn d-flex align-items-center justify-content-center fw-semibold ms-2 w-100"
                                                onClick={() =>
                                                    setLicenceModal(true)
                                                }
                                            >
                                                {t('admindriver.viewlicense')}
                                            </button> */}
                                        </div>
                                    )}
                                    {data?.userId?.isActive === false && (
                                        <>
                                            <button
                                                className="driver_action_btn custom-btn-non-primary top_btn d-flex align-items-center justify-content-center fw-semibold me-2 w-100"
                                                onClick={handleUnblockUser}
                                            >
                                                {t(
                                                    'admindrivercards.unblockbutton'
                                                )}
                                                {/* Unblock */}
                                            </button>
                                            {/* <button
                                                className="driver_action_btn top_btn d-flex align-items-center justify-content-center fw-semibold ms-2 w-100"
                                                onClick={() =>
                                                    setLicenceModal(true)
                                                }
                                            >
                                                {t('admindriver.viewlicense')}
                                            </button> */}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <LicenceModal
                imgData={{
                    image: `${imageBaseUrl}${data?.drivingLicence}`,
                    name: data?.userId?.name,
                }}
                show={licenceModal}
                onHide={() => setLicenceModal(false)}
            />
            <CarLoaderModal show={showPageLoader} />{' '}
        </>
    );
};

export default DriverCard;
