import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { IvehicleService } from '../interfaces/vehicle.service.interface';
import { IDatabaseCreateOptions, IDatabaseFindAllOptions, IDatabaseFindOneOptions, IDatabaseOptions } from 'src/common/database/interfaces/database.interface';
import { VehicleRepository } from '../repository/repositories/vehicle.repository';
import { VehicleDoc, VehicleEntity } from '../repository/entities/vehicle.entity';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { AwsUploadService } from 'src/common/aws/services/aws.s3.serviceUpload';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';


@Injectable()
export class VehicleService implements IvehicleService {
  vehicleModel: any;

  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly helperDateService: HelperDateService,
    private readonly awsUploadService: AwsUploadService,
    private readonly logger: DebuggerService,
  ) {

  }

  async createVehicle(createVehicleDto: CreateVehicleDto, options?: IDatabaseCreateOptions): Promise<VehicleDoc> {
    this.logger.info2("vehicleService.createVehicle() started");
    const vehicle: VehicleEntity = new VehicleEntity();
    vehicle.vehicleName = createVehicleDto.vehicleName;
    vehicle.vehicleNumber = createVehicleDto.vehicleNumber;
    vehicle.vehiclePictures = createVehicleDto.vehiclePictures;
    if (vehicle.vehiclePictures && vehicle.vehiclePictures.length > 0) {
      for (const index in vehicle.vehiclePictures) {
        const element = vehicle.vehiclePictures[index];
        const vehicleUrl = `vehicleImages/photo_${vehicle.vehicleNumber}_${+index + 1}`;
        const urlOfVehiclePictures = await this.awsUploadService.upload(vehicleUrl, element);
        vehicle.vehiclePictures[index] = urlOfVehiclePictures;
      }     
    }
    vehicle.features = createVehicleDto.features;
    vehicle.modelNumber = createVehicleDto.modelNumber;
    vehicle.numberPlatePic = createVehicleDto.numberPlatePic;
    const NumberPlateUrl = `vehicleImages/NumberPlate/photos${vehicle.vehicleNumber}`;
    const urlOfNumberPlate = await this.awsUploadService.upload(NumberPlateUrl, vehicle.numberPlatePic);
    vehicle.numberPlatePic = urlOfNumberPlate;
    vehicle.ownerId = createVehicleDto.ownerId;
    vehicle.registrationNumber = createVehicleDto.registrationNumber;
    vehicle.seaters = createVehicleDto.seaters;
    vehicle.kmPrice = createVehicleDto.kmPrice;
    vehicle.isActive = false;
    vehicle.isApprove = "Pending";
    vehicle.availability = false;
    vehicle.joiningDate = this.helperDateService.create();
    vehicle.vehicleType = createVehicleDto.vehicleType;
    vehicle.description=createVehicleDto.description;
    this.logger.info2("vehicleService.createVehicle() ended");
    return this.vehicleRepository.create(vehicle, options);


  }

  async findAll(find?: Record<string, any>,
    options?: IDatabaseFindAllOptions
  ): Promise<VehicleEntity[]> {
    return this.vehicleRepository.findAll<VehicleEntity>(find, {
      ...options,
      join: true,
    });

  }

  async findVehicleById<T>(vehicleId: string, options?: IDatabaseCreateOptions) {
    this.logger.info2("vehicleService.findVehicleById() started");
    this.logger.info2("vehicleService.findVehicleById() ended");
    return await this.vehicleRepository.findOne<VehicleDoc>({ _id: vehicleId }, options);

  }

  async findVehicleByIsApprove<T>(isApprove: string, options?: IDatabaseCreateOptions) {
    this.logger.info2("vehicleService.findVehicleByIsApprove() started");
    this.logger.info2("vehicleService.findVehicleByIsApprove() ended");
    return await this.vehicleRepository.findAll<T>({ isApprove: isApprove }, options);
  }
  async getTotal(
    find?: Record<string, any>,
    options?: IDatabaseOptions
  ): Promise<number> {
    this.logger.info2("vehicleService.getTotal() started");
    this.logger.info2("vehicleService.getTotal() ended");
    return this.vehicleRepository.getTotal(find, options);
  }


  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    this.logger.info2("vehicleService.update() started");
    this.logger.info2("vehicleService.update() ended");
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    this.logger.info2("vehicleService.remove() started");
    this.logger.info2("vehicleService.remove() ended");
    return `This action removes a #${id} vehicle`;
  }


  async updateVehicle(vehicleId: string, vehicleUpdateDto: UpdateVehicleDto): Promise<any> {
    try {
      this.logger.info2("vehicleService.updateVehicle() started");
      const vehicle = await this.vehicleRepository.findOne({ _id: vehicleId });

      if (!vehicle) {
        throw new Error('user not found');
      }

      vehicle.vehicleName = vehicleUpdateDto.vehicleName;
      vehicle.vehicleNumber = vehicleUpdateDto.vehicleNumber;
      vehicle.modelNumber = vehicleUpdateDto.modelNumber;
      vehicle.vehicleType = vehicleUpdateDto.vehicleType;
      vehicle.seaters = vehicleUpdateDto.seaters;
      vehicle.ownerId = vehicleUpdateDto.ownerId;
      vehicle.registrationNumber = vehicleUpdateDto.registrationNumber;
      vehicle.features = vehicleUpdateDto.features;
      vehicle.description=vehicleUpdateDto.description;
      vehicle.kmPrice = vehicleUpdateDto.kmPrice;
      // const vehicleUrl = `vehicleImages/photo_${vehicle.vehicleNumber}`;
      // const url = await this.awsUploadService.upload(vehicleUrl, vehicle.vehiclePictures);
      // vehicle.vehiclePictures = vehicleUpdateDto.vehiclePictures;
      if(vehicleUpdateDto.numberPlatePic != null && vehicleUpdateDto.numberPlatePic.includes(";base64,")){ // https?aws/vehicleImages/NumberPlate/photosMH12DE1432 || base64 string
      const NumberPlateUrl = `vehicleImages/NumberPlate/photos${vehicle.vehicleNumber}`;
      const urlOfNumberPlate = await this.awsUploadService.upload(NumberPlateUrl, vehicle.numberPlatePic);
      vehicle.numberPlatePic = urlOfNumberPlate;
      }
      await vehicle.save();
      this.logger.info2("VehicleService.updateVehicle() ended ");
      return vehicle;
    } catch (error) {
      throw new Error('Failed to update vehicle: ' + error.message);
    }
  }

  async findVehiclesByOwnerId<VehicleDoc>(
    ownerId: string,
    options?: IDatabaseFindAllOptions
  ): Promise<any> {
    try {
      this.logger.info2("vehicleService.findVehiclesByOwnerId() started");
      const vehicle = await this.vehicleRepository.findAllVehicleByOwnerId(ownerId, options);
      this.logger.info2("vehicleService.findVehiclesByOwnerId() ended ");
      if (!vehicle || vehicle.length === 0) {
        throw new NotFoundException(`Vehicle with ID ${ownerId} not found`);
      }

      return vehicle;
    } catch (error) {
      // Handle database errors, e.g., connection issues or query problems
      throw new InternalServerErrorException(`Failed to retrieve admin: ${error.message}`);
    }
  }





  async updateAvailability<T>(
    vehid: string,
    { Available }: { Available: boolean },
    options?: IDatabaseFindOneOptions
  ): Promise<any> {
    try {
      this.logger.info2("vehicleService.updateAvailability() started");
      let vehicle = await this.vehicleRepository.findOne<VehicleDoc>({ _id: vehid }, options)
      if (!vehicle) {
        throw new NotFoundException('vehicle not found');
      }

      vehicle['availability'] = Available;

      await vehicle.save()
      this.logger.info2("vehicleService.updateAvailability() ended ");
      return vehicle;
    }
    catch (err: any) {
      throw new InternalServerErrorException({
        message: 'http.serverError.internalServerError',
        _error: err.message,
      });
    }
  }



  async updateActive<T>(
    vehid: string,
    { isActive }: { isActive: boolean },
    options?: IDatabaseFindOneOptions
  ): Promise<any> {
    try {
      this.logger.info2("vehicleService.updateActive() started");
      let vehicle = await this.vehicleRepository.findOneById<VehicleDoc>(vehid, options)
      if (!vehicle) {
        throw new NotFoundException('vehicle not found');
      }

      vehicle['isActive'] = isActive;

      this.logger.info2("vehicleService.updateActive() ended");
      await vehicle.save()
      return vehicle;
    }
    catch (err: any) {
      throw new InternalServerErrorException({
        message: 'http.serverError.internalServerError',
        _error: err.message,
      });
    }
  }



  async vehicleActivity<VehicleDoc>(
    isActive: boolean,
    options?: IDatabaseFindAllOptions
  ): Promise<VehicleDoc[]> {
    this.logger.info2("vehicleService.vehicleActivity() started");
    try {
      const vehicle = await this.vehicleRepository.findAll<VehicleDoc>({ isActive: isActive }, options)

      if (!vehicle) {
        throw new NotFoundException(`Vehicle with isActive ${isActive} not found`);
      }
      this.logger.info2("vehicleService.vehicleActivity() ended");
      return vehicle;
    } catch (error) {

      throw new InternalServerErrorException(`Failed to retrieve Activity: ${error.message}`);
    }
  }

  async findVehiclesByOwnerIdwithStatus<VehicleDoc>(
    ownerId: string,
    isActive: boolean,
    isApprove: string,
    options?: IDatabaseFindAllOptions
  ): Promise<any> {
    try {
      this.logger.info2("vehicleService.findVehiclesByOwnerId() started");
      const vehicle = await this.vehicleRepository.findAll({ownerId : ownerId,isActive:isActive,isApprove:isApprove}, options);
      this.logger.info2("vehicleService.findVehiclesByOwnerId() ended ");
      if (!vehicle || vehicle.length === 0) {
        // throw new NotFoundException(`Vehicle with ID ${ownerId} not found`);
        return [];
      }

      return vehicle;
    } catch (error) {
      // Handle database errors, e.g., connection issues or query problems
      throw new InternalServerErrorException(`Failed to retrieve admin: ${error.message}`);
    }
  }

  async getTotalOfVehiclesAndByStatus(
  ) {
    this.logger.info2("vehicleService.getTotalOfVehiclesAndByStatus() started");
    try {
      const vehicle = await this.vehicleRepository.findAll();
      const approvedvehicle = await this.vehicleRepository.findAll<VehicleDoc[]>({ isApprove: 'Approve' })
      const rejectedvehicle = await this.vehicleRepository.findAll<VehicleDoc[]>({ isApprove: 'Reject', isActive:'false'})
      const pendingvehicle = await this.vehicleRepository.findAll<VehicleDoc[]>({ isApprove: 'Pending', isActive:'false'})
      const result = {
        TotalVehicles: vehicle.length,
        TotalApprovedVehicle: approvedvehicle.length,
        TotalRejectedVehicle: rejectedvehicle.length,
        TotalPendingVehicle: pendingvehicle.length,
      };
      this.logger.info2("vehicleService.getTotalOfVehiclesAndByStatus() ended");
      return result;
    } catch (error) {

      throw new InternalServerErrorException(`Failed to retrieve Activity: ${error.message}`);
    }
  }

}


