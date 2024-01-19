import { Doc, DocPaging } from "src/common/doc/decorators/doc.decorator";
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { DriverGetSerialization } from "../serialization/driver.get.serialization";
import { DriverListGetSerialization } from "../serialization/driver.listget.serialization";
import { DriverDocQueryDayWisePrice, DriverDocQueryExperience, DriverDocQueryIsApproved, DriverDocQueryIsAvailabilty, DriverDocQueryVehiclesType, } from "../constant/driver.doc.constant";


export function DriverCreatedDoc(): MethodDecorator {
    return applyDecorators(
        Doc<DriverGetSerialization>('driver.create', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.CREATED,
            },
        })
    );
}


export function DriverByIdDoc(): MethodDecorator {
    return applyDecorators(
        Doc<DriverGetSerialization>('driver.get', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.FOUND,
            },
        })
    );
}

export function DriverUpdateDoc(): MethodDecorator {
    return applyDecorators(
        Doc<DriverGetSerialization>('driver.update', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}

export function DriverStatusDoc(): MethodDecorator {
    return applyDecorators(
        DocPaging<DriverListGetSerialization>('driver.list', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                queries: [...DriverDocQueryIsApproved],
            },
            response: {
                serialization: DriverListGetSerialization
            },
        })
    );
}

export function DeleteDriverDoc(): MethodDecorator {
    return applyDecorators(
        Doc<DriverGetSerialization>('driver.delete', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}

export function DriverAllDoc(): MethodDecorator {
    return applyDecorators(
        DocPaging<DriverListGetSerialization>('driver.list', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                queries: [...DriverDocQueryIsApproved,...DriverDocQueryIsAvailabilty,...DriverDocQueryExperience,...DriverDocQueryDayWisePrice,...DriverDocQueryVehiclesType],
            },
            response: {
                serialization: DriverListGetSerialization
            },
        })
    );
}

export function TotalOfdriversAndByStatusDoc(): MethodDecorator {
    return applyDecorators(
        Doc<void>('driver.get', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}

export function DriverListDoc(): MethodDecorator {
    return applyDecorators(
        DocPaging<DriverListGetSerialization>('driver.list', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                queries: [...DriverDocQueryDayWisePrice,...DriverDocQueryExperience,...DriverDocQueryVehiclesType],
            },
            response: {
                serialization: DriverListGetSerialization
            },
        })
    );
}

export function DriverIsApproveDoc(): MethodDecorator {
    return applyDecorators(
        Doc<void>('driver.Approve', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}
