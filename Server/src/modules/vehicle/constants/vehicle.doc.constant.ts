
export const VehicleDocQueryVehicleType = [
    {
        name: 'vehicleType',
        allowEmptyValue: true,
        required: true,
        type: 'string',
        example: 'two,four,six',
        description: "string value with ',' delimiter",
    },
];

export const VehicleDocQueryIsActive = [
    {
        name: 'isActive',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: 'true,false',
        description: "boolean value with ',' delimiter",
    },
];

export const VehicleDocQueryVehicleName = [
    {
        name: 'vehicleName',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: 'tavera,swift,scorpio',
        description: "string value with ',' delimiter",
    },
];

export const VehicleDocQuerySeaters = [
    {
        name: 'seaters',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: 2,
    },
];