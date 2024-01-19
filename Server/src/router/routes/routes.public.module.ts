import { Module } from '@nestjs/common';
import { UserPublicController } from "../../modules/user/controllers/user.public.controller";
import { UserModule } from "../../modules/user/user.module";
import { AuthModule } from "../../common/auth/auth.module";
import { DriverController } from 'src/modules/driver/controller/driver.controller';
import { DriverModule } from 'src/modules/driver/driver.module';
import { VehicleModule } from 'src/modules/vehicle/vehicle.module';
// import { AuthModule } from 'src/common/auth/auth.module';
// import { RoleModule } from 'src/modules/role/role.module';
// import { UserPublicController } from 'src/modules/user/controllers/user.public.controller';
// import { UserModule } from 'src/modules/user/user.module';

// @Module({
//     controllers: [UserPublicController],
//     providers: [],
//     exports: [],
//     imports: [UserModule, AuthModule, RoleModule],
// })
// export class RoutesPublicModule {}

@Module({
    controllers: [UserPublicController],
    providers: [],
    exports: [],
    imports: [UserModule, AuthModule,VehicleModule],
})
export class RoutesPublicModule {}
