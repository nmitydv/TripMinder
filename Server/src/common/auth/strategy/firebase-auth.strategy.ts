import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
// import  from 'firebase-admin';
import * as firebase from 'firebase-admin';
import { FirebaseService } from 'src/common/firebase/services/firebase.service';
import { UserService } from 'src/modules/user/services/user.service';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';


@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy,'firebase-auth') {

    constructor(private readonly firebaseService: FirebaseService, private readonly userService : UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        // this.defaultApp = firebase.initializeApp();
    }

    async validate(token: string) {
        const firebaseUser: any = await (await this.firebaseService.GetFirebaseAdmin()).auth()
            .verifyIdToken(token, true)
            .catch((err) => {
                console.log(err);

                throw new UnauthorizedException(err.message);
            });

        if (!firebaseUser) {
            throw new UnauthorizedException();
        }
        const user:UserDoc = await this.userService.findOne({email : firebaseUser.email});
        if (!user) {
            throw new UnauthorizedException();
        }
        return {...firebaseUser,...user.toObject()};
    }
}
