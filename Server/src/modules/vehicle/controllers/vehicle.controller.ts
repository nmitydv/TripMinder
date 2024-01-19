import { Controller, Put, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { VehicleService } from '../services/vehicle.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { IDatabaseCreateOptions } from 'src/common/database/interfaces/database.interface';
import { ApiTags } from '@nestjs/swagger';
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator';
import { AllVehicleListDoc, VehicalActivityDoc, VehicleActiveDoc, VehicleAvaibilityDoc, VehicleByIdDoc, VehicleCreatedDoc, VehicleListDoc, getTotalOfVehiclesAndByStatusDoc, vehicleBtOwnerIdDoc, vehicleStatusDoc, vehicleUpdateByIdDoc } from '../docs/vehicle.docs';
import { VehicleDoc } from '../repository/entities/vehicle.entity';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import {  PaginationQuery, PaginationQueryFilterEqual, PaginationQueryFilterInBoolean, PaginationQueryFilterInEnum, PaginationQueryFilterInEqual, PaginationQueryFilterInEqualnumber } from 'src/common/pagination/decorators/pagination.decorator';
import { VEHICLE_DEFAULT_AVAILABLE_ORDER_BY, VEHICLE_DEFAULT_AVAILABLE_SEARCH, VEHICLE_DEFAULT_IS_ACTIVE, VEHICLE_DEFAULT_ORDER_BY, VEHICLE_DEFAULT_ORDER_DIRECTION, VEHICLE_DEFAULT_PER_PAGE, VEHICLE_DEFAULT_SEATERS, VEHICLE_DEFAULT_VEHICLE_TYPE } from '../constants/vehicle.list';
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { VehicleEntity, VehicleSchema } from '../repository/entities/vehicle.entity';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { VehicleRepository } from '../repository/repositories/vehicle.repository';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { VehicleGetSerialization } from '../serialization/vehicle.get.serialization';
import { VehicleListGetSerialization } from '../serialization/vehicle.listget.serialization';
import { isString } from 'class-validator';
import { AuthJwtAccessRoleProtected, AuthJwtAdminAccessProtected, AuthJwtUserAccessProtected, AuthJwtVehicleOwnerAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ENUM_AUTH_ACCESS_FOR } from 'src/common/auth/constants/auth.enum.constant';
import { PaginationFilterInEqualPipe } from 'src/common/pagination/pipes/pagination.filter-in-equal.pipe';
import { VehicleType } from '../constants/vehicle.constant';
import { FirebaseService } from 'src/common/firebase/services/firebase.service';
import { VehicleNotificationConst } from '../constants/vehicle.notificaftion.constants';
import { VehicleWhatsAppMessageConst } from '../constants/vehicle.wattsappMessage.constant';

@ApiTags('modules.vehicle')
@Controller({
  version: '1',
  path: '/vehicle'
})
export class VehicleController {
  updateUser(mockVehicleId: string, mockUpdateDto: UpdateVehicleDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly paginationService: PaginationService,
    private readonly VEHICLERepository: VehicleRepository,
    private readonly logger: DebuggerService,
    private readonly firebaseService: FirebaseService,
  ) { }

  // find All vehicle by his status(isApproved || pending || rejected)


  // Update vehicle
  @vehicleUpdateByIdDoc()
  @Response('vehicle.update', {
    serialization: VehicleGetSerialization,
  })
  @AuthJwtVehicleOwnerAccessProtected()
  @Put('/Vehicle/Update/:vehicleId')
  async updateVehicle(@Param('vehicleId') vehicleId: string, @Body() updateDto: UpdateVehicleDto) {
    this.logger.info2("vehicleController.Update() started");
    const vehicle = await this.vehicleService.updateVehicle(vehicleId, updateDto);
    this.logger.info2("vehicleController.Update() ended");
    if (vehicle) {
      return { data: vehicle.toObject() };
    } else {
      throw new NotFoundException('vehicle not found of this vehicleId');
    }
  }


  @VehicleCreatedDoc()
  @Response('vehicle.create', {
    serialization: VehicleGetSerialization,
  })
  // @AuthJwtVehicleOwnerAccessProtected()
  @Post("/create/vehicle")
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto,
    @Query() options: IDatabaseCreateOptions) {
    try {
      this.logger.info2("vehicleController Create() started");
      const vehicle = await this.vehicleService.createVehicle(createVehicleDto);
      // notification logic for reaquest for a new vehicle
    const adminId = "6f87ab41-08a7-4322-b1a5-87a3701ef723";
      const  customeNotification = {
        ...VehicleNotificationConst.adminNewVehicleRequest,
        body: VehicleNotificationConst.adminNewVehicleRequest.body
      };
      const customeWattsappMessage = VehicleWhatsAppMessageConst.adminNewVehicleRequest;
      
       this.firebaseService.sendPushNotification([adminId],customeNotification);
       this.firebaseService.sendWhatsAppMessage(adminId,customeWattsappMessage);

      this.logger.info2("vehicleController Create() ended");
      return { data: vehicle.toObject() };
    } catch (error) {
      throw new BadRequestException('vehicle creation failed' + error);
    }
  }


  @VehicleByIdDoc()
  @Response('vehicle.get', {
    serialization: VehicleGetSerialization,
  })
  @AuthJwtVehicleOwnerAccessProtected()
  @Get('/vehicle/:vehicleId')
  async findOne(@Param('vehicleId') vehicleId: string,
    @Query() options: IDatabaseCreateOptions) {
    try {
      this.logger.info2("vehicleController.findOne() started");
      const vehicle = await this.vehicleService.findVehicleById(vehicleId);
      if (!vehicle) throw BadRequestException;
      this.logger.info2("vehicleController.findOne() ended ");
      return { data: vehicle.toObject() };
    } catch (error) {
      console.error(error);
      throw new NotFoundException('vehicle not found ' + error);
    }
  }

  // @Response('vehicle.get')
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
  //   return this.vehicleService.update(+id, updateVehicleDto);
  // }

  // @Response('vehicle.delete')
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vehicleService.remove(+id);
  // }

  @vehicleBtOwnerIdDoc()
  @Response('vehicle.list', {
    serialization: VehicleListGetSerialization,
  })
  @AuthJwtVehicleOwnerAccessProtected()
  @Get('/owner/:ownerId')
  async findAllByOwnerId(@Param('ownerId') ownerId: string) {
    try {
      this.logger.info2("vehicleController.findAllByOwnerId started");
      const vehicles: VehicleDoc[] = await this.vehicleService.findVehiclesByOwnerId<any>(ownerId);
      if (!vehicles) throw BadRequestException
      this.logger.info2("vehicleController.findAllByOwnerId ended ");
      return { data: vehicles };
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Vehicles not found for owner ' + ownerId);
    }
  }


  @VehicleAvaibilityDoc()
  @Response('vehicle.update', {
    serialization: VehicleGetSerialization,
  })
  @AuthJwtVehicleOwnerAccessProtected()
  @Patch('/update/Availability/:vehicleId/:Available')
  async updateAvailability(@Param("vehicleId") vehicleId: string, @Param('Available') availability: boolean) {
    this.logger.info2("vehicleController.updateAvailability started");
    try {
      const vehicle = await this.vehicleService.updateAvailability(vehicleId, { Available: availability });
      this.logger.info2("vehicleController.updateAvailability ended ");
      return { data: vehicle.toObject() };
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
        message: 'http.serverError.internalServerError',
        _error: err.message,
      });
    }

    return;
  }


  @VehicleActiveDoc()
  @Response('vehicle.update', {
    serialization: VehicleGetSerialization,
  })
  @AuthJwtVehicleOwnerAccessProtected()
  @Patch('/update/Active/:vehicleId/:IsActive')
  async updateIsActive(@Param("vehicleId") vehicleId: string, @Param('IsActive') IsActive: boolean) {
    this.logger.info2("vehicleController.updateIsActive started");
    try {
      const vehicle = await this.vehicleService.updateActive(vehicleId, { isActive: IsActive });
      this.logger.info2("vehicleController.updateIsActive ended ");
      return { data: vehicle.toObject() };
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
        message: 'http.serverError.internalServerError',
        _error: err.message,
      });
    }

  }






  @VehicleListDoc()
  @ResponsePaging('vehicle.list', {
    serialization: VehicleListGetSerialization,
  })
  @AuthJwtUserAccessProtected()
  @Get('/Filter/:startDate/:endDate')
  async findAllVehicles(
    @Param('startDate') startDate: Date, @Param('endDate') endDate: Date,
         @PaginationQuery(
        VEHICLE_DEFAULT_PER_PAGE,
        VEHICLE_DEFAULT_ORDER_BY,
        VEHICLE_DEFAULT_ORDER_DIRECTION,
        VEHICLE_DEFAULT_AVAILABLE_SEARCH,
        VEHICLE_DEFAULT_AVAILABLE_ORDER_BY
    ) { _search, _limit, _offset, _order }: PaginationListDto,
    @Query('seater') seater?: string,
    @Query('vehicleType') vehicleType?: string,
     ): Promise<IResponsePaging> {

    let pipeline =
    [
      {
        $lookup: {
          from: 'booking',
          localField: '_id',
          foreignField: 'vehicleDriverId',
          as: '_booking',
        },
      },
      {
        $addFields: {
          bookingsWithOverlappingStartDate: {
            $filter: {
              input: '$_booking',
              as: 'booking',
              cond: {
                $or: [
                  {
                    $and: [
                      { $lte: ['$$booking.startDate', startDate] },
                      { $gte: ['$$booking.endDate', startDate] },
                      { $eq: ['$$booking.bookingRequest', 'Approve'] },
                    ],
                  },
                  {
                    $and: [
                      { $lte: ['$$booking.startDate', endDate] },
                      { $gte: ['$$booking.endDate', endDate] },
                      { $eq: ['$$booking.bookingRequest', 'Approve'] },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          $and: [
            {
              $or: [
                { '_booking': null },
                {
                  $expr: {
                    $eq: [{ $size: '$bookingsWithOverlappingStartDate' }, 0],
                  },
                },
              ],
            },
            { isActive: true },
          ],
        },
      },
     
    ];
      //  first filter for seater.....
    if (seater) {
      const seatersArray: number[] = seater.split(',').map(Number);
      const areAllValidNumbers = seatersArray.every(value => !isNaN(value));

      if (areAllValidNumbers) {

        const matchStage = {
          $match: {
            seaters: { $in: seatersArray },
          },
        };
  
        pipeline.push(matchStage as any);
      } else {
        console.error('Invalid seater values. seater must be numbers.');
      }
    }
    
    // second filter for vehicleType....
    if (vehicleType) {
     
      if (isString(vehicleType)) {
       
        const vehicleTypesArray: string[] = vehicleType.split(',');
       
        const matchStage = {
          $match: {
            vehicleType: { $in: vehicleTypesArray }
          },
        };
  
        pipeline.push(matchStage as any);
      } else {
        console.error('Invalid vehicleType values. vehicleType must be string.');
      }
    }


    console.log(JSON.stringify(pipeline, null, 4))
    const availableVehicles = await this.VEHICLERepository.raw([...pipeline,
    {
      $skip: _offset,
    },
    {
      $limit: _limit,
    }
    ]);

    const totalCounts: { totalCounts: number }[] = await this.VEHICLERepository.raw([...pipeline, { $count: 'totalCounts' }])

    //  if availableVehicle 0 then its give en error for total counts undefined thats why i use this condition.
    if (availableVehicles.length === 0) {
      return {
        _pagination: { total: 0, totalPage: 0 },
        data: [],
    
      };
    }
    const totalPage: number = this.paginationService.totalPage(
      totalCounts[0].totalCounts,
      _limit
    );
    return {
      _pagination: { total: totalCounts[0].totalCounts, totalPage },
      data: availableVehicles,
    };
  }

  @AllVehicleListDoc()
  @ResponsePaging('vehicle.list', {
    serialization: VehicleListGetSerialization,
  })
  // @AuthJwtAdminAccessProtected()
  @Get('/All/vehicles')
  async findAllVehicle(
    @PaginationQuery(
      VEHICLE_DEFAULT_PER_PAGE,
      VEHICLE_DEFAULT_ORDER_BY,
      VEHICLE_DEFAULT_ORDER_DIRECTION,
      VEHICLE_DEFAULT_AVAILABLE_SEARCH,
      VEHICLE_DEFAULT_AVAILABLE_ORDER_BY
    ) { _search, _limit, _offset, _order }: PaginationListDto,
    @PaginationQueryFilterInBoolean('isActive', VEHICLE_DEFAULT_IS_ACTIVE)
    isActive: Record<string, any>,
    @PaginationQueryFilterEqual('isApprove')
        isApprove: Record<string, any>,
        @PaginationQueryFilterInEqual('vehicleType',VEHICLE_DEFAULT_VEHICLE_TYPE)
        vehicleType: Record<string, any>,
        @PaginationQueryFilterInEqualnumber('seaters',VEHICLE_DEFAULT_SEATERS)
        seaters: Record<number, any>,
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = {
      ..._search,
      ...isActive,
      ...isApprove,
      ...vehicleType,
      ...seaters,
    };
    console.log(find);
    const users: VehicleEntity[] = await this.vehicleService.findAll(find, {
      paging: {
        limit: _limit,
        offset: _offset,
      },
      order: _order,
    });
    const total: number = await this.vehicleService.getTotal(find);
    const totalPage: number = this.paginationService.totalPage(
      total,
      _limit
    );
    return {
      _pagination: { total, totalPage },
      data: users,
    };

  }

  // @VehicalActivityDoc()
  // @Response('vehicle.list', {
  //   serialization: VehicleListGetSerialization,
  // })
  // @Get('/vehicles/Activity/:isActive')
  // async getActivity(@Param('isActive') isActive: boolean) {
  //   this.logger.info2("vehicleController.getActivity() started");
  //   try {
  //     const vehicles = await this.vehicleService.vehicleActivity<VehicleDoc>(isActive);
  //     console.log("Vehicles found in the database for Active" + isActive);
  //     this.logger.info2("vehicleController.getActivity() ended");
  //     return { data: vehicles };
  //   } catch (error) {
  //     console.error(error);
  //     if (error instanceof NotFoundException) {
  //       throw new NotFoundException('Vehicles not found for  ' + isActive);
  //     }
  //     throw new InternalServerErrorException('Internal Server Error');
  //   }
  // }

  @vehicleBtOwnerIdDoc()
  @Response('vehicle.list', {
    serialization: VehicleListGetSerialization,
  })
  @AuthJwtVehicleOwnerAccessProtected()
  @Get('/owner/:ownerId/:isActive/:isApprove')
  async findAllByOwnerIdByStatus(@Param('ownerId') ownerId: string, @Param('isActive') isActive: boolean, @Param('isApprove') isApprove: string) {
    try {
      this.logger.info2("vehicleController.findAllByOwnerId started");
      const vehicles: VehicleDoc[] = await this.vehicleService.findVehiclesByOwnerIdwithStatus<any>(ownerId, isActive, isApprove);
      if (!vehicles) throw BadRequestException
      this.logger.info2("vehicleController.findAllByOwnerId ended ");
      return { data: vehicles };
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Vehicles not found for owner ' + ownerId);
    }
  }


  @getTotalOfVehiclesAndByStatusDoc()
  @Response('vehicle.get')
  @AuthJwtAdminAccessProtected()
  @Get('/totalNumber/vehicle/status')
  async getTotalOfVehiclesAndByStatus() {
    try {
      this.logger.info2("vehicleController.getTotalOfVehiclesAndByStatus() started");
      const vehicle = await this.vehicleService.getTotalOfVehiclesAndByStatus();
      if (!vehicle) throw BadRequestException

      this.logger.info2("vehicleController.getTotalOfVehiclesAndByStatus() ended ");
      return { data: vehicle };
    } catch (error) {
      throw new NotFoundException('Vehicles not found');
    }
  }

}