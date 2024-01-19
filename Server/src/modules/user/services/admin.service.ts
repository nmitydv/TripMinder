import { Injectable,NotFoundException,InternalServerErrorException } from '@nestjs/common';
import {
    
    IDatabaseFindOneOptions,
    
} from 'src/common/database/interfaces/database.interface';

import { UserRepository } from 'src/modules/user/repository/repositories/user.repository';

import { ConfigService } from '@nestjs/config';
import { UserDoc } from '../repository/entities/user.entity';


@Injectable()
export class adminService {
    private readonly uploadPath: string;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
        
    ) {
        this.uploadPath = this.configService.get<string>('user.uploadPath');
    }

    

    async getAdminById<T>(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<UserDoc> {
        try {
            const user = await this.userRepository.findOne<UserDoc>({_id:_id}, options);
      
            if (!user) {
              throw new NotFoundException(`Admin with ID ${_id} not found`);
            }
      
            return user;
          } catch (error) {
            // Handle database errors, e.g., connection issues or query problems
            throw new InternalServerErrorException(`Failed to retrieve admin: ${error.message}`);
          }
        }
        // return this.userRepository.findOneById<T>(_id, options);
        
    
}
