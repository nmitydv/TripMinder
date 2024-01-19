import { OmitType } from "@nestjs/swagger";
import { DriverGetSerialization } from "./driver.get.serialization";
import { Exclude } from "class-transformer";


export class DriverListGetSerialization extends OmitType(DriverGetSerialization, [
    'userId',
    'experience',
    'availability',
    'adharNumber',
    'licenseNumber',
    'vehicleType',
    'description',
    'drivingLicence',
    'isApproved',
    'createdAt',
    'updatedAt',
] as const)  {

    @Exclude()
    createdAt : Date;
    
    @Exclude()
    updatedAt : Date;

}