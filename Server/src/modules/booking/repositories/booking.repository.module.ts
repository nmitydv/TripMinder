import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DATABASE_CONNECTION_NAME } from "src/common/database/constants/database.constant";
import { BookingRepository } from "./repository/booking.repository";
import { BookingEntity, BookingSchema } from "./entities/booking.entity";




@Module({
    providers: [BookingRepository],
    exports: [BookingRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: BookingEntity.name,
                    schema: BookingSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class BookingRepositoryModule {}
