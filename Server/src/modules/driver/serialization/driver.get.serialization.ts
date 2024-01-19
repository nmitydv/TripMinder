import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";
import { DriverStatus } from "../constant/driver.constant";



export class DriverGetSerialization {

    @ApiProperty({
        example: "three",
        required: true,
    })
    @Type(() => String)
    readonly experience: string;

    @ApiProperty({
        example: "4a9767-4a97-451a-ba5e-648d9ccceb4b",
        required: true,
    })
    @IsNotEmpty()
    @Type(() => String)
    readonly userId: string;

    @ApiProperty({
        example: "true",
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
        example: faker.random.numeric(2),
        required: false,
    })
    @Type(() => String)
    readonly vehicleType?: string;

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
    drivingLicence?: string;
     
    @ApiProperty({
        required: true,
    })
    @IsEnum(DriverStatus,{
        message:'',
    })
    isApproved: string;

    createdAt : Date;
    updatedAt : Date;
    
}