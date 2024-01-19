import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from 'src/common/auth/auth.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { FirebaseController } from 'src/common/firebase/controllers/firebase.controller';
import { FirebaseModule } from 'src/common/firebase/firebase.module';
import { MessageController } from 'src/common/message/controllers/message.controller';
import { SettingController } from 'src/common/setting/controllers/setting.controller';
import { HealthController } from 'src/health/controllers/health.controller';
import { HealthModule } from 'src/health/health.module';
import { BookingModule } from 'src/modules/booking/booking.module';
import { BookingController } from 'src/modules/booking/controller/booking.controller';
import { DriverController } from 'src/modules/driver/controller/driver.controller';
import { DriverModule } from 'src/modules/driver/driver.module';
import { RatingController } from 'src/modules/rating/controller/rating.controller';
import { RatingModule } from 'src/modules/rating/rating.module';
import { AdminController } from 'src/modules/user/controllers/admin.controller';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserModule } from 'src/modules/user/user.module';
import { VehicleController } from 'src/modules/vehicle/controllers/vehicle.controller';
import { VehicleModule } from 'src/modules/vehicle/vehicle.module';



@Module({
    controllers: [
        HealthController,
        SettingController,
        MessageController,
        UserController,
        DriverController,
        BookingController,
        VehicleController,
        AdminController,
        FirebaseController,
        RatingController,
    ],
    providers: [],
    exports: [],
    imports: [ 
        AwsModule,
        TerminusModule,
        AuthModule,
        HealthModule,
        UserModule,
        DriverModule,
        BookingModule,
        VehicleModule,
        FirebaseModule,
        RatingModule,
    ],
})
export class RoutesModule {}
