import Swal from 'sweetalert2';
import { imageBaseUrl } from '../../../helpers/constants/idConstants';
import '../../Admin/pages/styles/UserProfileCrad.css';
import { useTranslation } from 'react-i18next';
import { useBlockUnblockUserMutation } from '../../../redux/services/adminServices';
import { formateDateYYYYMMDD } from '../../../helpers/Functions/dateFormaters';
import { CarLoaderModal } from '../../../common/Loaders/Loaders';
import { useState } from 'react';

const UserProfileCard = ({ data }) => {
    const [sendBlockUnblock] = useBlockUnblockUserMutation();
    const [showPageLoader, setShowPageLoader] = useState(false);

    // //(';;;;;;;;', data);
    const [t] = useTranslation('global');

    const handleBlockUser = () => {
        Swal.fire({
            // title: 'Are you sure',
            title: t('adminuserinfo.title1'),
            // text: 'You want to block this user',
            text: t('adminuserinfo.blocktext1'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('adminuserinfo.admincancelbtn'),
            // 'Cancel',
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('adminuserinfo.adminyesbtn'),
            // 'Yes',
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
                setTimeout(async () => {
                    try {
                        const resp = await sendBlockUnblock({
                            userId: data?._id,
                            isActive: false,
                        });
                        // // //('$$$$$$$$$resp', resp);
                        if (resp?.data?.statusCode === 200) {
                            setShowPageLoader(false);
                            Swal.fire({
                                // title: 'Success',
                                title: t('adminuserinfo.title2'),
                                // text: `User blocked successfully`,
                                text: t('adminuserinfo.blocktext2'),
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
                                title: t('adminuserinfo.title33'),
                                // 'Invalid data',
                                text: t('adminuserinfo.text33'),

                                // 'Invalid data to block this user. Please try again later',

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
                            // title: 'Invalid data',
                            title: t('adminuserinfo.title34'),
                            // text: 'Invalid data to block this user. Please try again later',
                            text: t('adminuserinfo.blocktext34'),
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
                }, 1000);
            }
        });
    };

    const handleUnblockUser = () => {
        Swal.fire({
            // title: 'Are you sure??',
            title: t('adminuserinfo.title1'),
            // text: 'You want to unblock this user.',
            text: t('adminuserinfo.unblocktext1'),
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('adminuserinfo.cncl'),
            // 'cancel',
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('adminuserinfo.yess'),
            // 'Yes',
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
                setTimeout(async () => {
                    try {
                        const resp = await sendBlockUnblock({
                            userId: data?._id,
                            isActive: true,
                        });
                        if (resp?.data?.statusCode === 200) {
                            setShowPageLoader(false);
                            Swal.fire({
                                // title: 'Success',
                                title: t('adminuserinfo.title2'),
                                text: t('adminuserinfo.unblocktext2'),
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
                                title: t('adminuserinfo.title35'),
                                // 'Invalid data',
                                text: t('adminuserinfo.title35'),
                                // 'Invalid data to unblock this user. Please try again later.',
                                icon: 'error',

                                // confirmButtonText: t('booking.ok'),

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
                            // title: 'Error',
                            title: t('adminuserinfo.title4'),
                            // text: 'Error occured while unblock this user',
                            text: t('adminuserinfo.unblocktext4'),
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
                }, 1000);
            }
        });
    };

    return (
        <>
            <div className="row user_profile_card">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                            <div className=" d-flex justify-content-center align-items-center">
                                <img
                                    className="iiiimmmgggg "
                                    src={`${imageBaseUrl}${data?.profilePicture}`}
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex justify-content-between mt-3">
                                    <div className="">
                                        {' '}
                                        <h4>{data?.name}</h4>
                                        <p> {data?.mobileNumber}</p>
                                    </div>
                                    <div className="">
                                        {data?.isActive === true && (
                                            <button
                                                className="btn custom-btn-non-primary fw-bold px-3 me-1"
                                                onClick={handleBlockUser}
                                            >
                                                {t('adminuserinfo.blockbtn')}
                                            </button>
                                        )}
                                        {data?.isActive === false && (
                                            <button
                                                className="btn custom-btn-non-primary fw-bold px-3 me-1"
                                                onClick={handleUnblockUser}
                                            >
                                                {t('adminuserinfo.unblockbtn')}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="userCard_horizantal_line mt-3"></div>

                                <div className="row mt-3">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 ">
                                                <p className="user_profile_label">
                                                    {' '}
                                                    {t('adminuserinfo.email')}
                                                </p>
                                            </div>

                                            <div className="col-xs-9 col-sm-10 col-md-9 col-lg-9 col-xl-9 col-xxl-9 d-flex ">
                                                {' '}
                                                <p className="user_profile_details text-wrap">
                                                    {data?.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                {' '}
                                                <p className="user_profile_label">
                                                    {t(
                                                        'adminuserinfo.location'
                                                    )}
                                                </p>
                                            </div>

                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 d-flex ">
                                                {' '}
                                                <p className="user_profile_details text-wrap">
                                                    {data?.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4 mb-4">
                        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 d-flex justify-content-center align-items-center data_row_bottom">
                            <div className="text-center">
                                <div className="row">
                                    <p className="user_profile_label">
                                        {/* {t('adminuserinfo.contact')} */}
                                        {t('adminuserinfo.joiningdate')}
                                    </p>
                                </div>
                                <div className="row mt-2">
                                    <p className="user_profile_details">
                                        {/* {data?.mobileNumber} */}
                                        {formateDateYYYYMMDD(data?.joiningDate)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4  data_row_bottom ">
                            <div className="text-center">
                                <div className="row">
                                    <p className="user_profile_label">
                                        {t('adminuserinfo.age')}
                                    </p>
                                </div>
                                <div className="row mt-2">
                                    <p className="user_profile_details">
                                        {data?.age}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="text-center">
                                <div className="row">
                                    <p className="user_profile_label">
                                        {' '}
                                        {t('adminuserinfo.gender')}
                                    </p>
                                </div>
                                <div className="row mt-2">
                                    <p className="user_profile_details">
                                        {data?.gender}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CarLoaderModal show={showPageLoader} />{' '}
        </>
    );
};
export default UserProfileCard;
