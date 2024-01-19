import { IDatabaseCreateOptions, IDatabaseFindAllOptions } from "src/common/database/interfaces/database.interface";
import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { VehicleDoc } from "../repository/entities/vehicle.entity";


export interface IvehicleService {


    createVehicle(
        createVehicleDto: CreateVehicleDto,
        options?: IDatabaseCreateOptions
    ): Promise<VehicleDoc>;

    // findOne<T>(userId: string ,  options?: IDatabaseFindOneOptions): Promise<T>
     findVehiclesByOwnerId<VehicleDoc>(ownerId: string,options?: IDatabaseFindAllOptions ): Promise<VehicleDoc[]>
    }