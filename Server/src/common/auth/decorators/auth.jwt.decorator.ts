import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AUTH_ACCESS_FOR_META_KEY } from 'src/common/auth/constants/auth.constant';
import { ENUM_AUTH_ACCESS_FOR } from 'src/common/auth/constants/auth.enum.constant';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';
import { RolesGuard } from '../guards/role.guard';

export const AuthJwtPayload = createParamDecorator(
    (data: string, ctx: ExecutionContext): Record<string, any> => {
        const { user } = ctx.switchToHttp().getRequest();
        return data ? user[data] : user;
    }
);

export const AuthJwtToken = createParamDecorator(
    (data: string, ctx: ExecutionContext): string => {
        const { headers } = ctx.switchToHttp().getRequest();
        const { authorization } = headers;
        const authorizations: string[] = authorization.split(' ');

        return authorizations.length >= 2 ? authorizations[1] : undefined;
    }
);

export function AuthJwtAccessProtected(): MethodDecorator {
    return applyDecorators(UseGuards(FirebaseAuthGuard));
}

export function AuthJwtAccessRoleProtected(roles:string[]): MethodDecorator {
    // console.log("Access  AuthJwtAdminAccessProtected "+roles)
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(FirebaseAuthGuard),
        UseGuards(RolesGuard)
        );
}


export function AuthJwtUserAccessProtected(): MethodDecorator {
    return applyDecorators(
        SetMetadata(AUTH_ACCESS_FOR_META_KEY, [ENUM_AUTH_ACCESS_FOR.USER]),
        UseGuards(FirebaseAuthGuard),
        UseGuards(RolesGuard),
    );
}

export function AuthJwtAdminAccessProtected(): MethodDecorator {
    return applyDecorators(
        SetMetadata(AUTH_ACCESS_FOR_META_KEY, [ENUM_AUTH_ACCESS_FOR.ADMIN]),
        UseGuards(FirebaseAuthGuard),
        UseGuards(RolesGuard),
        );
}

export function AuthJwtRefreshProtected(): MethodDecorator {
    return applyDecorators(UseGuards(FirebaseAuthGuard));
}

export function AuthJwtDriverAccessProtected(): MethodDecorator {
    return applyDecorators(
        SetMetadata(AUTH_ACCESS_FOR_META_KEY, [ENUM_AUTH_ACCESS_FOR.DRIVER]),
        UseGuards(FirebaseAuthGuard),
        UseGuards(RolesGuard),
    );
}

export function AuthJwtVehicleOwnerAccessProtected(): MethodDecorator {
    return applyDecorators(
        SetMetadata(AUTH_ACCESS_FOR_META_KEY, [ENUM_AUTH_ACCESS_FOR.VEHICLE_OWNER]),
        UseGuards(FirebaseAuthGuard),
        UseGuards(RolesGuard),
    );
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);