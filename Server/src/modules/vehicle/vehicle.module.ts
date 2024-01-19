import { Module } from '@nestjs/common';
import { VehicleService } from './services/vehicle.service';
import { VehicleController } from './controllers/vehicle.controller';
import { VehicleRepositoryModule } from './repository/vehicle.repository.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { VehicleRepository } from './repository/repositories/vehicle.repository';

@Module({
  imports:[VehicleRepositoryModule , AwsModule],
  controllers: [],
  providers: [VehicleService,VehicleRepositoryModule],
  exports:[VehicleService,VehicleRepositoryModule]

})
export class VehicleModule {}
