import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
    UserDoc,
    UserEntity,
} from 'src/modules/user/repository/entities/user.entity';

export const GetUser = createParamDecorator(
    (returnPlain: boolean, ctx: ExecutionContext): UserDoc | UserEntity => {
        const { user } = ctx.switchToHttp().getRequest();
        return returnPlain ? user.toObject() : user;
    }
);
