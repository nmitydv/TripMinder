import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
} from 'class-validator';
import { AwsS3Serialization } from "src/common/aws/serializations/aws.s3.serialization";



export class CreateDriverDto {
 
    @ApiProperty({
        example: "three",
        required: true,
    })
    @MinLength(1)
    @MaxLength(10)
    @Type(() => String)
    readonly experience: string;

    @ApiProperty({
        example: "######-4a97-451a-ba5e-648d9ccceb4b",
        required: true,
    })
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly userId: string;

    @ApiProperty({
        example: "false",
    })
    readonly availability: boolean;


    @ApiProperty({
        example: faker.phone.number('62812#########'),
        required: true,
    })
    @MinLength(1)
    @MaxLength(20)
    @Type(() => String)
    readonly adharNumber?: string;

    @ApiProperty({
        example: faker.phone.number('62812#########'),
        required: true,
    })
    @MinLength(1)
    @MaxLength(20)
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
    @IsString()
    @MinLength(1)
    @MaxLength(200)
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
    dayWisePrice: number;

}
