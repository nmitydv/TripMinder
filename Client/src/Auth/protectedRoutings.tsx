// Desc: Check if user is valid or not

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAdmin, isCustomer, isDriver, isVehicleOwner } from './userRoles';
import AppNavbar from '../components/common/Navbar/AppNavbar';

//  Protected routes for admin, driver, vehicle owner and customer
export const ProtectedAdmin = () => {
    const isAuth = isAdmin();
    return isAuth ? (
        <>
            <Main />
        </>
    ) : (
        <Navigate to="/" />
    );
};

export const ProtectedDriver = () => {
    const isAuth = isDriver();
    // //('isAuth', isAuth);
    return isAuth ? (
        <>
            <Main />
        </>
    ) : (
        <Navigate to="/" />
    );
};

export const ProtectedVehicalOwner = () => {
    const isAuth = isVehicleOwner();
    return isAuth ? (
        <>
            <Main />
        </>
    ) : (
        <Navigate to="/" />
    );
};

export const ProtectedCustomer = () => {
    const isAuth = isCustomer();
    return isAuth ? (
        <>
            <Main />
        </>
    ) : (
        <Navigate to="/" />
    );
};

export const ProtectedToken = () => {
    const isAuth = localStorage.getItem('token');
    // // //('Token Auth Is : ', isAuth);
    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

const Main = () => {
    const location = useLocation().pathname;
    return (
        <>
            <AppNavbar />
            <div
                style={{
                    marginTop: '80px',
                    padding: location === '/vehicle/vehicles' || location === '/vehicle/bookings' ? '' : '13px',
                }}
            >
                <Outlet />
            </div>
            {/* <div style={{ marginTop: '80px', padding: '13px' }}>
                <Outlet />
            </div> */}
        </>
    );
};
