import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly userServices: UserService) { }

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true; // No roles specified, access granted
        }

        const { user } = context.switchToHttp().getRequest();
        if (!user) {
            return false; // User not defined, access denied
        }

        // const dbUser: UserDoc = await this.userServices.findOne<any>({email:user.email});
        console.log(user);
        console.log(roles);
        // console.log(dbUser);
        // console.log(dbUser.role+"roles of User");
        return user.role && roles.includes(user.role);
    }
}
