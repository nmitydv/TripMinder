

export const DriverDocQueryDayWisePrice = [
    {
        name: 'dayWisePrice',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: '500,1000',
        description: "String value must be 500,1000",
    },
];

export const DriverDocQueryExperience = [
    {
        name: 'experience',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: '1,5',
        description: "String value must be 1,5",
    },
];

export const DriverDocQueryVehiclesType = [
    {
        name: 'vehiclesType',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: '2,4',
        description: "String value must be 2,4,6",
    },
];

export const DriverDocQueryIsApproved = [
    {
        name: 'isApproved',
        allowEmptyValue: false,
        required: false,
        type: 'string',
        example: 'Pending',
        description: "string value with ',' Approve, Reject, Pending",
    },
];

export const DriverDocQueryIsAvailabilty = [
    {
        name: 'availability',
        allowEmptyValue: false,
        required: false,
        type: 'string',
        example: 'true',
        description: "string value with ',' true, false, Pending",
    },
];