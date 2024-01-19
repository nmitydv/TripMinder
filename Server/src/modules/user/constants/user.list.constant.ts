import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';

export const USER_DEFAULT_PER_PAGE = 20;
export const USER_DEFAULT_ORDER_BY = 'createdAt';
export const USER_DEFAULT_ORDER_DIRECTION =
    ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
export const USER_DEFAULT_AVAILABLE_ORDER_BY = [
    'name',
    'location',
    'gender',
    'email',
    'mobileNumber',
    'joiningDate',
];
export const USER_DEFAULT_AVAILABLE_SEARCH = [
    'name',
    'location',
    'gender',
    'email',
    'mobileNumber',
];

export const USER_DEFAULT_IS_ACTIVE = [true, false];
export const USER_DEFAULT_BLOCKED = [true, false];
