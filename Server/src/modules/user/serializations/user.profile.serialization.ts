import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserGetSerialization } from './user.get.serialization';

export class UserProfileSerialization extends OmitType(UserGetSerialization, [
    'profilePicture',
] as const) {
    @Exclude()
    passwordAttempt: number;
}
