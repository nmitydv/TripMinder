import Table from 'react-bootstrap/Table';
import { imageBaseUrl } from '../../../helpers/constants/idConstants';
import defaultUser from '../../../assets/images/default_user.jpg';
import './DataTables.css';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { useBlockUnblockUserMutation } from '../../../redux/services/adminServices';
import { formateDateYYYYMMDD } from '../../../helpers/Functions/dateFormaters';
import { Popover, Whisper } from 'rsuite';
import { useEffect, useState } from 'react';
import { CarLoaderModal } from '../../../common/Loaders/Loaders';
const UserBookingsTable = ({ headings, data }) => {
    const [sendBlockUnblock] = useBlockUnblockUserMutation();
    // //(';;;;;;;;', data);
    const [t] = useTranslation('global');
    const [showPageLoader, setShowPageLoader] = useState(false);
    const [getedtheme, setGetedTheme] = useState(localStorage.getItem('theme'));

    useEffect(() => {
        setGetedTheme(localStorage.getItem('theme'));
    }, [localStorage.getItem('theme')]);

    const handleBlockUser = (userId: string) => {
        Swal.fire({
            title: t('usertabledata.tabletitle'),
            // 'Are you sure',
            text: t('usertabledata.tabletext'),
            // 'You want to block this user',
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('usertabledata.tablecancelbutton1'),
            // 'Cancel',
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('usertabledata.tableyeslbutton1'),
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
                try {
                    const resp = await sendBlockUnblock({
                        userId: userId,
                        isActive: false,
                    });
                    // // //('$$$$$$$$$resp', resp);
                    if (resp?.data?.statusCode === 200) {
                        setShowPageLoader(false);
                        Swal.fire({
                            title: t('usertabledata.tabletitle1'),
                            // 'Success',
                            text: t('usertabledata.tabletext1'),
                            // `User blocked successfully`,
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
                            title: t('usertabledata.tabletitle2'),
                            // 'Invalid data',
                            text: t('usertabledata.tabletext2'),
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
                        title: t('usertabledata.tabletitle3'),
                        // 'Error',
                        text: t('usertabledata.tabletext3'),
                        // 'Error occured while block this user',
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

    const handleUnblockUser = (userId: string) => {
        Swal.fire({
            title: t('usertabledata.tabletitle4'),
            //  'Are you sure??',
            text: t('usertabledata.tabletext4'),
            // 'You want to unblock this user.',
            icon: 'warning',
            iconColor: '#ED6C02',
            showCancelButton: true,
            cancelButtonText: t('usertabledata.tablecancelbutton2'),
            // 'cancel',
            cancelButtonColor: '#D5D7E3',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('usertabledata.tableyesbutton2'),
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
                            userId: userId,
                            isActive: true,
                        });
                        if (resp?.data?.statusCode === 200) {
                            setShowPageLoader(false);
                            Swal.fire({
                                title: t('usertabledata.tabletitle5'),
                                //  'Success',
                                text: t('usertabledata.tabletext5'),
                                // 'User Unblocked Successfully',
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
                                title: t('usertabledata.tabletitle6'),
                                // 'Invalid data',
                                text: t('usertabledata.tabletext6'),
                                // 'Invalid data to unblock this user. Please try again later.',
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
                            title: t('usertabledata.tabletitle7'),
                            // 'Error',
                            text: t('usertabledata.tabletext7'),
                            // 'Error occured while unblock this user',
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
    const speaker = (
        <Popover title="Title">
            <p>This is a default Popover </p>
            <p>Content</p>
            <p>
                <a>link</a>
            </p>
        </Popover>
    );
    const handlePopover = (imgData) => {
        return (
            <Popover title="Profile Picture">
                <img
                    src={`${imageBaseUrl}${imgData}`}
                    alt="User profile picture"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            </Popover>
        );
    };
    return (
        <>
            <div className="table-container px-3 py-3 mx-2" id="card_ctn">
                <Table
                    striped
                    bordered
                    hover
                    responsive
                    variant={`${
                        getedtheme === 'da'
                            ? 'dark'
                            : getedtheme === 'li' || !getedtheme
                            ? 'light'
                            : ''
                    }`}
                >
                    <thead>
                        <tr className="text-center">
                            {headings.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <>
                                <tr
                                    className="text-center align-middle"
                                    key={index}
                                >
                                    <td>{index + 1}</td>
                                    <td>
                                        <Whisper
                                            placement="top"
                                            trigger="hover"
                                            controlId="control-id-hover-enterable"
                                            speaker={
                                                <Popover>
                                                    <img
                                                        src={`${imageBaseUrl}${item?.profilePicture}`}
                                                        alt="User profile picture"
                                                        style={{
                                                            minHeight: '140px',
                                                            minWidth: '130px',
                                                            maxWidth: '130px',
                                                            maxHeight: '140px',
                                                        }}
                                                    />
                                                </Popover>
                                            }
                                            enterable
                                        >
                                            <img
                                                src={
                                                    item?.profilePicture
                                                        ? `${imageBaseUrl}${item?.profilePicture}`
                                                        : defaultUser
                                                }
                                                alt="User profile picture"
                                                className="table_profile_img"
                                            />
                                        </Whisper>
                                    </td>
                                    <td style={{ textTransform: 'capitalize' }}>
                                        {item?.name}
                                    </td>
                                    <td>{item?.email}</td>
                                    <td>{item?.mobileNumber}</td>
                                    <td>{item?.age}</td>
                                    <td>{item?.gender}</td>
                                    <td>{item?.location}</td>
                                    <td>
                                        {formateDateYYYYMMDD(item?.joiningDate)}
                                    </td>
                                    <td>
                                        {item?.isActive === true && (
                                            <button
                                                className="btn bg-primary custom-btn-non-primary fw-bold px-3 me-1"
                                                onClick={() =>
                                                    handleBlockUser(item?._id)
                                                }
                                            >
                                                {t('usertabledata.blockbutton')}
                                            </button>
                                        )}
                                        {item?.isActive === false && (
                                            <button
                                                className="btn bg-primary custom-btn-non-primary fw-bold px-3 me-1"
                                                onClick={() =>
                                                    handleUnblockUser(item?._id)
                                                }
                                            >
                                                {t(
                                                    'usertabledata.unblockbutton'
                                                )}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </Table>
            </div>
            <CarLoaderModal show={showPageLoader} />{' '}
        </>
    );
};

export default UserBookingsTable;
