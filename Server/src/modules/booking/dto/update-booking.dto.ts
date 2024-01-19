import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Bookingcreatedto } from './booking.create.dto';
import { faker } from '@faker-js/faker';
import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { BookingRequest, BookingStatus } from '../constant/booking.constant';

export class UpdateBookingDto {


    @ApiProperty({
        example: faker.address.cityName(),
        required: true,
    })
    @MaxLength(100)
    @Type(() => String)
    readonly  pickupLocation: string;

    @ApiProperty({
        example: faker.address.cityName(),
        required: true,
    })
    @MaxLength(100)
    @Type(() => String)
    readonly droplocation: string;

    


    @ApiProperty({
        example: faker.date.recent(),
        required: true,
    })
    readonly startDate: Date;

    @ApiProperty({
        example: faker.date.future(),
        required: true,
    })
    readonly endDate: Date;

    @ApiProperty({
        example: faker.random.numeric(3),
        required: true,
    })
    // @MaxLength(100)
    readonly price: number;

    @ApiProperty({
        example: "Accept",
        required: true,
    })
    @IsEnum(BookingStatus, {
        message: 'Invalid Status. Must be one of pending , Completed or InRunnig',
      })
    @IsNotEmpty()
    readonly bookingStatus: string;

    @ApiProperty({
        example: "Approve",
        required: true,
    })
    @IsEnum(BookingRequest, {
        message: 'Invalid Request. Must be one of pending , Completed or InRunnig',
      })
    readonly bookingRequest: string;

    @ApiProperty({
        required: false,
    })
    totalKmDays: number;
  
}
