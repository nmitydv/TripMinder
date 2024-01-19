import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MaxLength,
    MinLength,
    IsUUID,
    IsOptional,
    ValidateIf,
    IsEnum,
} from 'class-validator';
import { IsPasswordStrong } from 'src/common/request/validations/request.is-password-strong.validation';
import { MobileNumberAllowed } from 'src/common/request/validations/request.mobile-number-allowed.validation';
import { UserRoles } from '../constants/user.doc.constant';

export class UserCreateDto {
    @ApiProperty({
        example: faker.internet.userName(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly name: string;

    @ApiProperty({
        example: faker.internet.email(),
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly email: string;

    @ApiProperty({
        example: faker.address.city(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(100)
    @Type(() => String)
    readonly location: string;

    @ApiProperty({
        example: "male",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(10)
    @Type(() => String)
    readonly gender: string;

    @ApiProperty({
        example: faker.phone.number('62812#########'),
        required: true,
    })
    @IsString()
    @MinLength(10)
    @MaxLength(14)
    @Type(() => String)
    readonly mobileNumber?: string;

    @ApiProperty({
        example: "User",
        required: true,
    })
    @IsEnum(UserRoles, {
        message: 'Invalid role. Must be one of Admin, User, Driver, or VehicleOwner',
      })
    @IsNotEmpty()
    readonly role: string;

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
    @IsNotEmpty()
    @Type(() => String)
    readonly profilePicture: string;

}
