import { faker } from "@faker-js/faker";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, MaxLength } from "class-validator";
import { BookingRequest, BookingStatus } from "../constant/booking.constant";
import { BookingGetSerialization } from "./booking.get.serialization";




export class BookingListGetSerialization extends OmitType(BookingGetSerialization, [
    'userId',
    'vehicleDriverId',
    'pickupLocation',
    'droplocation',
    'startDate',
    'endDate',
    'price',
    'bookingStatus',
    'bookingRequest',
    'createdAt',
    'updatedAt',
] as const)  {
    

    @Exclude()
    createdAt : Date;
    
    @Exclude()
    updatedAt : Date;

}