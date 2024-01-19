import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { UserRoles } from '../../constants/user.doc.constant';
import { ApiProperty } from '@nestjs/swagger';

export const UserDatabaseName = 'users';

@DatabaseEntity({ collection: UserDatabaseName })
export class UserEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        index: true,
        trim: true,
        unique: false,
        type: String,
        maxlength: 100,
    })
    name: string;

    
    @Prop({
        required: true,
        unique: true,
        type: String,
        maxlength: 15,
    })
    mobileNumber?: string;
    
    @Prop({
        required: true,
        index: true,
        unique: true,
        trim: true,
        lowercase: true,
        type: String,
        maxlength: 100,
    })
    email: string;


    @Prop({
        required: true,
        index: true,
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 100,
    })
    location: string;

    @Prop({
        required: true,
        index: true,
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 10,
    })
    gender: string;

    @Prop({
        example: "User",
        type: String,
    })
    @IsEnum(UserRoles, {
        message: 'Invalid role. Must be one of admin, user, driver, or vehicleOwner',
      })
    role: string;

    @Prop({
        required: true,
    })
    age: number;

    @Prop({
        required: true,
        type: Date,
    })
    joiningDate: Date;

   
    @Prop({
        required: false,
        type: String,
    })
    profilePicture?: string;

    @Prop({
        required: true,
        index: true,
        type: Boolean,
    })
    isActive: boolean;

    @Prop({
        required: false,
        type: [String],
    })
    notificationTokens: string[];

}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

export type UserDoc = UserEntity & Document;

UserSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    this.email = this.email.toLowerCase();
    this.name = this.name.toLowerCase();

    next();
});
