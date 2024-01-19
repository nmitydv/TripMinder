import { applyDecorators, HttpStatus } from '@nestjs/common';
import { Doc, DocPaging } from "src/common/doc/decorators/doc.decorator";

// import { VehicalDocQueryIsActive, VehicalDocQuerySeaters, VehicalDocQueryVehicalName, VehicalDocQueryVehicalType } from '../constants/vehical.doc.constant';
import { string, boolean } from 'yargs';
import { VehicleDocQueryIsActive, VehicleDocQuerySeaters, VehicleDocQueryVehicleName, VehicleDocQueryVehicleType } from '../constants/vehicle.doc.constant';
import { VehicleGetSerialization } from '../serialization/vehicle.get.serialization';
import { VehicleListGetSerialization } from '../serialization/vehicle.listget.serialization';
import { UserDocQueryIsActive, UserDocQueryIsApprove } from 'src/modules/user/constants/user.doc.constant';
import { VehiclerDocQuerySeater, VehiclerDocQuerySeaters, VehiclerDocQueryVehicleType } from './vehicle.doc.constant';


export function VehicleCreatedDoc(): MethodDecorator {
    return applyDecorators(
        Doc<VehicleGetSerialization>('vehicle.create', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.CREATED,
            },
        })
    );
}

export function VehicleByIdDoc(): MethodDecorator {
    return applyDecorators(
        Doc<VehicleGetSerialization>('vehicle.get', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.FOUND,
            },
        })
    );
}
export function VehicleAvaibilityDoc(): MethodDecorator {
    return applyDecorators(
        Doc<VehicleGetSerialization>('vehicle.update', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}



export function VehicleActiveDoc(): MethodDecorator {
    return applyDecorators(
        Doc<VehicleGetSerialization>('vehicle.update', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}

export function VehicleListDoc(): MethodDecorator {
    return applyDecorators(
        DocPaging<VehicleListGetSerialization>('vehicle.list', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                queries: [...VehiclerDocQuerySeater,...VehiclerDocQueryVehicleType],
            },
            response: {
                serialization: VehicleListGetSerialization
            },
        })
    );
}

export function VehicalActivityDoc(): MethodDecorator {
    return applyDecorators(
        Doc<VehicleListGetSerialization>('vehical.list', {

            auth: {
                jwtAccessToken: true,
            },response: {
  
                httpStatus: HttpStatus.OK,
            },
        })
    );
}

export function vehicleStatusDoc(): MethodDecorator {
    return applyDecorators(
        DocPaging<VehicleListGetSerialization>('vehicle.list', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                queries: [...UserDocQueryIsApprove],
            },
            response: {
                serialization: VehicleListGetSerialization
            },
        })
    );
}

export function vehicleBtOwnerIdDoc(): MethodDecorator {
    return applyDecorators(
        Doc<VehicleListGetSerialization>('vehicle.list', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.FOUND,
            },
        })
    );
}

export function vehicleUpdateByIdDoc(): MethodDecorator {
    return applyDecorators(
        Doc<VehicleListGetSerialization>('vehicle.updated', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}

export function getTotalOfVehiclesAndByStatusDoc(): MethodDecorator {
    return applyDecorators(
        Doc('vehicle.get', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}


export function AllVehicleListDoc(): MethodDecorator {
    return applyDecorators(
        DocPaging<VehicleListGetSerialization>('vehicle.list', {
            auth: {
                jwtAccessToken: true,
            },
            request: {
                queries: [...UserDocQueryIsActive,...UserDocQueryIsApprove,...VehiclerDocQueryVehicleType,...VehiclerDocQuerySeaters],
            },
            response: {
                serialization: VehicleListGetSerialization
            },
        })
    );
}