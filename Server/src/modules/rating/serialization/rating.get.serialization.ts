import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";

export class RatingGetSerialization {

    @ApiProperty({
        required: true,
        type: Number,
    })
    rating: number;
    
    @ApiProperty({
        required: true,
        type: String,
    })
    userId: string;    

    @ApiProperty({
        required: true,
        type: String,
    })
    vehicleDriverId: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    bookingId: string;
    
    @ApiProperty({
        required: false,
        type: String,
    })
    comment: string;
   
    createdAt : Date;
    updatedAt : Date;
    
}