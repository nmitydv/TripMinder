import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateDriverDto } from '../dto/create.driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { IDatabaseCreateOptions, IDatabaseFindAllOptions, IDatabaseFindOneOptions, IDatabaseOptions } from 'src/common/database/interfaces/database.interface';
import { DriverDoc, DriverEntity } from '../repository/entities/driver.entity';
import { DriverRepository } from '../repository/repositories/driver.repository';
import { IdriverService } from '../interfaces/driver.service.interface';
import { AwsUploadService } from 'src/common/aws/services/aws.s3.serviceUpload';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';

@Injectable()
export class DriverService implements IdriverService {

  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly awsUploadService: AwsUploadService,
    private readonly logger: DebuggerService,
  ) {

  }

  async getTotal(
    find?: Record<string, any>,
    options?: IDatabaseOptions
  ): Promise<number> {
    this.logger.info2("driverService.getTotal() started");
    this.logger.info2("driverService.getTotal() ended");
    return this.driverRepository.getTotal(find, options);
  }

  async createDriver
    (createDriverDto: CreateDriverDto,
      options?: IDatabaseCreateOptions
    ): Promise<DriverDoc> {
    const driver: DriverEntity = new DriverEntity();
    driver.adharNumber = createDriverDto.adharNumber;
    driver.description = createDriverDto.description;
    driver.experience = parseInt(createDriverDto.experience);
    driver.vehiclesType = createDriverDto.vehicleType;
    driver.userId = createDriverDto.userId;
    driver.availability = false;
    driver.licenseNumber = createDriverDto.licenseNumber;
    driver.isApproved = "Pending";
    driver.drivingLicence = createDriverDto.drivingLicence;
    const drivingLicenceUrl = `drivingLicence/photo_${driver.userId}`
    const url = await this.awsUploadService.upload(drivingLicenceUrl, driver.drivingLicence);
    driver.drivingLicence = url;
    driver.dayWisePrice=createDriverDto.dayWisePrice;
    return this.driverRepository.create<DriverEntity>(driver, options);
  }

  async findAll(find?: Record<string, any>,
    options?: IDatabaseFindAllOptions
  ): Promise<DriverEntity[]> {
    return this.driverRepository.findAll<DriverEntity>(find, {
      ...options
    });

  }

  async findOne<DriverDoc>(userId: string, options?: IDatabaseFindOneOptions): Promise<DriverDoc> {
    this.logger.info2("DriverService.findOne() started");
    this.logger.info2("DriverService.findOne() ended");
    return await this.driverRepository.findOne<DriverDoc>({_id:userId}, options);
  }


  findByIsApproved<T>(isApproved: string, options?: IDatabaseFindOneOptions): Promise<T[]> {
    this.logger.info2("DriverService.findByIsApproved() started");
    this.logger.info2("DriverService.findByIsApproved() ended");
    return this.driverRepository.findAll<T>({ isApproved: isApproved }, options);
  }


  async remove(driverId: string) {
    this.logger.info2("DriverService.remove() started");
    try {
      const driver = await this.driverRepository.findOne({ _id: driverId });
      if (!driver) {
        throw new Error('user not found');
      }
      const driver2 = await this.driverRepository.delete(driver);
      this.logger.info2("DriverService.remove() ended");
    return driver2 ;
  } catch (error) {
   
    throw new BadRequestException(`Failed to delete the booking: ${error.message}`);
  }
  }

  async updateDrivers(driverId: string, driverUpdateDto: UpdateDriverDto): Promise<any> {
    try {
      this.logger.info2("DriverService.updateDrivers() started");
      const driver = await this.driverRepository.findOne({ _id: driverId });
      this.logger.info2("DriverService.updateDrivers() ended");
      if (!driver) {
        throw new Error('user not found');
      }

      driver.experience =parseInt(driverUpdateDto.experience);
      driver.availability = driverUpdateDto.availability;
      driver.adharNumber = driverUpdateDto.adharNumber;
      driver.licenseNumber = driverUpdateDto.licenseNumber;
      driver.vehiclesType = driverUpdateDto.vehicleType;
      driver.description = driverUpdateDto.description;
      driver.drivingLicence = driverUpdateDto.drivingLicence;
      const drivingLicenceUrl = `drivingLicence/photo_${driver.userId}`
      const url = await this.awsUploadService.upload(drivingLicenceUrl, driver.drivingLicence);
      driver.drivingLicence = url
      driver.dayWisePrice=driverUpdateDto.dayWisePrice;
      await driver.save();
      return driver;
    } catch (error) {
      throw new Error('Failed to update driver: ' + error.message);
    }
  }
  async updateStatus<T>(
    vehid: string,
    isApproved: string,
    options?: IDatabaseFindOneOptions
  ): Promise<any> {
    try {
      this.logger.info2("driverService.updateStatus() started");
      let driver = await this.driverRepository.findOneById<DriverDoc>(vehid, options)
      if (!driver) {
        throw new NotFoundException('driver not found');
      }
console.log(isApproved)
if (isApproved == 'Approve') {
  driver['isApproved'] = isApproved;
      driver['availability'] = true;
}
      driver['isApproved'] = isApproved;
console.log(driver.isApproved)
      this.logger.info2("driverService.updateStatus() ended");
      await driver.save()
      return driver;
    }
    catch (err: any) {
      throw new InternalServerErrorException({
        message: 'http.serverError.internalServerError',
        _error: err.message,
      });
    }
  }

  async getTotalOfdriversAndByStatus(
    ) {
      this.logger.info2("driverService.getTotalOfdriversAndByStatus() started");
      try {
        const drivers = await this.driverRepository.findAll();
        const approvedDrivers = await this.driverRepository.findAll<DriverDoc[]>({ isApproved: 'Approve' })
        const rejectedDrivers = await this.driverRepository.findAll<DriverDoc[]>({ isApproved: 'Reject' })
        const pendingDrivers = await this.driverRepository.findAll<DriverDoc[]>({ isApproved: 'Pending' })
        const result = {
          TotalDrivers: drivers.length,
          TotalApprovedDrivers: approvedDrivers.length,
          TotalRejectedDrivers: rejectedDrivers.length,
          TotalPendingDrivers: pendingDrivers.length,
        };
        this.logger.info2("driverService.getTotalOfdriversAndByStatus() ended");
        return result;
      } catch (error) {
  
        throw new InternalServerErrorException(`Failed to retrieve Activity: ${error.message}`);
      }
    }

}
