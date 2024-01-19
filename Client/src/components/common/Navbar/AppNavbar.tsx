import app_logo from '../../../assets/images/apna_yatri_logo.svg';
import app_logo_dark from '../../../assets/images/APNA _YATRI_WHITE_LOGO.svg';
import default_user from '../../../assets/images/default_user.jpg';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Popover, Whisper } from 'rsuite';
import './AppNavbar.css';
import { NavbarLinks } from './NavbarLinks';
import { useLocation, useNavigate } from 'react-router-dom';
import DropDownProfile from './Dropdown';
import ProfileEditModal from './Profile';
import { useEffect, useState } from 'react';
import {
    bookingRequests,
    bookingStatus1,
    imageBaseUrl,
} from '../../../helpers/constants/idConstants';
import { useTranslation } from 'react-i18next';
import {
    useGetUserByIdQuery,
    usePushNotificationMutation,
    // usePushNotificationMutation,
} from '../../../redux/services/commonServices';
import { getFirebaseToken } from '../../../context/Firebase/Firebase';
const AppNavbar = () => {
    // const [theme, setTheme] = useState("light-theme");

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') === 'da' ? 'dark-theme' : 'light-theme'
    );

    const [selectedTheme, setSelectedTheme] = useState(
        localStorage.getItem('theme') === 'da' ? 'da' : 'li'
    );
    const [showNotificationBanner, setShowNotificationBanner] = useState(
        Notification.permission === 'default'
    );

    // const [selectedTheme, setSelectedTheme] = useState(
    //     // localStorage.getItem('language')
    //     'li'
    // );
    const userId = localStorage.getItem('userId');
    const {
        data: userData,
        error: userError,
        isLoading: userLoading,
    } = useGetUserByIdQuery(userId);
    const [sendNotificationToken] = usePushNotificationMutation();

    const userRole = localStorage.getItem('role');
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const [modalShow, setModalShow] = useState(false);
    const [t] = useTranslation('global');

    // Ensure the userRole is valid and exists in roleRoutings
    const validUserRoles = Object.keys(NavbarLinks);
    const linkType = validUserRoles.includes(userRole) ? userRole : 'Default';

    const isActive = (url) => {
        const currentPathSegments = location.split('/').slice(1, 3);

        const linkPathSegments = url.split('/').slice(1, 3);

        return (
            JSON.stringify(currentPathSegments) ===
            JSON.stringify(linkPathSegments)
        );
    };

    const toggleTheme = (event) => {
        localStorage.setItem('theme', event.target.value);
        setSelectedTheme(event.target.value);
        if (event.target.value === 'da') {
            setTheme('dark-theme');
        } else {
            setTheme('light-theme');
        }
    };

    // useEffect(() => {
    //     onForegroundMessage()
    //         .then((payload) => {
    //             console.log('Received foreground message: ', payload);
    //             const {
    //                 notification: { title, body },
    //             } = payload;
    //             toast(<ToastifyNotification title={title} body={body} />);
    //         })
    //         .catch((err) =>
    //             console.log(
    //                 'An error occured while retrieving foreground message. ',
    //                 err
    //             )
    //         );
    // }, []);

    useEffect(() => {
        console.log('Checking notification permission...');
        if (showNotificationBanner) {
            console.log('Getting firebase token...');
            getFirebaseToken()
                .then((firebaseToken) => {
                    console.log('Firebase Message token: ', firebaseToken);
                    // need to send this token to backend and save it in database for sending push notifications
                    if (firebaseToken) {
                        sendNotificationToken({
                            userId: userId,
                            notifyToken: firebaseToken,
                        });
                        setShowNotificationBanner(false);
                    }
                })
                .catch((err) =>
                    console.error(
                        'An error occured while retrieving firebase token. ',
                        err
                    )
                );
        }
    }, []);

    // const handleGetFirebaseToken = () => {
    //     console.log('Getting firebase token...');
    //     getFirebaseToken()
    //         .then((firebaseToken) => {
    //             console.log('Firebase Message token: ', firebaseToken);
    //             // need to send this token to backend and save it in database for sending push notifications
    //             if (firebaseToken) {
    //                 setShowNotificationBanner(false);
    //             }
    //         })
    //         .catch((err) => console.error('An error occured while retrieving firebase token. ', err))
    // }

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const speaker = (
        <Popover className="popover_custom" style={{ marginTop: '8px' }}>
            <DropDownProfile
                setModalShow={setModalShow}
                modalShow={modalShow}
                theme={theme}
                toggleTheme={toggleTheme}
                selectedTheme={selectedTheme}
            />
        </Popover>
    );
    const capitalizeString = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleAdditionalQueries = (link: string) => {
        if (link === '/vehicle/bookings') {
            const params: {
                vehicleDriverId?: string;
                bookingRequest?: string;
                bookingStatus?: string;
            } = {
                vehicleDriverId: 'vehicleid',
                bookingRequest: bookingRequests?.approved,
                bookingStatus: bookingStatus1?.inrunning,
            };

            const searchParams = new URLSearchParams(params);

            const options = {
                pathname: '/vehicle/bookings',
                search: `?${searchParams.toString()}`,
            };
            navigate(options);
        } else {
            navigate(link);
        }
    };

    return (
        <>
            <Navbar fixed="top" expand="lg" className="navbar_bg">
                <Navbar.Brand href="#">
                    <img
                        src={theme === 'light-theme' ? app_logo : app_logo_dark}
                        alt="logo"
                        className="logo_img"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">
                        {NavbarLinks[linkType]?.map((link, index) => (
                            <Nav.Link
                                onClick={() =>
                                    handleAdditionalQueries(link.url)
                                }
                                key={index}
                                className={`nav_links mx-3 fw-semibold ${
                                    isActive(link.url) ? 'active' : ''
                                }`}
                            >
                                {t(link?.name).toString()}
                            </Nav.Link>
                        ))}
                        <Nav.Link
                            className="d-flex align-items-center text-decoration-none"
                            // onClick={() => handleProfileRouting()}
                        >
                            <Whisper
                                placement="bottomEnd"
                                trigger="active"
                                controlId="control-id-active-enterable"
                                speaker={speaker}
                                enterable
                            >
                                <div className="profile_box d-flex align-items-center pe-3">
                                    <img
                                        // src={`${imageBaseUrl}${userData?.data?.profilePicture}`}
                                        src={
                                            userData?.data?.profilePicture
                                                ? `${imageBaseUrl}${userData?.data?.profilePicture}`
                                                : default_user
                                        }
                                        alt="user"
                                        className="profile_img"
                                    />
                                    <span className="ms-3 text-nowrap profile_user_name fw-bold">
                                        {' '}
                                        {userData?.data?.name}
                                        <br />
                                        <p className="user_role_name fw-medium">
                                            {/* {t('nav.profile.role')}:{' '} */}
                                            {userData?.data?.role}
                                        </p>
                                    </span>
                                </div>
                            </Whisper>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <ProfileEditModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};
export default AppNavbar;
