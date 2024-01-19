import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from 'src/common/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { MigrationSettingSeed } from 'src/migration/seeds/migration.setting.seed';
import { MigrationUserSeed } from 'src/migration/seeds/migration.user.seed';
import { UserModule } from 'src/modules/user/user.module';
import { MigrationDriverSeed } from './seeds/migration.driver.seed';
import { MigrationVehicleSeed } from './seeds/migration.vehicle.seed';
import { MigrationBookingSeed } from './seeds/migration.booking.seed';
import { DriverModule } from 'src/modules/driver/driver.module';
import { VehicleModule } from 'src/modules/vehicle/vehicle.module';
import { BookingModule } from 'src/modules/booking/booking.module';

@Module({
    imports: [
        CommonModule,
        CommandModule,
        AuthModule,
        UserModule,
        DriverModule,
        VehicleModule,
        BookingModule,
    ],
    providers: [
        MigrationSettingSeed,
        MigrationUserSeed,
        MigrationDriverSeed,
        MigrationVehicleSeed,
        MigrationBookingSeed,

    ],
    exports: [],
})
export class MigrationModule {}
