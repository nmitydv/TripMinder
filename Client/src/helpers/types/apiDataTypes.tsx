// Get user Api Types
export interface User {
    _id: string;
    name: string;
    mobileNumber: string;
    email: string;
    location: string;
    gender: string;
    role: string;
    age: number;
    joiningDate: string;
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
}

export interface Vehicle {
    userId: string;
    vehicleId: string;
    IsActive: boolean;
    notifyToken : string;
    vehicleName: string;
    vehicleNumber: string;
    modelNumber: string;
    vehiclePictures: string[];
    numberPlatePic: string;
    vehicleType: string;
    ownerId: string;
    registrationNumber: string;
    features: string[];
    seaters: number;
    kmPrice: number;

    availability: boolean;
    isActive: boolean;
    joiningDate: string;
    isApprove: string;
    createdAt: string;
    updatedAt: string;
}

export interface Booking {
    _id: string;
    user: string;
    driver: string;
    vehicle: string;
    pickupLocation: string;
    destinationLocation: string;
    pickupDate: string;
    pickupTime: string;
    status: string;
    paymentMethod: string;
    fare: number;
    createdAt: string;
    updatedAt: string;
}

export interface Driver {
    _id: string;
    driverId: string;
    name: string;
    mobileNumber: string;
    email: string;
    location: string;
    gender: string;
    role: string;
    age: number;
    joiningDate: string;
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
    experience: string;
    userId: string;
    Availability: string;
    adharNumber: string;
    licenseNumber: string;
    vehicleType: string;
    description: string[];
    drivingLicence: string;
}

export interface Bookings {
    userId: string;
    vehicleDriverId: string;
    pickupLocation: string;
    dropLocation: string;
    startDate: string;
    endDate: string;
    price: number;
    bookingStatus: string;
    bookingRequest: string;
}

export interface Reponse<T> {
    data: T;
    // _metadata: any;
}
