import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DATABASE_CONNECTION_NAME } from "src/common/database/constants/database.constant";
import { VehicleRepository } from "./repositories/vehicle.repository";
import { VehicleEntity, VehicleSchema } from "./entities/vehicle.entity";



@Module({
    providers: [VehicleRepository],
    exports: [VehicleRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: VehicleEntity.name,
                    schema: VehicleSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class VehicleRepositoryModule {}
