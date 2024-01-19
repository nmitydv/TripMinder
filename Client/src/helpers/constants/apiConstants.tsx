// export const API_VERSION = 'v1';
// export const API_BASE_URL = `http://15.206.66.147/api/${API_VERSION}/`; // Production server
// // export const API_BASE_URL = `https://jfxxlq12-3000.inc1.devtunnels.ms/api/${API_VERSION}/`;  // Localhost server #jaidsheikh

// export const ApiUrls = {
//     createUserByRole: `public/user/create/User`,
//     getUserByEmail: `public/user/User/email`,

//     // For Admin
//     getAllVehiclesByRequest: `vehicle/vehicleStatus`,
//     getAllUsersList: `admin/user/list`,
//     getAllVehiclesByStatus: `vehicle/vehicleStatus`,
//     creteApproveVehicles: 'admin/user/update',
//     getAllUsersListByRole: `admin/user/role`,
//     getDriversCountStatusWise: `driver/totalNumber/drivers/status`,
//     getVehiclesCountStatusWise: `vehicle/totalNumber/vehicle/status`,

//     // For User
//     getAllActiveVehicles: `vehicle/All/vehicles`,
//     createBookingByUserId: `booking/create`,
//     getFilteredVehicleByAvailability: `vehicle/Filter`,

//     // For Driver
//     getAllBookingsByDriverId: `booking/bookingStatusByvehicleDriverId`,
//     getAllDriversByStatus: `driver/driverStatus`,
//     createDriverById: `driver/create/Driver`,
//     getDriverByDriverId: `driver/driverId`,
//     updateDriverByDriverId: `driver/Driver/Update`,
//     // getAllDriversByStatus: `driver/driverStatus`,
//     // getAllBookingsByDriverId: `booking/bookingRequestByUserId`,

//     // For Vehicle Owner
//     getAllVehiclesByOwnerId: `vehicle/owner`,
//     addNewVehicle: `vehicle/create/vehicle`,
// };

export const API_VERSION = 'v1';
export const API_BASE_URL = `http://13.201.118.253/api/${API_VERSION}/`; // Production server
// export const API_BASE_URL = `https://jfxxlq12-3000.inc1.devtunnels.ms/api/${API_VERSION}/`; // Localhost server #jaidsheikh
export const ApiUrls = {
    createUserByRole: `public/user/signUp`,
    getUserByEmail: `public/user/signIn`,
    getRefreshToken: 'firebase/refresh-token',

    // For Admin
    getAllVehiclesByRequest: `vehicle/vehicleStatus`,
    getAllUsersList: `admin/user`,
    getAllVehiclesByStatus: `vehicle/vehicleStatus`,
    creteApproveVehicles: 'admin/user',
    getAllUsersListByRole: `admin/user`,
    getDriversCountStatusWise: `driver/totalNumber/drivers/status`,
    getVehiclesCountStatusWise: `vehicle/totalNumber/vehicle/status`,
    creteApproveDriver: 'driver/update/Status',
    blockUnblockUser: 'admin/user/Active',

    // For User
    getAllActiveVehicles: `vehicle/All/vehicles`,
    createBookingByUserId: `booking/create`,
    getFilteredVehicleByAvailability: `vehicle/Filter`,
    getFilteredDriversByAvailability: `driver/Filter`,
    getBookingIdByUserId: `booking/bookings`,
    getBookingByUserRequest: `booking/bookings/BookingStatusRequestUserId`,

    // For Driver
    // getAllBookingsByDriverId: `booking/bookingStatusByvehicleDriverId`,
    getAllBookingsByDriverId:
        'booking/bookingStatusAndRequestByvehicleDriverId',
    getAllDriversByStatus: `driver/driverStatus`,
    createDriverById: `driver/create/Driver`,
    getDriverByDriverId: `driver/driverId`,
    updateDriverByDriverId: `driver/Driver/Update`,
    // getAllDriversByStatus: `driver/driverStatus`,
    // getAllBookingsByDriverId: `booking/bookingRequestByUserId`,
    approveBookingRequestByBookingId: 'booking/Booking/Update',

    // For Vehicle Owner
    getAllVehiclesByOwnerId: `vehicle/owner`,
    addNewVehicle: `vehicle/create/vehicle`,
    activateDeactivateVehicle: 'vehicle/update/Active',
    getOwnerBookingsByVehicleidAndStatus: `booking/bookingStatusAndRequestByvehicleDriverId`,
    getUserById: `admin/user`,
    updateprofile: `user`,

    // Common
    getAllVehiclesByFiltersAndStatus: `vehicle/All/vehicles`,
    getAllDriversByFiltersAndStatus: `driver/List/All`,
    pushNotification: 'user',
    getRatingsByBookingsId: 'Rating/bookingId',
    createRatingsByBooking: 'Rating/create/Rating'
};
