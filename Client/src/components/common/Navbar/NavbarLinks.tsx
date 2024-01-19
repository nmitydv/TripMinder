import { formateDateYYYYMMDD } from '../../../helpers/Functions/dateFormaters';
import { bookingStatus } from '../../../helpers/constants/idConstants';

export const NavbarLinks = {
    Admin: [
        // {
        //     name: 'nav.admin.home',
        //     url: '/admin/dashboard',
        // },
        {
            name: 'nav.admin.vehicles',
            url: '/admin/vehicles',
        },
        {
            name: 'nav.admin.drivers',
            url: '/admin/drivers',
        },
        {
            name: 'nav.admin.users',
            url: '/admin/users',
        },
        {
            name: 'nav.admin.owners',
            url: '/admin/owners',
        },
    ],
    User: [
        {
            name: 'nav.user.home',
            url: `/user/dashboard/${formateDateYYYYMMDD(
                new Date()
            )}/${formateDateYYYYMMDD(new Date())}`,
        },
        {
            name: 'nav.user.bookings',
            url: '/user/bookings',
        },
        // {
        //     name: 'nav.user.notifications',
        //     url: '/user/notifications',
        // },
    ],
    Driver: [
        // {
        //     name: 'nav.driver.home',
        //     url: '/driver/dashboard',
        // },
        {
            name: 'nav.driver.bookings',
            url: '/driver/bookings',
        },
        // {
        //     name: 'nav.driver.notifications',
        //     url: '/driver/notifications',
        // },
    ],
    VehicleOwner: [
        // {
        //     name: 'nav.vehicleowner.home',
        //     url: '/vehicle/dashboard',
        // },
        {
            name: 'nav.vehicleowner.vehicles',
            url: '/vehicle/vehicles',
        },
        {
            name: 'nav.vehicleowner.bookings',
            // url: `/vehicle/bookings/${'vehicleid'}/${bookingStatus?.inRunning}`,
            url: `/vehicle/bookings`,
        },
        // {
        //     name: 'nav.vehicleowner.notifications',
        //     url: '/vehicle/notifications',
        // },
    ],
};
