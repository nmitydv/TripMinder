import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DATABASE_CONNECTION_NAME } from "src/common/database/constants/database.constant";
import { RatingRepository } from "./repositories/rating.repository";
import { RatingEntity, RatingSchema } from "./entities/rating.entity";

@Module({
    providers: [RatingRepository],
    exports: [RatingRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: RatingEntity.name,
                    schema: RatingSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class RatingRepositoryModule {}
