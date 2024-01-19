import { Injectable } from "@nestjs/common";
import { DatabaseMongoUUIDRepositoryAbstract } from "src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract";
import { DatabaseModel } from "src/common/database/decorators/database.decorator";
import { Model } from "mongoose";
import { BookingDoc, BookingEntity } from "../entities/booking.entity";
import { IDatabaseFindAllOptions } from "src/common/database/interfaces/database.interface";
import { BookingStatus } from "../../constant/booking.constant";




@Injectable()
export class BookingRepository extends DatabaseMongoUUIDRepositoryAbstract<
    BookingEntity,
    BookingDoc
> {
//   findOneBookingById(bookingId: string) {
//     throw new Error('Method not implemented.');
//   }
    bookingModel: any;
    constructor(
        @DatabaseModel(BookingEntity.name)
        private readonly driverModel: Model<BookingEntity>
    ) {
        super(driverModel);
    }

   

}