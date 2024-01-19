import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { VehicleType } from "../constants/vehicle.constant";

export class UpdateVehicleDto {

    @ApiProperty({
        example: faker.internet.domainName(),
        required: true,
    })
    @IsString()
    @MaxLength(100)
    @Type(() => String)
    readonly vehicleName: string;

    
    @ApiProperty({
        example: faker.random.alphaNumeric(8),
        required: true,
    })
    @MinLength(1)
    @MaxLength(20)
    @Type(() => String)
    readonly vehicleNumber?: string;

    @ApiProperty({
        example: faker.random.numeric(4),
        required: false,
    })
    @MinLength(1)
    @MaxLength(20)
    @Type(() => String)
    readonly modelNumber?: string;

    @ApiProperty({
        example: faker.internet.url(),
        required: false,
    })
    readonly vehiclePictures?: string[];
    
    @ApiProperty({
        example: faker.internet.url(),
        required: true,
    })
    @Type(() => String)
    readonly numberPlatePic?: string;

    @ApiProperty({
        example: "Four",
        required: false,
    })
    @IsEnum(VehicleType, {
        message: 'Invalid VehicleType . Must be one of Two,Three,Four,Six,Eight',
      })
    readonly vehicleType: string;

    @ApiProperty({
        example:faker.random.numeric(2),
        required: false,
    })
    readonly seaters: number;

    @ApiProperty({
        example: faker.random.alphaNumeric(20),
        required: true,
    })
    @MaxLength(50)
    @Type(() => String)
    readonly ownerId?: string;

    @ApiProperty({
        example: faker.random.alphaNumeric(20),
        required: true,
    })
    @IsNotEmpty()
    @MaxLength(50)
    @Type(() => String)
    readonly registrationNumber?: string;

    @ApiProperty({
        example: ["feature 1","feature 2","feature 3"],
        required: false,
    })
    readonly features?: string[];

    @ApiProperty({
        example: "10.5",
        required: true,
    })
    @IsNumber()
    @Min(0.1) 
    @Max(100.0) 
    readonly kmPrice?: number;

    @ApiProperty({
        example: faker.random.alphaNumeric(20),
        required: true,
    })
    @Type(() => String)
    readonly description?: string;
  

}
