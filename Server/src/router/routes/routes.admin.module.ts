import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { FirebaseModule } from 'src/common/firebase/firebase.module';
import { SettingAdminController } from 'src/common/setting/controllers/setting.admin.controller';
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
    controllers: [
        SettingAdminController,
        UserAdminController,
    ],
    providers: [],
    exports: [],
    imports: [
        AuthModule,
        UserModule,
        FirebaseModule,
    ],
})
export class RoutesAdminModule {}
