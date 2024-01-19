import { Module } from '@nestjs/common';
import { UserRepositoryModule } from 'src/modules/user/repository/user.repository.module';
import { UserService } from './services/user.service';
import { VehicleModule } from '../vehicle/vehicle.module';
import { adminService } from './services/admin.service';
import { AwsModule } from 'src/common/aws/aws.module';
import { DriverModule } from '../driver/driver.module';
import { FirebaseModule } from 'src/common/firebase/firebase.module';

@Module({
    imports: [UserRepositoryModule ,VehicleModule,AwsModule,DriverModule],
    exports: [UserService,adminService],
    providers: [UserService,adminService],
})
export class UserModule {}
