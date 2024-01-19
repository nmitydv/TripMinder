import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    MaxLength,
    IsEnum,
} from 'class-validator'; 

export class Bookingcreatedto {
    @ApiProperty({
        example: faker.random.alphaNumeric(15),
        required: true,
    })
    @MaxLength(100)
    @Type(() => String)
    readonly userId: string;

    @ApiProperty({
        example: faker.random.alphaNumeric(15),
        required: true,
    })
    @MaxLength(100)
    @Type(() => String)
    readonly  vehicleDriverId: string;

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
    readonly dropLocation: string;

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


    
}
