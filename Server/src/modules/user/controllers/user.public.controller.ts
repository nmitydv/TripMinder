import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthJwtAccessProtected,
    AuthJwtPayload,
} from 'src/common/auth/decorators/auth.jwt.decorator';
import { AuthService } from 'src/common/auth/services/auth.service';
import { IDatabaseCreateOptions, IDatabaseFindOneOptions } from 'src/common/database/interfaces/database.interface';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { Response } from 'src/common/response/decorators/response.decorator';
import {
    UserDeleteSelfDoc,
    UserSignInDoc,
    UserSignUpDoc,
} from 'src/modules/user/docs/user.public.doc';

import { UserSignUpDto } from 'src/modules/user/dtos/user.sign-up.dto';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { UserCreateDto } from '../dtos/user.create.dto';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { UserGetSerialization } from '../serializations/user.get.serialization';

@ApiTags('modules.public.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserPublicController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly logger : DebuggerService
    ) {}

    @UserSignUpDoc()
    @Response('user.signUp', {
      serialization: UserGetSerialization,
    })
    @AuthJwtAccessProtected()
    @Post('/signUp')
    async create(
        @Body() createUserDto: UserCreateDto,
        @Query() options: IDatabaseCreateOptions,
      ) {
        this.logger.info2("UserPublicController.create() started");
        try {
          const user = await this.userService.create(createUserDto, options);
          this.logger.info2("UserPublicController.create() ended");
          return { data: user.toObject() };
        } catch (error) {
          // Handle any errors that occur during the process
          console.error(error);
          throw new BadRequestException('User creation failed'+ error);
        }
      }

    // @UserDeleteSelfDoc()
    // @Response('user.deleteSelf')
    // // @AuthJwtPublicAccessProtected()
    // @Delete('/delete')
    // async deleteSelf(@AuthJwtPayload('_id') _id: string): Promise<void> {
    //     try {
    //         const user: UserDoc = await this.userService.findOneById(_id);

    //         // await this.userService.inactive(user);
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             _error: err.message,
    //         });
    //     }

    //     return;
    // }
     
    @UserSignInDoc()
    @Response('user.signIn', {
      serialization: UserGetSerialization,
    })
    @AuthJwtAccessProtected()
    @Get('/signIn/:email')
    async SignIn(@Param('email') email: string, @Query() options?: IDatabaseFindOneOptions) {
      this.logger.info2("UserPublicController.SignIn() started");
      if (!email) {
        console.log("not found......")
        throw new NotFoundException('enter valid email');
      }
      const user = await this.userService.SignIn<any>(email, options);
     console.log(user+".............")
        console.log("yes found......")
        this.logger.info2("UserPublicController.SignIn() ended");
        return  user ;
      
    }

}
