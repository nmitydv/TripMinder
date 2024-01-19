export const BookingStatus = ["Pending","InRunning","Completed"];
export const BookingRequest = ["Approve","Reject","Pending"];

export const BookingDocQueryVehicleDriverId = [
    {
        name: 'vehicleDriverId',
        allowEmptyValue: false,
        required: false,
        type: 'string',
        example: '',
        description: "string value must be Id",
    },
];
export const BookingDocQueryStatus = [
    {
        name: 'bookingStatus',
        allowEmptyValue: false,
        required: false,
        type: 'string',
        example: 'Pending',
        description: "string value with ',' InRunning, Completed, Pending",
    },
];
export const BookingDocQueryRequest = [
    {
        name: 'bookingRequest',
        allowEmptyValue: false,
        required: false,
        type: 'string',
        example: 'Pending',
        description: "string value with ',' Approve, Reject, Pending",
    },
];

export const BookingDocQueryUSerId = [
    {
        name: 'userId',
        allowEmptyValue: false,
        required: false,
        type: 'string',
        example: '',
        description: "string value must be Id",
    },
];