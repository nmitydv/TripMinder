import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { BookingRequest, BookingStatus } from '../../constant/booking.constant';
import mongoose, { Document } from 'mongoose';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';

export const BookingDatabaseName = 'booking';

@DatabaseEntity({ collection: BookingDatabaseName })
export class BookingEntity extends DatabaseMongoUUIDEntityAbstract{
    @Prop({
        required: true,
        index: true,
        unique: false,
        type: String,
        maxlength: 100,
        ref: UserEntity.name,
    })
    userId: string;

    
    @Prop({
        required: true,
        type: String,
        maxlength: 100,
    })
    vehicleDriverId: string;
    
    @Prop({
        required: true,
        type: String,
        maxlength: 100,
    })
    pickupLocation: string;


    @Prop({
        required: true,
        type: String,
        maxlength: 100,
    })
    droplocation: string;

    @Prop({
        required: true,
        index: true,
        maxlength: 100,
    })
    startDate: Date;

    @Prop({
        required: true,
        index: true,
        maxlength: 100,
    })
    endDate: Date;
   
    @Prop({
        required: false,
    })
    price: number;

    @Prop({
        example: "Pending",
        required: true,
    })
    @IsEnum(BookingStatus, {
        message: 'Invalid Status. Must be one of Pending , InRunning or Completed',
      })
    @IsNotEmpty()
    bookingStatus: string;

    @Prop({
        required: true,
    })
    @IsEnum(BookingRequest, {
        message: 'Invalid Request. Must be one of Pending , Accept or Reject',
      })
    bookingRequest: string;

    @Prop({
        required: false,
    })
    totalKmDays: number;
   
}
export const BookingSchema = SchemaFactory.createForClass(BookingEntity);
export type BookingDoc = BookingEntity & Document;
