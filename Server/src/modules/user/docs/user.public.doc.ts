import { applyDecorators, HttpStatus } from '@nestjs/common';
import { Doc } from 'src/common/doc/decorators/doc.decorator';
import { UserGetSerialization } from '../serializations/user.get.serialization';

export function UserSignUpDoc(): MethodDecorator {
    return applyDecorators(
        Doc<UserGetSerialization>('user.signUp', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.CREATED,
            },
        })
    );
}

export function UserDeleteSelfDoc(): MethodDecorator {
    return applyDecorators(
        Doc<void>('user.deleteSelf', {
            auth: {
                jwtAccessToken: true,
            },
        })
    );
}

export function UserSignInDoc(): MethodDecorator {
    return applyDecorators(
        Doc<UserGetSerialization>('user.signIn', {
            auth: {
                jwtAccessToken: true,

            },
            response: {
                httpStatus: HttpStatus.OK,
            },
        })
    );
}
