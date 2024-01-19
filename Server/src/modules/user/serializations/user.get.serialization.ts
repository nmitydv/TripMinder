import { faker } from '@faker-js/faker';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';
import { UserRoles } from '../constants/user.doc.constant';

export class UserGetSerialization {
    @ApiProperty({ example: faker.datatype.uuid() })
    @Type(() => String)
    readonly _id: string;
    
    @ApiProperty({
        example: faker.internet.userName(),
    })
    readonly name: string;

    @ApiProperty({
        example: faker.internet.email(),
    })
    readonly email: string;

    @ApiProperty({
        example: faker.internet.email(),
    })
    readonly mobileNumber?: string;

    @ApiProperty({
        example: faker.address.city(),
        required: true,
    })
    readonly location: string;

    @ApiProperty({
        example: "male",
        required: true,
    })
    readonly gender: string;

    @ApiProperty({
        example: "User",
        required: true,
    })
    @IsEnum(UserRoles, {
        message: 'Invalid role. Must be one of Admin, User, Driver, or VehicleOwner',
      })
    readonly role: string;

    @ApiProperty({
        example:faker.random.numeric(2),
        required: true,
    })
    readonly age: number;

    @ApiProperty({
        example: faker.internet.url(),
        required: true,
    })
    @Type(() => String)
    readonly profilePicture: string;

  
    @ApiProperty({
        example: faker.date.recent(),
        required: true,
    })
    readonly createdAt: Date;

    @ApiProperty({
        example: faker.date.recent(),
        required: false,
    })
    readonly updatedAt: Date;

}
