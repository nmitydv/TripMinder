import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    AuthJwtAccessProtected,
    AuthJwtAccessRoleProtected,
    AuthJwtPayload,
    AuthJwtRefreshProtected,
    AuthJwtToken,
} from 'src/common/auth/decorators/auth.jwt.decorator';
import { AuthService } from 'src/common/auth/services/auth.service';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';
import { AwsS3Service } from 'src/common/aws/services/aws.s3.service';
import { IDatabaseFindOneOptions } from 'src/common/database/interfaces/database.interface';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { UploadFileSingle } from 'src/common/file/decorators/file.decorator';
import { IFile } from 'src/common/file/interfaces/file.interface';
import { FileRequiredPipe } from 'src/common/file/pipes/file.required.pipe';
import { FileSizeImagePipe } from 'src/common/file/pipes/file.size.pipe';
import { FileTypeImagePipe } from 'src/common/file/pipes/file.type.pipe';
import { ENUM_LOGGER_ACTION } from 'src/common/logger/constants/logger.enum.constant';
import { Logger } from 'src/common/logger/decorators/logger.decorator';
import { Response } from 'src/common/response/decorators/response.decorator';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { SettingService } from 'src/common/setting/services/setting.service';
import { ENUM_USER_STATUS_CODE_ERROR } from 'src/modules/user/constants/user.status-code.constant';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import {
    FindUserByIdDoc,
    UserChangePasswordDoc,
    UserGrantPermissionDoc,
    UserInfoDoc,
    UserLoginDoc,
    UserNotificationSaveDoc,
    UserProfileDoc,
    UserRefreshDoc,
    UserUpdateByIdDoc,
    UserUploadProfileDoc,
} from 'src/modules/user/docs/user.doc';

import {    IUserDoc,
} from 'src/modules/user/interfaces/user.interface';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import { UserInfoSerialization } from 'src/modules/user/serializations/user.info.serialization';
import { UserPayloadSerialization } from 'src/modules/user/serializations/user.payload.serialization';
import { UserProfileSerialization } from 'src/modules/user/serializations/user.profile.serialization';
import { UserService } from 'src/modules/user/services/user.service';
import { UserUpdateDto } from '../dtos/user.update.dto';
import { UserUpdateDoc } from '../docs/user.admin.doc';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { UserGetSerialization } from '../serializations/user.get.serialization';
import { ENUM_AUTH_ACCESS_FOR } from 'src/common/auth/constants/auth.enum.constant';

@ApiTags('modules.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly awsService: AwsS3Service,
        private readonly authService: AuthService,
        private readonly settingService: SettingService,
        private readonly logger : DebuggerService,
    ) {}





    // @UserInfoDoc()
    // @Response('user.info', { serialization: UserInfoSerialization })
    // @AuthJwtAccessProtected()
    // @Get('/info')
    // async info(
    //     @AuthJwtPayload() user: UserPayloadSerialization
    // ): Promise<IResponse> {
    //     return { data: user };
    // }


    // @UserProfileDoc()
    // @Response('user.profile', {
    //     serialization: UserProfileSerialization,
    // })
    // @UserProfileGuard()
    // @AuthJwtAccessProtected()
    // @Get('/profile')
    // async profile(@GetUser() user: UserDoc): Promise<IResponse> {
    //     this.logger.info2("UserController.profile() started");
    //     const userWithRole: IUserDoc = await this.userService.findOne(
    //       user
    //     );
    //     this.logger.info2("UserController.profile() ended");
    //     return { data: userWithRole.toObject() };
    // }

    // @UserUploadProfileDoc()
    // @Response('user.upload')
    // @UserProfileGuard()
    // @AuthJwtAccessProtected()
    // @UploadFileSingle('file')
    // @HttpCode(HttpStatus.OK)
    // @Post('/profile/upload')
    // async upload(
    //     @GetUser() usr: IUserDoc,
    //     @UploadedFile(FileRequiredPipe, FileSizeImagePipe, FileTypeImagePipe)
    //     file: IFile
    // ): Promise<void> {
    //     this.logger.info2("UserController.upload() started");
    //     const user: UserDoc = await this.userService.findOneById(usr._id);

    //     const filename: string = file.originalname;
    //     const content: Buffer = file.buffer;
    //     const mime: string = filename
    //         .substring(filename.lastIndexOf('.') + 1, filename.length)
    //         .toUpperCase();

    //     const path = await this.userService.createPhotoFilename();
    //     this.logger.info2("UserController.upload() ended");
    //     try {
    //         // const aws: AwsS3Serialization =
    //         //     await this.awsService.putItemInBucket(
    //         //         `${path.filename}.${mime}`,
    //         //         content,
    //         //         {
    //         //             path: `${path.path}/${user._id}`,
    //         //         }
    //         //     );
    //         // await this.userService.updatePhoto(user, aws);
    //     } catch (err: any) {
    //         throw new InternalServerErrorException({
    //             statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
    //             message: 'http.serverError.internalServerError',
    //             _error: err.message,
    //         });
    //     }

    //     return;
    // }

    // @FindUserByIdDoc()
    // @Response('user.get', {
    //     serialization: UserGetSerialization,
    //   })
    // @Get('/User/Id/:userId')
    // async FindUserById(@Param('userId') userId: string, @Query() options?: IDatabaseFindOneOptions) {
    //     this.logger.info2("UserController.FindUserById() started");
    //   const user = await this.userService.findOneById(userId,options);
    //   if (user) {
    //     this.logger.info2("UserController.FindUserById() ended");
    //     return { data: user.toObject() };
    //   } else {
    //     throw new NotFoundException('User not found of this userId');
    //   }
    // }
    @UserUpdateByIdDoc()
    @Response('user.update', {
        serialization: UserGetSerialization,
      })
      @AuthJwtAccessRoleProtected([ENUM_AUTH_ACCESS_FOR.ADMIN,ENUM_AUTH_ACCESS_FOR.USER,ENUM_AUTH_ACCESS_FOR.VEHICLE_OWNER,ENUM_AUTH_ACCESS_FOR.DRIVER])
    @Put('/:userId')
    async updateUser(@Param('userId') userId: string,@Body() updateDto:UserUpdateDto) {
        this.logger.info2("UserController.updateUser() started");
      const user = await this.userService.updateUser(userId,updateDto);
      if (user) {
        this.logger.info2("UserController.updateUser() ended");
        return { data: user.toObject() };
      } else {
        throw new NotFoundException('User not found of this userId');
      }
    }
    @UserNotificationSaveDoc()
    @Response('user.save', {
        serialization: UserGetSerialization,
      })
      @AuthJwtAccessProtected()
    @Post('/:userId/:token')
    async SaveNotificationToken(@Param('userId') userId: string,@Param('token') token: string) {
        this.logger.info2("UserController.SaveNotificationToken() started");
      const user = await this.userService.SaveNotificationToken(userId,token);
      if (user) {
        this.logger.info2("UserController.SaveNotificationToken() ended");
        return { data: user.toObject() };
      } else {
        throw new NotFoundException('User not found of this userId');
      }
    }
}
