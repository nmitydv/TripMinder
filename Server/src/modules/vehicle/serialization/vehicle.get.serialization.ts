
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";
import { VehicleStatus, VehicleType } from "../constants/vehicle.constant";




export class VehicleGetSerialization {


    @ApiProperty({
        example: faker.internet.domainName(),
        required: true,
    })
    @Type(() => String)
    readonly vehicleName: string;

    
    @ApiProperty({
        example: faker.random.alphaNumeric(8),
        required: true,
    })
    @Type(() => String)
    readonly vehicleNumber?: string;

    @ApiProperty({
        example: faker.random.numeric(4),
        required: false,
    })
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
    @Type(() => String)
    readonly ownerId?: string;

    @ApiProperty({
        example: faker.random.alphaNumeric(20),
        required: true,
    })
    @Type(() => String)
    readonly registrationNumber?: string;

    @ApiProperty({
        required: false,
    })
    @Type(() => String)
    readonly features?: string[];

    @ApiProperty({
        example: "10.5",
        required: false,
    })
    readonly kmPrice?: number;

    @ApiProperty({
        required: true,
    })
    availability: boolean;

    @ApiProperty({
        required: false,
        type: Date,
    })
    joiningDate: Date;

    @ApiProperty({
        required: true,
    })
    isActive: boolean;


  @ApiProperty({
        required: true,
        type:String,
    })

    @IsEnum(VehicleStatus,{
        message:'',
    })
    isApprove: string;
   
    @ApiProperty({
        required: false,
    })
    readonly description?: string;

   
    createdAt : Date;
    updatedAt : Date;

}