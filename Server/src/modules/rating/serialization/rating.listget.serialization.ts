import { OmitType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { RatingGetSerialization } from "./rating.get.serialization";


export class RatingListGetSerialization extends OmitType(RatingGetSerialization, [
    'userId',
    'vehicleDriverId',
    'bookingId',
    'rating',
    'comment',
    'createdAt',
    'updatedAt',
] as const)  {

    @Exclude()
    createdAt : Date;
    
    @Exclude()
    updatedAt : Date;

}