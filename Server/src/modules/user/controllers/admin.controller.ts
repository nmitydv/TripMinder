import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
    IResponse,
} from 'src/common/response/interfaces/response.interface';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { adminService} from 'src/modules/user/services/admin.service';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { Response } from 'src/common/response/decorators/response.decorator';
import { AdminByIdDoc } from '../docs/user.admin.doc';
import { UserGetSerialization } from '../serializations/user.get.serialization';


@ApiTags('modules.admin')
@Controller({
    version: '1',
    path: '/admin',
})
export class AdminController {
    // vehicleService: any;
    constructor(
        private readonly adminService: adminService,
        private readonly logger : DebuggerService
      
    ) { }
    @AdminByIdDoc()
    @Response('admin.get', {
        serialization: UserGetSerialization,
      })
    @Get('get/Admin/:adminId')
    async getAdminById(@Param('adminId')adminId: string, @GetUser() user: UserDoc): Promise<IResponse> {
        this.logger.info2("AdminController.getAdminById() started");
        const admin = await this.adminService.getAdminById(adminId); // Assuming you have a method like this in AdminService
        this.logger.info2("AdminController.getAdminById() ended");

      return { data: admin.toObject() };
       
    }
}