import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, NotFoundException, Put, InternalServerErrorException } from '@nestjs/common';
import { DriverService } from '../services/driver.service';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { IDatabaseCreateOptions, IDatabaseFindAllOptions } from 'src/common/database/interfaces/database.interface';
import { ApiTags } from '@nestjs/swagger';
import { DeleteDriverDoc, DriverAllDoc, DriverByIdDoc, DriverCreatedDoc, DriverIsApproveDoc, DriverListDoc, DriverStatusDoc, DriverUpdateDoc, TotalOfdriversAndByStatusDoc } from '../docs/driver.docs';
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator';
import { CreateDriverDto } from '../dto/create.driver.dto';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { DriverGetSerialization } from '../serialization/driver.get.serialization';
import { DriverListGetSerialization } from '../serialization/driver.listget.serialization';
import { DriverDoc, DriverEntity } from '../repository/entities/driver.entity';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { PaginationQuery, PaginationQueryFilterEqual, PaginationQueryFilterInBoolean, PaginationQueryFilterInEqualnumber, PaginationQueryFilterInRange } from 'src/common/pagination/decorators/pagination.decorator';
import { DRIVER_DEFAULT_AVAILABILITY, DRIVER_DEFAULT_AVAILABLE_ORDER_BY, DRIVER_DEFAULT_AVAILABLE_SEARCH, DRIVER_DEFAULT_EXPERIANCE, DRIVER_DEFAULT_ORDER_BY, DRIVER_DEFAULT_ORDER_DIRECTION, DRIVER_DEFAULT_PER_PAGE, DRIVER_DEFAULT_RANGE, DriverStatus } from '../constant/driver.constant';
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { DriverRepository } from '../repository/repositories/driver.repository';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { VehicleEntity } from 'src/modules/vehicle/repository/entities/vehicle.entity';
import { AuthJwtAdminAccessProtected, AuthJwtDriverAccessProtected, AuthJwtUserAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import { VEHICLE_DEFAULT_SEATERS } from 'src/modules/vehicle/constants/vehicle.list';
import { DriverNotificationConst } from '../constant/driver.notification.constant';
import { FirebaseService } from 'src/common/firebase/services/firebase.service';
import { DriverWhatsAppMessageConst } from '../constant/driver.wattsappMessage.constant';


@ApiTags('modules.driver')
@Controller({
  version: '1',
  path: '/driver'
})

export class DriverController {
  constructor(private readonly driverService: DriverService,
    private readonly logger: DebuggerService,
    private readonly driverRepository:DriverRepository,
    private readonly paginationService: PaginationService,
    private readonly firebaseService: FirebaseService,
  ) { }

  @DriverCreatedDoc()
  @Response('driver.create', {
    serialization: DriverGetSerialization,
  })
  @AuthJwtDriverAccessProtected()
  @Post("/create/Driver")
  async create(@Body() createDriverDto: CreateDriverDto,
    @Query() options: IDatabaseCreateOptions,) {
    try {
      this.logger.info2("DriverController.Create() started");
      const driver = await this.driverService.createDriver(createDriverDto, options);
//     notification 
      const adminId = "6f87ab41-08a7-4322-b1a5-87a3701ef723";
      const  customeNotification = {
        ...DriverNotificationConst.adminNewDriverRequest,
      };
      const customeWattsappMessage = DriverWhatsAppMessageConst.adminNewDriverRequest;
       this.firebaseService.sendPushNotification([adminId],customeNotification);
       this.firebaseService.sendWhatsAppMessage(adminId,customeWattsappMessage);

      this.logger.info2("DriverController.Create() ended");
      return { data: driver.toObject() };
    } catch (error) {
      throw new BadRequestException('driver creation failed' + error);
    }
  }

  @DriverByIdDoc()
  @Response('driver.get', {
    serialization: DriverGetSerialization,
  })
  @AuthJwtDriverAccessProtected()
  @Get('/driverId/:id')
  async findOne(@Param('id') id: string, @Query() options: IDatabaseCreateOptions,) {

    try {
      this.logger.info2("DriverController.FindBydriverId() started");
      const driver = await this.driverService.findOne<DriverDoc>(id, options);
      if (!driver) throw NotFoundException;
      console.log("data"+ driver)
      this.logger.info2("DriverController.FindBydriverId() ended");
      return { data: driver?.toObject() };
    } catch (error) {

      console.error(error);
      throw new BadRequestException('driver not found ' + error);
    }
  }

  @DeleteDriverDoc()
  @Response('driver.delete', {
    serialization: DriverGetSerialization,
  })
  @AuthJwtDriverAccessProtected()
  @Delete(':id')
 async remove(@Param('id') id: string) {
    this.logger.info2("DriverController.remove() started");
    this.logger.info2("DriverController.remove() ended");
    const driver = await this.driverService.remove(id);
    return { data: driver.toObject() };
  }

  @DriverUpdateDoc()
  @Response('driver.update', {
    serialization: DriverGetSerialization,
  })
  @AuthJwtDriverAccessProtected()
  @Put('/Driver/Update/:driverId')
  async updateDriver(@Param('driverId') driverId: string, @Body() driverDto: UpdateDriverDto) {
    this.logger.info2("DriverController.Update() started");
    const driver = await this.driverService.updateDrivers(driverId, driverDto);
    this.logger.info2("DriverController.Update() ended");
    if (driver) {
      return { data: driver.toObject() };
    } else {
      throw new NotFoundException('driver not found of this driverId');
    }
  }


  @DriverIsApproveDoc()
  @Response('driver.Approve', {
    serialization: DriverGetSerialization,
  })
  @AuthJwtAdminAccessProtected()
  @Patch('/update/Status/:driverId/:isApproved')
  async updateStatus(@Param("driverId") driverId: string, @Param('isApproved') isApproved: string){
    this.logger.info2("driverController.updateStatus started");
    if(!isApproved || !driverId || !Object.values(DriverStatus).includes(isApproved)){
      throw new BadRequestException("enter correct data.");
    }
    try {
    const driver =  await this.driverService.updateStatus(driverId,isApproved);
    //  notification logic for driver approve to push to user..
    const userId =  driver.userId;
    let  customeNotification = null;
    let customeWattsappMessage =null;
    console.log(userId + " :  --- DriverID ")
    if(driver.isApproved === "Approve"){
      console.log("enter approve ========")
        customeNotification = {
        ...DriverNotificationConst.adminApproveDriver,
      };
      customeWattsappMessage = DriverWhatsAppMessageConst.adminApproveDriver;
    }
    if(driver.isApproved === "Reject"){
      console.log("enter reject========")
        customeNotification = {
        ...DriverNotificationConst.adminRejectDriver,
      };
      customeWattsappMessage = DriverWhatsAppMessageConst.adminRejectDriver;
    }
    console.log(JSON.stringify(customeNotification)+"===---- notification")
     this.firebaseService.sendPushNotification([userId],customeNotification);
     this.firebaseService.sendWhatsAppMessage(userId,customeWattsappMessage);
      this.logger.info2("driverController.updateStatus ended ");
       return { data: driver.toObject() };
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
        message: 'http.serverError.internalServerError',
        _error: err.message,
      });
    }

  }

  @TotalOfdriversAndByStatusDoc()
  @Response('driver.get')
  @AuthJwtAdminAccessProtected()
  @Get('/totalNumber/drivers/status')
  async getTotalOfdriversAndByStatus() {
    try {
      this.logger.info2("driverController.getTotalOfdriversAndByStatus() started");
      const drivers = await this.driverService.getTotalOfdriversAndByStatus();
      if (!drivers) throw BadRequestException

      this.logger.info2("driverController.getTotalOfdriversAndByStatus() ended ");
      return { data: drivers };
    } catch (error) {
      throw new NotFoundException('driver not found');
    }
  }

  
  @DriverListDoc()
  @ResponsePaging('driver.list', {
    serialization: DriverListGetSerialization,
  })
  // @AuthJwtUserAccessProtected()
  @Get('/Filter/:startDate/:endDate')
  async findAllDriversFilter(
    @Param('startDate') startDate: Date, @Param('endDate') endDate: Date,
    
         @PaginationQuery(
          DRIVER_DEFAULT_PER_PAGE,
          DRIVER_DEFAULT_ORDER_BY,
          DRIVER_DEFAULT_ORDER_DIRECTION,
          DRIVER_DEFAULT_AVAILABLE_ORDER_BY,
          DRIVER_DEFAULT_AVAILABLE_SEARCH
    ) { _search, _limit, _offset, _order }: PaginationListDto,
    @Query('dayWisePrice') dayWisePrice?: string,
    @Query('experience') experience?: string,
    @Query('vehiclesType') vehiclesType?: string,
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
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
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
            { availability: true },
          ],
        },
      },
    ];
      //   first filter for DayWisePrice
    if (dayWisePrice) {
      const [min, max] = dayWisePrice.split(',').map(Number);
  
      if (!isNaN(min) && !isNaN(max)) {
        const matchStage = {
          $match: {
            dayWisePrice : { $gte: min, $lte: max },
          },
        };
  
        pipeline.push(matchStage as any);
      } else {
        throw new BadRequestException('Invalid dayWisePrice values. Both min and max must be numbers.');
      }
    }

    // second filter forn Experiance
    if (experience) {
      const [min, max] = experience.split(',').map(Number);
  
      if (!isNaN(min) && !isNaN(max)) {
        const matchExperienceStage = {
          $match: {
            experience: {$gte: min, $lte: max  },
          },
        };
  
        pipeline.push(matchExperienceStage as any);
      } else {
        throw new BadRequestException('Invalid experience value. Must be a number.');
      }
    }

    //  third filter for vehicleType 
  if (vehiclesType) {
    const vehiclesTypeArray: number[] = vehiclesType.split(',').map(Number);
    const areAllValidNumbers = vehiclesTypeArray.every(value => !isNaN(value));

    if (areAllValidNumbers) {

      const matchStage = {
        $match: {
          vehiclesType: { $in: vehiclesTypeArray },
        },
      };

      pipeline.push(matchStage as any);
    } else {
      throw new BadRequestException('Invalid vehiclesType values. vehiclesType must be numbers.');
    }
  }

    
    const availableDriver = await this.driverRepository.raw([...pipeline,
    {
      $skip: _offset,
    },
    {
      $limit: _limit,
    }
    ]);

    console.log(JSON.stringify(pipeline, null, 4))
    const totalCounts: { totalCounts: number }[] = await this.driverRepository.raw([...pipeline, { $count: 'totalCounts' }])
       
     //  if availableDriver 0 then its give en error for total counts undefined thats why i use this condition.
    if (availableDriver.length === 0) {
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
      data: availableDriver,
    };
  }



  @DriverAllDoc()
  @ResponsePaging('driver.list', {
    serialization: DriverListGetSerialization,
  })
  @AuthJwtAdminAccessProtected()
  @Get('/List/All')
  async findAllDrivers(
         @PaginationQuery(
          DRIVER_DEFAULT_PER_PAGE,
          DRIVER_DEFAULT_ORDER_BY,
          DRIVER_DEFAULT_ORDER_DIRECTION,
          DRIVER_DEFAULT_AVAILABLE_ORDER_BY,
          DRIVER_DEFAULT_AVAILABLE_SEARCH
    ) { _search, _limit, _offset, _order }: PaginationListDto,
  @PaginationQueryFilterInBoolean('availability', DRIVER_DEFAULT_AVAILABILITY) availability: Record<string, any>,
  @PaginationQueryFilterEqual('isApproved') isApproved: Record<string, any>,
  @PaginationQueryFilterInRange('experience',DRIVER_DEFAULT_EXPERIANCE) experience: Record<string, any>,
  @PaginationQueryFilterInRange('dayWisePrice',DRIVER_DEFAULT_RANGE) dayWisePrice: Record<string, any>,
  @PaginationQueryFilterInEqualnumber('vehiclesType',VEHICLE_DEFAULT_SEATERS) vehiclesType: Record<string, any>,
  ): Promise<IResponsePaging> {
    console.log("availability"+ JSON.stringify(isApproved))
    const find: Record<string, any> = {
      ..._search,
      ...isApproved,
      ...availability,
      ...experience,
      ...dayWisePrice,
      ...vehiclesType,
    };
    console.log(find);
    const drivers: DriverEntity[] = await this.driverService.findAll(find, {
      paging: {
        limit: _limit,
        offset: _offset,
      },
      order: _order,
      join: {path: 'userId'}
    });
    const total: number = await this.driverService.getTotal(find);
    const totalPage: number = this.paginationService.totalPage(
      total,
      _limit
    );
    return {
      _pagination: { total, totalPage },
      data: drivers,
    };

  }

}
