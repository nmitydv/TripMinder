import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DriverEntity, DriverSchema } from "./entities/driver.entity";
import { DATABASE_CONNECTION_NAME } from "src/common/database/constants/database.constant";
import { DriverRepository } from "./repositories/driver.repository";



@Module({
    providers: [DriverRepository],
    exports: [DriverRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: DriverEntity.name,
                    schema: DriverSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class DriverRepositoryModule {}
