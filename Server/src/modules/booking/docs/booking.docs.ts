import { Doc } from "src/common/doc/decorators/doc.decorator";
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { BookingGetSerialization } from "../serializations/booking.get.serialization";
import { BookingListGetSerialization } from "../serializations/booking.listget.serialization";
import { BookingDocQueryRequest, BookingDocQueryStatus, BookingDocQueryUSerId, BookingDocQueryVehicleDriverId } from "../constant/booking.constant";


export function BookingCreatedDoc(): MethodDecorator {
    return applyDecorators(
        Doc<BookingGetSerialization>('booking.create', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                serialization: BookingGetSerialization
            },
        })
    );
}


export function BookingByIdDoc(): MethodDecorator {
    return applyDecorators(
        Doc<BookingGetSerialization>('booking.get', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                serialization: BookingGetSerialization 
            },
        })
    );
}

export function BookingsByUserIdDoc(): MethodDecorator {
    return applyDecorators(
        Doc<BookingListGetSerialization>('bookings.UserId', {
            auth: {
                jwtAccessToken: true,
            }, 
            request: {
                queries: [...BookingDocQueryUSerId,...BookingDocQueryStatus,...BookingDocQueryRequest],
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}

export function BookingsByVehicalDriverIdDoc(): MethodDecorator {
    return applyDecorators(
        Doc<BookingListGetSerialization>('booking.VehicalDriverId', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.FOUND,
            },
        })
    );
}

export function BookingsByBookingStatusDoc(): MethodDecorator {
    return applyDecorators(
        Doc<BookingListGetSerialization>('booking.BookingStatus', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.FOUND,
            },
        })
    );
}

export function BookingsByBookingRequestDoc(): MethodDecorator {
    return applyDecorators(
        Doc<BookingListGetSerialization>('booking.BookingRequest', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.FOUND,
            },
        })
    );
}


// export function UserDeleteSelfDoc(): MethodDecorator {
//     return applyDecorators(
//         Doc<void>('user.deleteSelf', {
//             auth: {
//                 jwtAccessToken: true,
//             },
//         })
//     );
// }



export function BookingupdateDoc(): MethodDecorator {
    return applyDecorators(
        Doc<BookingGetSerialization>('booking.update', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}



export function BookingBystatus(): MethodDecorator {
    return applyDecorators(
        Doc<BookingListGetSerialization>('booking.list', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.FOUND,
            },
        })
    );
}

export function deleteBookingById(): MethodDecorator {
    return applyDecorators(
        Doc('booking.delete', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}
export function BookingsByBookingStatusAndRequestByVehicleIdDoc(): MethodDecorator {
    return applyDecorators(
        Doc<BookingListGetSerialization>('booking.BookingStatus', {
            auth: {
                jwtAccessToken: true,
            }, 
            request: {
                queries: [...BookingDocQueryVehicleDriverId,...BookingDocQueryStatus,...BookingDocQueryRequest],
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}