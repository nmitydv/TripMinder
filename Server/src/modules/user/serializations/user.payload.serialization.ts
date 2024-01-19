import { faker } from '@faker-js/faker';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ENUM_AUTH_ACCESS_FOR } from 'src/common/auth/constants/auth.enum.constant';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';
import { UserGetSerialization } from 'src/modules/user/serializations/user.get.serialization';

export class UserPayloadSerialization extends OmitType(UserGetSerialization, [
    'name',
    'email',
    'mobileNumber',
    'location',
    'gender',
    'role',
    'age',
    'profilePicture',
    'createdAt',
    'updatedAt',
] as const) {
   

    @Exclude()
    readonly email: string;
    readonly name: string;

    @Exclude()
    readonly mobileNumber?: number;

    @Exclude()
    readonly createdAt: Date;

    @Exclude()
    readonly updatedAt: Date;
}
