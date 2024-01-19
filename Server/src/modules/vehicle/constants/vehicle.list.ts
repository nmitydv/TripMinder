import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';

export const VEHICLE_DEFAULT_PER_PAGE = 20;
export const VEHICLE_DEFAULT_ORDER_BY = 'createdAt';
export const VEHICLE_DEFAULT_ORDER_DIRECTION =
    ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
export const VEHICLE_DEFAULT_AVAILABLE_ORDER_BY = [
    'vehicleName',
    'modelNumber',
    'vehicleType',
    'seaters',
    'kmPrice',
    'isActive',
    'availability',
];
export const VEHICLE_DEFAULT_AVAILABLE_SEARCH = [
    'vehicleName',
    'modelNumber',
    'vehicleType',
    'seaters',
    'isActive',
];


export const VEHICLE_DEFAULT_IS_ACTIVE = [true, false];
export const VEHICLE_DEFAULT_SEATERS = Array.from(Array(200).keys()).map(num => num + 1);;
export const VEHICLE_DEFAULT_VEHICLE_TYPE = ["Two","Three","Four","Six","Eight"];


