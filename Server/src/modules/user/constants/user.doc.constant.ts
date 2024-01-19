import { faker } from '@faker-js/faker';

export const UserDocQueryIsApprove = [
    {
        name: 'isApprove',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: 'Pending',
        description: "String value must be Pending,Approve,Reject",
    },
];
export const UserDocQueryIsActive = [
    {
        name: 'isActive',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: 'true,false',
        description: "boolean value with ',' delimiter",
    },
];

export const UserDocQueryBlocked = [
    {
        name: 'blocked',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: 'true,false',
        description: "boolean value with ',' delimiter",
    },
];

export const UserDocParamsGet = [
    {
        name: 'user',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: faker.datatype.uuid(),
    },
];
export const UserGenders = ["male","female","other"];
export const UserRoles = ["User","Driver","VehicleOwner","Admin"];



export const UserDocQueryByRole = [
    {
        name: 'role',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: 'User',
        description: "string value with  Roles: User VehicleOwner Driver ",
    },
];