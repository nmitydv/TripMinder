import {
    bookingRequests,
    bookingStatus1,
    tabsValue,
    vehicleStatus,
} from './idConstants';

export const vehicleOwnerVehicleTabs = [
    {
        name: 'pagetabs.vehicleowner.vehicles.active.name',
        value: tabsValue?.active,
        isActive: true,
        status: vehicleStatus?.approved,
    },
    {
        name: 'pagetabs.vehicleowner.vehicles.requested.name',
        value: tabsValue?.requested,
        isActive: false,
        status: vehicleStatus?.requested,
    },
    {
        name: 'pagetabs.vehicleowner.vehicles.deactive.name',
        value: tabsValue?.deactive,
        isActive: false,
        status: vehicleStatus?.approved,
    },
    {
        name: 'pagetabs.vehicleowner.vehicles.rejected.name',
        value: tabsValue?.rejected,
        isActive: false,
        status: vehicleStatus?.rejected,
    },
];

export const vehicleOwnerBookingTabs = [
    {
        name: 'pagetabs.vehicleowner.bookings.requested.name',
        value: tabsValue?.requested,
        isActive: bookingRequests?.requested,
        status: bookingStatus1?.pending,
    },
    {
        name: 'pagetabs.vehicleowner.bookings.running.name',
        value: tabsValue?.inrunning,
        isActive: bookingRequests?.approved,
        status: bookingStatus1?.inrunning,
    },
    {
        name: 'pagetabs.vehicleowner.bookings.approved.name',
        value: tabsValue?.approved,
        isActive: bookingRequests?.approved,
        status: bookingStatus1?.pending,
    },
    {
        name: 'pagetabs.vehicleowner.bookings.rejected.name',
        value: tabsValue?.rejected,
        isActive: bookingRequests?.rejected,
        status: bookingStatus1?.pending,
    },
    {
        name: 'pagetabs.vehicleowner.bookings.completed.name',
        value: tabsValue?.completed,
        isActive: bookingRequests?.approved,
        status: bookingStatus1?.completed,
    },
];

export const driverBookingsTabs = [
    {
        name: 'pagetabs.driver.bookings.requested.name',
        value: tabsValue?.requested,
        isActive: bookingRequests?.requested,
        status: bookingStatus1?.pending,
    },
    {
        name: 'pagetabs.driver.bookings.approved.name',
        value: tabsValue?.approved,
        isActive: bookingRequests?.approved,
        status: bookingStatus1?.pending,
    },
    {
        name: 'pagetabs.driver.bookings.running.name',
        value: tabsValue?.inrunning,
        isActive: bookingRequests?.approved,
        status: bookingStatus1?.inrunning,
    },
    {
        name: 'pagetabs.driver.bookings.rejected.name',
        value: tabsValue?.rejected,
        isActive: bookingRequests?.rejected,
        status: bookingStatus1?.pending,
    },
    {
        name: 'pagetabs.driver.bookings.completed.name',
        value: tabsValue?.completed,
        isActive: bookingRequests?.approved,
        status: bookingStatus1?.completed,
    },
];

export const adminDriversTabs = [
    {
        name: 'pagetabs.admin.drivers.requested.name',
        value: tabsValue?.requested,
        isActive: false,
        status: vehicleStatus?.requested,
    },
    {
        name: 'pagetabs.admin.drivers.approved.name',
        value: tabsValue?.approved,
        isActive: true,
        status: vehicleStatus?.approved,
    },
    {
        name: 'pagetabs.admin.drivers.rejected.name',
        value: tabsValue?.rejected,
        isActive: false,
        status: vehicleStatus?.rejected,
    },
];

export const adminVehiclesTabs = [
    {
        name: 'pagetabs.admin.vehicles.requested.name',
        value: tabsValue?.requested,
        isActive: false,
        status: vehicleStatus?.requested,
    },
    {
        name: 'pagetabs.admin.vehicles.approved.name',
        value: tabsValue?.approved,
        isActive: true,
        status: vehicleStatus?.approved,
    },
    {
        name: 'pagetabs.admin.vehicles.rejected.name',
        value: tabsValue?.rejected,
        isActive: false,
        status: vehicleStatus?.rejected,
    },
];

export const userBookingsTabs = [
    {
        name: 'pagetabs.user.bookings.requested.name',
        value: tabsValue?.requested,
        isActive: bookingRequests?.requested,
        status: bookingStatus1.pending,
    },

    {
        name: 'pagetabs.user.bookings.approved.name',
        value: tabsValue?.approved,
        isActive: bookingRequests?.approved,
        status: bookingStatus1?.pending,
    },
    {
        name: 'pagetabs.user.bookings.running.name',
        value: tabsValue?.inrunning,
        isActive: bookingRequests?.approved,
        status: bookingStatus1?.inrunning,
    },
    {
        name: 'pagetabs.user.bookings.rejected.name',
        value: tabsValue?.rejected,
        isActive: bookingRequests?.rejected,
        status: bookingStatus1?.pending,
    },
    {
        name: 'pagetabs.user.bookings.completed.name',
        value: tabsValue?.completed,
        isActive: null,
        status: bookingStatus1.completed,
    },
];

export const userDashboardTabs = [
    {
        name: 'pagetabs.user.dashboard.vehicle.name',
        value: 'Vehicle',
    },
    {
        name: 'pagetabs.user.dashboard.driver.name',
        value: 'Driver',
    },
];

export const adminUserTabs = [
    {
        name: 'pagetabs.admin.admin.active',
        value: 'unblockedUsers',
        isActive: true,
        status: null,
    },
    {
        name: 'pagetabs.admin.admin.blocked',
        value: 'blockedUsers',
        isActive: false,
        status: null,
    },
];
