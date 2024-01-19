import { Injectable } from "@nestjs/common";
import { DatabaseMongoUUIDRepositoryAbstract } from "src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract";
import { DriverDoc, DriverEntity } from "../entities/driver.entity";
import { DatabaseModel } from "src/common/database/decorators/database.decorator";
import { Model } from "mongoose";




@Injectable()
export class DriverRepository extends DatabaseMongoUUIDRepositoryAbstract<
    DriverEntity,
    DriverDoc
> {
    constructor(
        @DatabaseModel(DriverEntity.name)
        private readonly driverModel: Model<DriverEntity>
    ) {
        super(driverModel);
    }
}