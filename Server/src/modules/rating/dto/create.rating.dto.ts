import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';


export class CreateRatingDto {

    @ApiProperty({
        required: false,
        type: String,
    })
    ratingId: string;
 
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

}
