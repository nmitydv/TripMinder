import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsEmail,
    MaxLength,
    MinLength,
    IsEnum,
} from 'class-validator';
import { UserRoles } from '../constants/user.doc.constant';

export class UserUpdateDto {
    @ApiProperty({
        example: faker.internet.userName(),
        required: true,
    })
    @MaxLength(100)
    @Type(() => String)
    readonly name: string;


    @ApiProperty({
        example: faker.address.city(),
        required: true,
    })
    @MinLength(1)
    @MaxLength(100)
    @Type(() => String)
    readonly location: string;

    @ApiProperty({
        example: "male",
        required: true,
    })
    @MinLength(1)
    @MaxLength(10)
    @Type(() => String)
    readonly gender: string;

    @ApiProperty({
        example: faker.phone.number('62812#########'),
        required: true,
    })
    @MinLength(10)
    @MaxLength(14)
    @Type(() => String)
    readonly mobileNumber?: string;

    @ApiProperty({
        example:faker.random.numeric(2),
        required: true,
    })
    @IsNotEmpty()
    readonly age: number;

    @ApiProperty({
        example: faker.internet.url(),
        required: true,
    })
    @Type(() => String)
    readonly profilePicture: string;

}
