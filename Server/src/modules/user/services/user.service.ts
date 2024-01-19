import { Injectable,NotFoundException,BadRequestException } from '@nestjs/common';
import { IUserService } from 'src/modules/user/interfaces/user.service.interface';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseOptions,
    IDatabaseManyOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    UserDoc,
    UserEntity,
} from 'src/modules/user/repository/entities/user.entity';
import { UserRepository } from 'src/modules/user/repository/repositories/user.repository';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { ConfigService } from '@nestjs/config';
import { HelperStringService } from 'src/common/helper/services/helper.string.service';
import { UserCreateDto} from 'src/modules/user/dtos/user.create.dto';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';
import { UserUpdateNameDto } from 'src/modules/user/dtos/user.update-name.dto';
import { UserPayloadSerialization } from 'src/modules/user/serializations/user.payload.serialization';
import { plainToInstance } from 'class-transformer';
import { IUserDoc, IUserEntity } from '../interfaces/user.interface';
import { VehicleRepository } from 'src/modules/vehicle/repository/repositories/vehicle.repository';
import { VehicleDoc, VehicleEntity } from 'src/modules/vehicle/repository/entities/vehicle.entity';

// private readonly userApprove: Approve<UserDoc>
import { AwsUploadService } from 'src/common/aws/services/aws.s3.serviceUpload';
import { UserUpdateDto } from '../dtos/user.update.dto';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { DriverRepository } from 'src/modules/driver/repository/repositories/driver.repository';
import { DriverDoc } from 'src/modules/driver/repository/entities/driver.entity';

