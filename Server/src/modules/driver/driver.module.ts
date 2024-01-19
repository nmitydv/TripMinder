import { Module } from '@nestjs/common';
import { DriverService } from './services/driver.service';
import { DriverController } from './controller/driver.controller';
import { DriverRepositoryModule } from './repository/driver.repository.module';
import { AwsModule } from 'src/common/aws/aws.module';

@Module({
  imports:[DriverRepositoryModule , AwsModule],
  controllers: [],
  providers: [DriverService,DriverRepositoryModule,],
  exports:[DriverService,DriverRepositoryModule,]
})
export class DriverModule {}
