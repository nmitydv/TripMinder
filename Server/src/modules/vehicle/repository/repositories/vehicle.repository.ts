import { Injectable } from "@nestjs/common";
import { DatabaseMongoUUIDRepositoryAbstract } from "src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract";
import { VehicleDoc, VehicleEntity } from "../entities/vehicle.entity";
import { DatabaseModel } from "src/common/database/decorators/database.decorator";
import { Model } from "mongoose";
import { IDatabaseFindAllOptions } from "src/common/database/interfaces/database.interface";



@Injectable()
export class VehicleRepository extends  DatabaseMongoUUIDRepositoryAbstract<VehicleEntity,VehicleDoc>{


constructor(@DatabaseModel(VehicleEntity.name)
private readonly vehicleModel: Model<VehicleEntity>
)
{
    super(vehicleModel);
}

async findAllVehicleByOwnerId(ownerId: string, options: IDatabaseFindAllOptions<any>): Promise<VehicleDoc[]> {
  return await this.findAll({ ownerId: ownerId }, options);
}

// async getvehicleActivity(vehicalId: string, options: IDatabaseFindAllOptions): Promise<VehicleDoc> {
  
//   return await this.findOne({ vehicalId: vehicalId }, options);
// }



}