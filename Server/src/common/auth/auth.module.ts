import { UserModule } from './../../modules/user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/common/auth/services/auth.service';
import { FirebaseAuthStrategy } from './strategy/firebase-auth.strategy';
import { FirebaseService } from '../firebase/services/firebase.service';
import { RolesGuard } from './guards/role.guard';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from 'src/modules/user/services/user.service';

@Module({
    providers: [
        FirebaseAuthStrategy,
        FirebaseAuthGuard,
        RolesGuard,
        FirebaseService,
        AuthService,
        // {
        //     provide: APP_GUARD,
        //     useClass: FirebaseAuthGuard,
        // },
        // {
        //     provide: APP_GUARD,
        //     useClass: RolesGuard,
        // },
    ],
    exports: [AuthService],
    controllers: [],
    imports: [UserModule,PassportModule.register({ defaultStrategy: 'firebase-auth' })],
})
export class AuthModule {}
