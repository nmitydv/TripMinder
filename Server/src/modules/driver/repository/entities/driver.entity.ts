import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum } from "class-validator";
import { CallbackWithoutResultAndOptionalError, Document } from "mongoose";
import { AwsS3Serialization } from "src/common/aws/serializations/aws.s3.serialization";
import { DatabaseMongoUUIDEntityAbstract } from "src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract";
import { DatabaseEntity } from "src/common/database/decorators/database.decorator";
import { DriverStatus } from "../../constant/driver.constant";
import { UserEntity } from "src/modules/user/repository/entities/user.entity";



export const DriverDatabaseName = 'driver';


@DatabaseEntity({ collection: DriverDatabaseName })
export class DriverEntity extends DatabaseMongoUUIDEntityAbstract{

    @Prop({
        required: true,
        index: true,
        type: Number,
        // maxlength: 100,
    })
    experience: number;
    
    @Prop({
        required: true,
        index: true,
        unique: true,
        type: String,
        maxlength: 100,
        ref: UserEntity.name
    })
    userId: string;
    
    @Prop({
        required: true,
        index: true,
    })
    availability: boolean;
    
    @Prop({
        required: true,
    })
    drivingLicence?: string;

    

    @Prop({
        required: true,
        unique: true,
        type: String,
        maxlength: 30,
    })
    licenseNumber?: string;
    
    @Prop({
        required: true,
        index: true,
        type: String,
    })
    @IsEnum(DriverStatus,{
        message:'',
    })
    isApproved: string;
    
    @Prop({
        required: true,
        index: true,
        unique: true,
        type: String,
        maxlength: 100,
    })
    adharNumber: string;


    @Prop({
        required: true,
        index: true,
        type: Array<number>,
    })
    vehiclesType: number[];

    @Prop({
        required: false,
        type: String,
        maxlength: 200,
    })
    description: string;
   
    @Prop({
        required: true,
    })
    dayWisePrice: number;

    @Prop({
        required: false,
        type: Number,
    })
    rating: number;
    
}

export const DriverSchema = SchemaFactory.createForClass(DriverEntity);

export type DriverDoc = DriverEntity & Document;


DriverSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    this.description = this.description.toLowerCase();

    next();
});
