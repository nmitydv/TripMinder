import { OmitType } from "@nestjs/swagger";
import { VehicleGetSerialization } from "./vehicle.get.serialization";
import { Exclude } from "class-transformer";

export class VehicleListGetSerialization extends OmitType(VehicleGetSerialization, [
    'vehicleName',
    'vehicleNumber',
    'modelNumber',
    'vehiclePictures',
    'numberPlatePic',
    'vehicleType',
    'seaters',
    'ownerId',
    'registrationNumber',
    'features',
    'kmPrice',
    'availability',
    'description',
    'joiningDate',
    'isActive',
    'isApprove',
    'createdAt',
    'updatedAt',
] as const)  {

    @Exclude()
    createdAt : Date;
    
    @Exclude()
    updatedAt : Date;

}