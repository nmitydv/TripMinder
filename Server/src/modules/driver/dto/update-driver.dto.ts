import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDriverDto } from './create.driver.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { faker } from '@faker-js/faker';

export class UpdateDriverDto {
    @ApiProperty({
        example: "three",
        required: true,
    })
    @Type(() => String)
    readonly experience: string;

    @ApiProperty({
        required: false,
    })
    readonly availability: boolean;


    @ApiProperty({
        example: faker.phone.number('62812#########'),
        required: true,
    })
    @Type(() => String)
    readonly adharNumber?: string;

    @ApiProperty({
        example: faker.phone.number('62812#########'),
        required: true,
    })
    @Type(() => String)
    readonly licenseNumber?: string;

    @ApiProperty({
        required: false,
    })
    readonly vehicleType: number[];

    @ApiProperty({
        example: faker.definitions.vehicle,
        required: false,
    })
    @Type(() => String)
    readonly description: string;

    @ApiProperty({
        example: faker.internet.url(),
        required: true,
    })
    @IsString()
    drivingLicence?: string;

    @ApiProperty({
        required: true,
    })
    dayWisePrice: number;
}
