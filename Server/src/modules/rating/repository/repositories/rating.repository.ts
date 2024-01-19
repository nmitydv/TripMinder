import { Injectable } from "@nestjs/common";
import { DatabaseMongoUUIDRepositoryAbstract } from "src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract";
import { DatabaseModel } from "src/common/database/decorators/database.decorator";
import { Model } from "mongoose";
import { RatingDoc, RatingEntity } from "../entities/rating.entity";




@Injectable()
export class RatingRepository extends DatabaseMongoUUIDRepositoryAbstract<
    RatingEntity,
    RatingDoc
> {
    constructor(
        @DatabaseModel(RatingEntity.name)
        private readonly RatingModel: Model<RatingEntity>
    ) {
        super(RatingModel);
    }
}