import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from "src/common/pagination/constants/pagination.enum.constant";

export const DRIVER_DEFAULT_PER_PAGE = 20;
export const DRIVER_DEFAULT_ORDER_BY = 'createdAt';
export const DRIVER_DEFAULT_ORDER_DIRECTION =
    ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
export const DRIVER_DEFAULT_AVAILABLE_ORDER_BY = [
    'experience',
    'availability',
    'adharNumber',
    'licenseNumber',
    'vehicleType',
    'isApproved',
];
export const DRIVER_DEFAULT_AVAILABLE_SEARCH = [
    'experience',
    'isApproved',
    'vehicleType',
];
export const DriverStatus = ["Pending","Approve","Reject"];
export const DRIVER_DEFAULT_AVAILABILITY = [true, false];
export const DRIVER_DEFAULT_RANGE = [1,100000];
export const DRIVER_DEFAULT_EXPERIANCE = [1,100];