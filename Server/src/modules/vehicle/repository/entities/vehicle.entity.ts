import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import mongoose, { CallbackWithoutResultAndOptionalError,Document } from "mongoose";
import { DatabaseMongoUUIDEntityAbstract } from "src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract";
import { DatabaseEntity } from "src/common/database/decorators/database.decorator";
import { VehicleStatus, VehicleType } from "../../constants/vehicle.constant";



export const VehicleDatabaseName = 'vehicle';

@DatabaseEntity({ collection: VehicleDatabaseName })
export class VehicleEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        index: true,
        unique: false,
        type: String,
        maxlength: 100, 
    })
    vehicleName: string;

    
    @Prop({
        required: true,
        index: true,
        unique: true,
        type: String,
        maxlength: 25,
    })
    vehicleNumber?: string;

    @Prop({
        required: true,
        index: true,
        type: String,
        maxlength: 25,
    })
    modelNumber?: string;

    @Prop({
        required: false,
        index: true,
        type: String,
    })
    @IsEnum(VehicleType,{
        message: 'Invalid VehicleType . Must be one of Two,Three,Four,Six,Eight',
        })
    vehicleType: string;

    @Prop({
        required: true,
        maxlength: 20,
    })
    seaters: number;

    @Prop({
        required: true,
        type: String,
    })
    @IsNotEmpty()
    ownerId: string;

    @Prop({
        required: true,
        unique: true,
        type: String,
        maxlength: 50,
    })
    registrationNumber?: string;

    
    @Prop({
        required: false,
        type:Array<string>,
    })
    features: string[];
    
    @Prop({
        required: true,
    })
    availability: boolean;

    @Prop({
        required: false,
        type: String,
        maxlength: 200,
    })
    @IsNumber() 
    @Min(0.1) 
    @Max(100.0) 
    kmPrice: number;

    @Prop({
        required: true,
    })
   
    isActive: boolean;

    @Prop({
        required: true,
        type: Date,
    })
    joiningDate: Date;

    @Prop({
        required: true,
        type:String,
    })

    @IsEnum(VehicleStatus,{
        message:'',
    })
    isApprove: string;

    @Prop({
        required: true,
        type:Array<string>,
    })
    vehiclePictures: string[];

    @Prop({
        required: true,
        type: String,
    })
    numberPlatePic: string;
   
    @Prop({
        required: false,
        type:String,
    })
    description: string;

    @Prop({
        required: false,
        type: Number,
    })
    rating: number;
  
}

export const VehicleSchema = SchemaFactory.createForClass(VehicleEntity);

export type VehicleDoc = VehicleEntity & Document;
// export const Vehicle = mongoose.model('vehicle', VehicleSchema);

VehicleSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    // this.email = this.email.toLowerCase();
    this.vehicleName = this.vehicleName.toLowerCase();

    next();
});
