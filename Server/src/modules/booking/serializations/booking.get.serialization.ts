import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, MaxLength } from "class-validator";
import { BookingRequest, BookingStatus } from "../constant/booking.constant";




export class BookingGetSerialization {
    
    @ApiProperty({
        required: true,
    })
    @Type(() => String)
    readonly userId: string;

    @ApiProperty({
        required: true,
    })
    @MaxLength(100)
    @Type(() => String)
    readonly  vehicleDriverId: string;

    @ApiProperty({
        required: true,
    })
    @MaxLength(100)
    @Type(() => String)
    readonly  pickupLocation: string;

    @ApiProperty({
        required: true,
    })
    @MaxLength(100)
    @Type(() => String)
    readonly droplocation: string;

    @ApiProperty({
        required: true,
    })
    readonly startDate: Date;

    @ApiProperty({
        required: true,
    })
    readonly endDate: Date;

    @ApiProperty({
        required: false,
    })
    readonly price: number;

    @ApiProperty({
        required: true,
    })
    @IsEnum(BookingStatus, {
        message: 'Invalid Status. Must be one of pending , Completed or InRunnig',
      })
    @IsNotEmpty()
    readonly bookingStatus: string;

    @ApiProperty({
        required: true,
    })
    @IsEnum(BookingRequest, {
        message: 'Invalid Request. Must be one of Pending , Accept or Reject',
      })
    bookingRequest: string;

    createdAt : Date;
    updatedAt : Date;

}