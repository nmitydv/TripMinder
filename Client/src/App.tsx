import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Auth/pages/Login';
import Signup from './Auth/pages/Signup';
import ForgotPassword from './Auth/pages/ForgotPassword';

import NotFoundPage from './components/common/Error Pages/NotFoundPage';
import {
    ProtectedAdmin,
    ProtectedCustomer,
    ProtectedDriver,
    ProtectedToken,
    ProtectedVehicalOwner,
} from './Auth/protectedRoutings';
import UserType from './components/Other/pages/UserType';

// import AdminDashboard from './components/Admin/pages/Dashboard';
import Vehicles from './components/Admin/pages/Vehicles';
import AdminDrivers from './components/Admin/pages/Drivers';
import VehicleOwners from './components/Admin/pages/VehicleOwners';
import Users from './components/Admin/pages/Users';

// import OwnerDashboard from './components/Vehicle Owner/pages/Dashboard';
import OwnerVehicles from './components/Vehicle Owner/pages/Vehicles';
import OwnerBookings from './components/Vehicle Owner/pages/Bookings';
// import OwnerNotifications from './components/Vehicle Owner/pages/Notifications';

// import DriverDashboard from './components/Driver/pages/Dashboard';
import DriverBookings from './components/Driver/pages/Bookings';
// import DriverNotifications from './components/Driver/pages/Notifications';

import UserDashboard from './components/User/pages/Dashboard';
// import UserBookings from './components/User/pages/UserBookings';
// import UserNotifications from './components/User/pages/Notifications';

import { useEffect, useState } from 'react';
import { getFirebaseMessaging } from '../src/context/Firebase/Firebase';
// import * as jwtDecode from 'jwt-decode';
import './App.css';
// import AdditionalInfo from './components/Driver/pages/AdditionalInfo';
import UserBookings from './components/User/pages/UserBookings';
import NoInternetPage from './components/common/Error Pages/NoInternetPage';
import LandingPage from './components/Other/LandingPage/pages/LandingPage';
import { onMessage } from 'firebase/messaging';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notifySound from './assets/sounds/notify.mp3';

const App = () => {
    const [isOnline, setIsOnline] = useState(true);
    window.addEventListener('offline', () => setIsOnline(false));
    window.addEventListener('online', () => setIsOnline(true));
    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'en');
    }
    useEffect(() => {
        onMessage(getFirebaseMessaging(), (payload) => {
            console.log('Message received. ', payload);
            const {
                notification: { title, body },
            } = payload;
            const audio = new Audio(notifySound);
            audio.play();
            toast(<ToastifyNotification title={title} body={body} />, {
                hideProgressBar: true,
                style: { backgroundColor: 'var(--card-background)' },
                closeOnClick: true,
                rtl: false,
                autoClose: false,
                theme: 'light',
            });
        });
    }, []);

    const ToastifyNotification = ({ title, body }) => (
        <div className="push-notification">
            <h2 className="push-notification-title">🔔{title}</h2>
            <p className="push-notification-text">{body}</p>
        </div>
    );
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         var decoded = jwtDecode(token);
    //         let exp = decoded?.exp;
    //         let d = parseInt(Date.now().toString().substring(0, 10));
    //         // // //("exp---->", exp);
    //         // // //("now---->", d);
    //         // exp = d
    //         if (d >= exp) {
    //             // alert("in it")
    //             localStorage.clear();
    //             window.location.href = '/logout';
    //         }
    //     }
    // }, []);
    return (
        <>
            <BrowserRouter>
                {isOnline ? (
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/forgot" element={<ForgotPassword />} />

                        <Route element={<ProtectedToken />}>
                            <Route path="/user_type" element={<UserType />} />
                            {/* <Route
                                path="/driver/information"
                                element={<AdditionalInfo />}
                            /> */}

                            {/* Admin Protected Routings */}
                            <Route element={<ProtectedAdmin />}>
                                {/* <Route
                                    path="/admin/dashboard"
                                    element={<AdminDashboard />}
                                /> */}
                                <Route
                                    path="/admin/vehicles"
                                    element={<Vehicles />}
                                />
                                <Route
                                    path="/admin/drivers"
                                    element={<AdminDrivers />}
                                />
                                <Route
                                    path="/admin/users"
                                    element={<Users />}
                                />
                                <Route
                                    path="/admin/owners"
                                    element={<VehicleOwners />}
                                />
                                {/* <Route
                                    path="/admin/profile"
                                    element={<VehicleOwners />}
                                /> */}
                            </Route>

                            {/* User Protected Routings */}
                            <Route element={<ProtectedCustomer />}>
                                <Route
                                    path="/user/dashboard/:startDate/:endDate"
                                    element={<UserDashboard />}
                                />
                                <Route
                                    path="/user/bookings"
                                    element={<UserBookings />}
                                />
                                {/* <Route
                                    path="/user/notifications"
                                    element={<UserNotifications />}
                                />
                                <Route /> */}
                            </Route>

                            {/* Vehicle Owner Protected Routinngs */}
                            <Route element={<ProtectedVehicalOwner />}>
                                {/* <Route
                                    path="/vehicle/dashboard"
                                    element={<OwnerDashboard />}
                                /> */}
                                <Route
                                    path="/vehicle/vehicles"
                                    element={<OwnerVehicles />}
                                />
                                <Route
                                    path="/vehicle/bookings"
                                    element={<OwnerBookings />}
                                />
                                {/* <Route
                                    path="/vehicle/notifications"
                                    element={<OwnerNotifications />}
                                />
                                <Route
                                    path="/vehicle/profile"
                                    element={<h1>Your Profile</h1>}
                                /> */}
                            </Route>

                            {/* Protected Driver Routings */}
                            <Route element={<ProtectedDriver />}>
                                {/* <Route
                                    path="/driver/dashboard"
                                    element={<DriverDashboard />}
                                /> */}
                                <Route
                                    path="/driver/bookings"
                                    element={<DriverBookings />}
                                />
                                {/* <Route
                                    path="/driver/notifications"
                                    element={<DriverNotifications />}
                                /> */}
                                {/* <Route
                                    path="/driver/profile"
                                    element={<h1>Your Profile</h1>}
                                /> */}
                            </Route>
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="*" element={<NoInternetPage />} />
                    </Routes>
                )}
            </BrowserRouter>
            <ToastContainer
                newestOnTop={true}
                transition={Slide}
                position={'top-right'}
            />
            {/* Same as */}
            <ToastContainer />
        </>
    );
};

export default App;
