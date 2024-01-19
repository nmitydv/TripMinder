import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';
import { UserGetSerialization } from './user.get.serialization';

export class UserListSerialization extends OmitType(UserGetSerialization, [
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
    readonly createdAt?: Date;

    @Exclude()
    readonly updatedAt?: Date;
}