@Injectable()
export class UserService implements IUserService {
    private readonly uploadPath: string;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly helperDateService: HelperDateService,
        private readonly helperStringService: HelperStringService,
        private readonly configService: ConfigService,
        private readonly vehicleRepository: VehicleRepository,
        private readonly awsUploadService: AwsUploadService,
        private readonly logger : DebuggerService,
        private readonly driverRepository: DriverRepository,
    ) {
        this.uploadPath = this.configService.get<string>('user.uploadPath');
    }

    async findAll(find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<UserEntity[]> {
        this.logger.info2("UserService.create() started");
        this.logger.info2("UserService.create() ended");
        return  this.userRepository.findAll<UserEntity>(find, {
            ...options,
            join: true,
          });;
    }



    async findOneById<UserDoc>(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<UserDoc> {
        this.logger.info2("UserService.findOneById() started");
        this.logger.info2("UserService.findOneById() ended");
        return this.userRepository.findOne<UserDoc>({_id:_id}, options);
    }

    async findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        this.logger.info2("UserService.findOne() started");
        this.logger.info2("UserService.findOne() ended");
        return this.userRepository.findOne<T>(find, options);
    }

    async findOneByUsername<T>(
        username: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        this.logger.info2("UserService.findOneByUsername() started");
        this.logger.info2("UserService.findOneByUsername() ended");
        return this.userRepository.findOne<T>({ username }, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseOptions
    ): Promise<number> {
        this.logger.info2("UserService.getTotal() started");
        this.logger.info2("UserService.getTotal() ended");
        return this.userRepository.getTotal(find, options);
    }

    async create(
        {
            name,
            location,
            gender,
            email,
            mobileNumber,
            role,
            age,
            profilePicture,
        }: UserCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<UserDoc> {
        this.logger.info2("UserService.create() started");
        const create: UserEntity = new UserEntity();
        // create._id=id;
        create.name = name;
        create.location = location;
        create.email = email;
        create.role = role;
        create.isActive = true;
        // create.inactivePermanent = false;
        // create.blocked = false;
        create.age =age;
        create.gender = gender;
        create.joiningDate = this.helperDateService.create();
        create.mobileNumber = mobileNumber ?? undefined;
        const profileUrl = `userProfiles/photo_${email}`
        const url = await this.awsUploadService.upload(profileUrl,profilePicture);
        create.profilePicture = url;
        this.logger.info2("UserService.create() ended");
        return this.userRepository.create<UserEntity>(create, options);
    }

    async existByEmail(
        email: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.userRepository.exists(
            {
                email: {
                    $regex: new RegExp(`\\b${email}\\b`),
                    $options: 'i',
                },
            },
            { ...options, withDeleted: true }
        );
    }

    async existByMobileNumber(
        mobileNumber: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.userRepository.exists(
            {
                mobileNumber,
            },
            { ...options, withDeleted: true }
        );
    }

    async existByUsername(
        username: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.userRepository.exists(
            { username },
            { ...options, withDeleted: true }
        );
    }

    async delete(repository: UserDoc): Promise<UserDoc> {
        return this.userRepository.softDelete(repository);
    }

    async updateName(
        repository: UserDoc,
        { name }: UserUpdateNameDto
    ): Promise<UserDoc> {
        repository.name = name;
       

        return this.userRepository.save(repository);
    }

    async updatePhoto(
        repository: UserDoc,
        photo: AwsS3Serialization
    ): Promise<UserDoc> {
        repository.profilePicture = photo.path;

        return this.userRepository.save(repository);
    }



    // async active(repository: UserDoc): Promise<UserEntity> {
    //     repository.isActive = true;
    //     repository.inactiveDate = undefined;

    //     return this.userRepository.save(repository);
    // }

    // async inactive(repository: UserDoc): Promise<UserDoc> {
    //     repository.isActive = false;
    //     repository.inactiveDate = this.helperDateService.create();

    //     return this.userRepository.save(repository);
    // }

    // async blocked(repository: UserDoc): Promise<UserEntity> {
    //     repository.blocked = true;
    //     repository.blockedDate = this.helperDateService.create();

    //     return this.userRepository.save(repository);
    // }

    // async unblocked(repository: UserDoc): Promise<UserDoc> {
    //     repository.blocked = false;
    //     repository.blockedDate = undefined;

    //     return this.userRepository.save(repository);
    // }

    // async maxPasswordAttempt(repository: UserDoc): Promise<UserDoc> {
    //     repository.passwordAttempt = 3;

    //     return this.userRepository.save(repository);
    // }

    // async increasePasswordAttempt(repository: UserDoc): Promise<UserDoc> {
    //     repository.passwordAttempt = ++repository.passwordAttempt;

    //     return this.userRepository.save(repository);
    // }

    // async resetPasswordAttempt(repository: UserDoc): Promise<UserDoc> {
    //     repository.passwordAttempt = 0;

    //     return this.userRepository.save(repository);
    // }

    // async updatePasswordExpired(
    //     repository: UserDoc,
    //     passwordExpired: Date
    // ): Promise<UserDoc> {
    //     repository.passwordExpired = passwordExpired;

    //     return this.userRepository.save(repository);
    // }

    async createPhotoFilename(): Promise<Record<string, any>> {
        const filename: string = this.helperStringService.random(20);

        return {
            path: this.uploadPath,
            filename: filename,
        };
    }

    async payloadSerialization(
        data: IUserDoc
    ): Promise<UserPayloadSerialization> {
        return plainToInstance(UserPayloadSerialization, data.toObject());
    }

    async deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        return this.userRepository.deleteMany(find, options);
    }

    async SignIn<T>(
       email: string,
       options?: IDatabaseFindOneOptions
    ): Promise<any> {
        this.logger.info2("UserService.SignIn() started");
        this.logger.info2("UserService.SignIn() ended");
        const user =  await this.userRepository.findOne<any>({email:email}, options);
        const responseData: any = { data: { user } };
        if (!user) {
            throw new NotFoundException('User not found of this email');
        }
        if(user.role == "Driver"){
            const userWithDriver =  await this.driverRepository.findOne<any>({userId:user._id});
            responseData.data.driverInfo = userWithDriver;  
        }
        // responseData.data.role = user.role;
        console.log(user+"------------")
        return responseData;
 
    }


    async updateApprove<T>(
       vehid: string,
         isApprove : string,
        options?: IDatabaseFindOneOptions
    ): Promise<any> {
        this.logger.info2("UserService.updateApprove() started");
        
        try {
            let vehicle = await this.vehicleRepository.findOneById<VehicleDoc>(vehid,options) 
            if (!vehicle) {
              throw new NotFoundException('vehicle not found');
            }
            if (isApprove == 'Approve') {
                vehicle['isActive'] = true;
                vehicle['availability'] = true;
            }
            vehicle['isApprove'] = isApprove; 

            await vehicle.save()
            this.logger.info2("UserService.updateApprove() ended");
        return vehicle;
    }
    catch (error) {
        throw new BadRequestException("enter valid values");
    }
}



    async updateUser(vehicleId: string, userUpdateDto:UserUpdateDto ): Promise<any> {
        this.logger.info2("UserService.updateUser() started");
         try {
          const user= await this.userRepository.findOne({ _id: vehicleId });
             
          if (!user) {
            throw new NotFoundException('user not found');
          }
    
          user.name = userUpdateDto.name;
          user.mobileNumber = userUpdateDto.mobileNumber;
        //   user.email = userUpdateDto.email;
          user.age = userUpdateDto.age;
          user.gender = userUpdateDto.gender;
          user.location = userUpdateDto.location;
          user.profilePicture = userUpdateDto.profilePicture;
          const profileUrl = `userProfiles/photo_${user.email}`
          const url = await this.awsUploadService.upload(profileUrl,user.profilePicture);
          user.profilePicture = url;
        console.log("User Profile Picture Updated")
          await user.save();
          
          this.logger.info2("UserService.updateUser() started");
          return user; 
        } catch (error) {
          throw new Error('Failed to update user: ' + error.message);
        }
      }

      async updateIsActive<T>(
        userId: string,
          isActive : boolean,
         options?: IDatabaseFindOneOptions
     ): Promise<any> {
         this.logger.info2("UserService.updateIsActive() started");
         
         try {
             let user = await this.userRepository.findOne<UserDoc>({_id : userId},options) 
             if (!user) {
               throw new NotFoundException('user not found');
             }
             
             if (user.role == "VehicleOwner"){
             console.log("enter owner block -----------")
             if (isActive == false) {
                //  user['isActive'] = false;
                 user.isActive=false;
                 console.log(isActive+" : enter isActive block -----------")
                 let listOfVehicles  = await this.vehicleRepository.findAll<VehicleDoc>({ownerId:userId}) 
                 console.log( +" : enter listOfVehicles  block -----------")
                 listOfVehicles.forEach(async v=>{ 
                    this.vehicleRepository.updateMany({_id:v._id},{isActive:false}) 
                 })
                    await user.save();
            } 
                if (isActive == true) {
                    user['isActive'] = true;
                    let listOfVehicles = await this.vehicleRepository.findAll<VehicleDoc>({ownerId:userId}) 
                    listOfVehicles.forEach(async v=>{ 
                        this.vehicleRepository.updateMany({_id:v._id},{isActive:true}) 
                     })
                    await user.save();
             }
            }

            if (user.role == "Driver"){
                
                if (isActive == false) {
                    user['isActive'] = false;
                    let driver = await this.driverRepository.findOne<DriverDoc>({userId:userId},options) 
                    if(driver)
                    driver.availability = false;
                        await driver.save(); 
                       
                       await user.save();
               }
               if (isActive == true) {
                user['isActive'] = true;
                let driver = await this.driverRepository.findOne<DriverDoc>({userId:userId},options) 
                if(driver)
                driver.availability = false;
                    await driver.save(); 
                   
                   await user.save();
           }
            }
            if (user.role == "User"){

             user['isActive'] = isActive; 
             await user.save()

            }
             this.logger.info2("UserService.updateIsActive() ended");
         return user;
        }
     catch (error) {
        console.log("error"+error)
         throw new BadRequestException("enter valid values");
     }
  
    }
    

    async SaveNotificationToken<T>(
        userId: string,
          token : string,
         options?: IDatabaseFindOneOptions
     ): Promise<any> {
         this.logger.info2("UserService.SaveNotificationToken() started");
         
         try {
             let user = await this.userRepository.findOne<UserDoc>({_id:userId},options) 
             if (!user) {
               throw new NotFoundException('user not found');
             }
             user.notificationTokens.push(token);
             console.log(user.notificationTokens+" : ------Notification - token")

             const updatedUser = await user.save();

             this.logger.info2("UserService.SaveNotificationToken() ended");

         return updatedUser;
     }
     catch (error) {
         throw new BadRequestException("enter valid values");
     }
 }

 async rawPipeline(
    pipeline: any,
    options?: IDatabaseFindOneOptions
): Promise<{ _id: null; notificationTokens: string[][] }[] > {
    this.logger.info2("UserService.findOne() started");
    this.logger.info2("UserService.findOne() ended");
    return await this.userRepository.raw(
        pipeline
    )
}

}