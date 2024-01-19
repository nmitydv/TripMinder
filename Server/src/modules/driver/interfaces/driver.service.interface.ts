import { IDatabaseCreateOptions, IDatabaseFindOneOptions } from "src/common/database/interfaces/database.interface";
import { CreateDriverDto } from "../dto/create.driver.dto";
import { DriverDoc } from "../repository/entities/driver.entity";





export interface IdriverService {


    createDriver(
        createDriverDto: CreateDriverDto,
        options?: IDatabaseCreateOptions
    ): Promise<DriverDoc>;


    findOne<T>(userId: string ,  options?: IDatabaseFindOneOptions): Promise<T>

    }