import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { CallbackWithoutResultAndOptionalError, Document } from "mongoose";
import { DatabaseMongoUUIDEntityAbstract } from "src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract";
import { DatabaseEntity } from "src/common/database/decorators/database.decorator";
import { UserEntity } from "src/modules/user/repository/entities/user.entity";



export const RatingDatabaseName = 'rating';


@DatabaseEntity({ collection: RatingDatabaseName })
export class RatingEntity extends DatabaseMongoUUIDEntityAbstract{

    @Prop({
        required: true,
        index: true,
        type: Number,
        // maxlength: 100,
    })
    rating: number;
    
    @Prop({
        required: true,
        index: true,
        type: String,
        ref: UserEntity.name
    })
    userId: string;    

    @Prop({
        required: true,
        index: true,
        type: String,
        ref: UserEntity.name
    })
    vehicleDriverId: string;

    @Prop({
        required: true,
        index: true,
        type: String,
        unique: true,
        ref: UserEntity.name
    })
    bookingId: string;
    
    @Prop({
        required: false,
        type: String,
        maxlength: 200,
    })
    comment: string;
   
    
}

export const RatingSchema = SchemaFactory.createForClass(RatingEntity);

export type RatingDoc = RatingEntity & Document;


RatingSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    this.comment = this.comment.toLowerCase();
    next();
});
