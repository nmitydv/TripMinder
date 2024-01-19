import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, Put, NotFoundException, UseGuards } from '@nestjs/common';

import { IDatabaseCreateOptions, IDatabaseFindAllOptions } from 'src/common/database/interfaces/database.interface';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'src/common/response/decorators/response.decorator';
import { BookingService } from '../services/booking.service';
import { BookingByIdDoc, BookingsByUserIdDoc, BookingCreatedDoc, BookingsByVehicalDriverIdDoc, BookingupdateDoc, BookingsByBookingStatusDoc, BookingsByBookingRequestDoc, BookingBystatus, deleteBookingById, BookingsByBookingStatusAndRequestByVehicleIdDoc } from '../docs/booking.docs';
import { Bookingcreatedto } from '../dto/booking.create.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { BookingGetSerialization } from '../serializations/booking.get.serialization';
import { BookingDoc, BookingEntity } from '../repositories/entities/booking.entity';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { BookingListGetSerialization } from '../serializations/booking.listget.serialization';
import { BookingRequest } from '../constant/booking.constant';
import { PaginationQueryFilterEqual } from 'src/common/pagination/decorators/pagination.decorator';
import { AuthJwtAccessRoleProtected, AuthJwtUserAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ENUM_AUTH_ACCESS_FOR } from 'src/common/auth/constants/auth.enum.constant';
import { FirebaseService } from 'src/common/firebase/services/firebase.service';
import { BookingNotificationCont } from '../constant/booking.notification.constant';
import { VehicleService } from 'src/modules/vehicle/services/vehicle.service';
import { DriverService } from 'src/modules/driver/services/driver.service';
import { VehicleRepository } from 'src/modules/vehicle/repository/repositories/vehicle.repository';
import { DriverDoc } from 'src/modules/driver/repository/entities/driver.entity';
import { VehicleDoc } from 'src/modules/vehicle/repository/entities/vehicle.entity';
import { BookingWhatsAppMessageConst } from '../constant/booking,wattsappMessage.constant';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';

@ApiTags('modules.booking')
@Controller({
  version: '1',
  path: '/booking'
})

export class BookingController {
  constructor(private readonly bookingService: BookingService,
    private readonly logger: DebuggerService,
    private readonly firebaseService: FirebaseService,
    private readonly vehicleRepository: VehicleRepository,
    private readonly driverService: DriverService,
    private readonly helperDateService: HelperDateService,) { }


  @BookingCreatedDoc()
  @Response('booking.create', {
    serialization: BookingGetSerialization,
  })
  @AuthJwtUserAccessProtected()
  @Post("/create")
  async create(@Body() createBookingDto: Bookingcreatedto,
    @Query() options: IDatabaseCreateOptions,) {
    this.logger.info2("BookingController.create() started");
    try {
      const booking = await this.bookingService.createBooking(createBookingDto, options);;

      // notification logic for request to vehicleOwner or driver 
      let userId = null;
      if (booking) {
        // const Driver = this.driverService.findOne<DriverDoc>(booking.vehicleDriverId);
        // console.log((await Driver).userId)
        // if (Driver !== null) {
        //   console.log(" DriverId is here")
        //   userId = (await Driver).userId;
        //   console.log(userId + " DriverId is here")
        // }
        // if (Driver == null) {
        //   const vehicleOwner = this.vehicleRepository.findOne<VehicleDoc>({ _id: booking.vehicleDriverId });
        //   userId = (await vehicleOwner).ownerId;
        //   console.log(userId + " VehicleOwner is here")
        // }
        const user:any = await this.bookingService.findUserIdByBookingId(booking._id);
        userId = user.length > 0 ? user[0].userId === booking.userId ? user[0].ownerId : user[0].userId : null;
        console.log(userId + "cheak userId null or not");
        // got to driver id or vehicle id notify

        const customeNotification = {
          ...BookingNotificationCont.bookingRequest,
          body: BookingNotificationCont.bookingRequest.body
            .replace('{{pickupLocation}}', booking.pickupLocation)
            .replace('{{dropLocation}}', booking.droplocation)
            .replace('{{startDate}}', this.helperDateService.format(booking.startDate))
            .replace('{{endDate}}', this.helperDateService.format(booking.endDate))
        };
        const customeWattsappMessage = BookingWhatsAppMessageConst.bookingRequest
          .replace('{{pickupLocation}}', booking.pickupLocation)
          .replace('{{dropLocation}}', booking.droplocation)
          .replace('{{startDate}}', this.helperDateService.format(booking.startDate))
          .replace('{{endDate}}', this.helperDateService.format(booking.endDate))

        this.firebaseService.sendPushNotification([userId], customeNotification);
        this.firebaseService.sendWhatsAppMessage(userId, customeWattsappMessage);
      }

      this.logger.info2("BookingController.create() ended");
      return { data: booking.toObject() };
    } catch (error) {
      throw new BadRequestException('booking creation failed' + error);
    }
  }


  @BookingByIdDoc()
  @Response('booking.get', { serialization: BookingGetSerialization })
  @AuthJwtAccessRoleProtected([ENUM_AUTH_ACCESS_FOR.ADMIN, ENUM_AUTH_ACCESS_FOR.USER, ENUM_AUTH_ACCESS_FOR.VEHICLE_OWNER, ENUM_AUTH_ACCESS_FOR.DRIVER])
  @Get('book/:id')
  async findOne(@Param('id') id: string, @Query() options: IDatabaseCreateOptions) {
    this.logger.info2("BookingController.findOne() started");
    const booking = await this.bookingService.findOne<BookingDoc>(id, options);

    if (!booking) {
      throw new NotFoundException('booking not found bookingId: ' + id);
    }
    this.logger.info2("BookingController.findOne() ended");
    return { data: booking.toObject() };
  }

  @BookingsByUserIdDoc()
  @Response('booking.list', {
    serialization: BookingListGetSerialization,
  })
  @AuthJwtUserAccessProtected()
  @Get('/bookings/BookingStatusRequestUserId')
  async findBookingsByUserId(
    @Query() options: IDatabaseCreateOptions,
    @Query('bookingStatus') bookingStatus?: string,
    @Query('bookingRequest') bookingRequest?: string,
    @Query('userId') userId?: string,
  ) {
    this.logger.info2("BookingController.findBookingsByUserId() started");
    try {
      const booking = await this.bookingService.findByUserId(userId, bookingStatus, bookingRequest, options);
      if (!booking) {
        throw new NotFoundException('booking not found userid: ' + userId);
      }
      this.logger.info2("BookingController.findBookingsByUserId() ended");
      return { data: booking };
    } catch (error) {

      throw new BadRequestException('booking not found ' + error);
    }
  }

  //   @BookingsByVehicalDriverIdDoc()
  //   @Response('booking.VehicalDriverId',{
  //     serialization: BookingListGetSerialization,
  // })
  //   @Get('/bookingss/:VehicleDriverId')
  //   async findBookingsByVehicleDriverId(@Param('VehicleDriverId') vehicleId: string, @Query() options: IDatabaseCreateOptions,) {
  //     this.logger.info2("BookingController.findBookingsByVehicleDriverId() started");
  //     try {
  //       const bookings = await this.bookingService.findByVehicleDriverId(vehicleId, { ...options, join: { path: 'userId' }});
  //       if (!bookings) {
  //         throw new NotFoundException('booking not found vehicleId: '+vehicleId);
  //       }
  //       this.logger.info2("BookingController.findBookingsByVehicleDriverId() ended");
  //       return { data: bookings };
  //     } catch (error) {
  //       console.error(error);
  //       throw new BadRequestException('booking not found ' + error);
  //     }
  //   }



  @BookingupdateDoc()
  @Response('booking.updated', {
    serialization: BookingGetSerialization,
  })
  @AuthJwtAccessRoleProtected([ENUM_AUTH_ACCESS_FOR.USER, ENUM_AUTH_ACCESS_FOR.VEHICLE_OWNER, ENUM_AUTH_ACCESS_FOR.DRIVER])
  @Put('/Booking/Update/:bookingId')
  async updateBooking(@Param('bookingId') bookingId: string, @Body() bookingDto: UpdateBookingDto, @GetUser() User: UserDoc) {
    this.logger.info2("BookingController.updateBooking() started");
    const booking = await this.bookingService.updateBooking(bookingId, bookingDto);
    const bookingRequest = booking.bookingRequest;
    const bookingStatus = booking.bookingStatus;
    if (booking) {

      let customeNotification = null;
      let customeWattsappMessage = null;
      let userId = booking.userId;
      console.log(booking)
      console.log(User)
      let userType = User.role === "Driver" ? "driver" : "vehicle owner";
      if (bookingRequest === "Reject" && bookingStatus === "Pending") { // reject ? user ?
        
        if (User.role === ENUM_AUTH_ACCESS_FOR.USER) {
          const user:any = await this.bookingService.findUserIdByBookingId(booking._id);
          userId = user.length > 0 ? user[0].userId === booking.userId ? user[0].ownerId : user[0].userId : null;
          userType = "user";
        }
          customeNotification = {
            ...BookingNotificationCont.rejectBooking,
            body: BookingNotificationCont.rejectBooking.body
              .replace('{{pickupLocation}}', booking.pickupLocation)
              .replace('{{dropLocation}}', booking.droplocation)
              .replace('{{startDate}}', this.helperDateService.format(booking.startDate))
              .replace('{{endDate}}', this.helperDateService.format(booking.endDate))
              .replace("{{userType}}", userType),
          };
          customeWattsappMessage = BookingWhatsAppMessageConst.rejectBooking.replace('{{pickupLocation}}', booking.pickupLocation)
            .replace('{{dropLocation}}', booking.droplocation)
            .replace('{{startDate}}', this.helperDateService.format(booking.startDate))
            .replace('{{endDate}}', this.helperDateService.format(booking.endDate))
            .replace("{{userType}}", userType);

      }
      if (bookingRequest === "Approve" && bookingStatus === "Pending" || bookingRequest === "Approve" && bookingStatus === "InRunning") {
        customeNotification = {
          ...BookingNotificationCont.vehicleOwnerOrDriverApproveBooking,
          body: BookingNotificationCont.vehicleOwnerOrDriverApproveBooking.body
            .replace('{{pickupLocation}}', booking.pickupLocation)
            .replace('{{dropLocation}}', booking.droplocation)
            .replace('{{startDate}}', this.helperDateService.format(booking.startDate))
            .replace('{{endDate}}', this.helperDateService.format(booking.endDate))
            .replace("{{userType}}", userType),
        };
        customeWattsappMessage = BookingWhatsAppMessageConst.approveBooking.replace('{{pickupLocation}}', booking.pickupLocation)
          .replace('{{dropLocation}}', booking.droplocation)
          .replace('{{startDate}}', this.helperDateService.format(booking.startDate))
          .replace('{{endDate}}', this.helperDateService.format(booking.endDate))
          .replace("{{userType}}", userType);

      }
      if (bookingRequest === "Approve" && bookingStatus === "Completed") {
        customeNotification = {
          ...BookingNotificationCont.bookingCompleted,
          body: BookingNotificationCont.bookingCompleted.body
            .replace('{{pickupLocation}}', booking.pickupLocation)
            .replace('{{dropLocation}}', booking.droplocation)
            .replace('{{startDate}}', this.helperDateService.format(booking.startDate))
            .replace('{{endDate}}', this.helperDateService.format(booking.endDate))
        };
        customeWattsappMessage = BookingWhatsAppMessageConst.bookingCompleted.replace('{{pickupLocation}}', booking.pickupLocation)
          .replace('{{dropLocation}}', booking.droplocation)
          .replace('{{startDate}}', this.helperDateService.format(booking.startDate))
          .replace('{{endDate}}', this.helperDateService.format(booking.endDate))

      }
      console.log(JSON.stringify(customeNotification)  + " notification -----------")
      console.log(JSON.stringify(customeWattsappMessage)  + " notification -----------")
      console.log(userId + " userrrrrrrrrrID-----------")
      this.firebaseService.sendPushNotification([userId], customeNotification);
      this.firebaseService.sendWhatsAppMessage(userId, customeWattsappMessage);

      this.logger.info2("BookingController.updateBooking() ended");
      return { data: booking.toObject() };
    } else {
      throw new NotFoundException('Booking not found of this bookinId: ' + bookingId);
    }
  }

  //   @BookingsByBookingStatusDoc()
  //    @Response('booking.bookingStatus',{
  //     serialization: BookingListGetSerialization,
  // })
  //   @Get('/bookingStatus/:bookingStatus')
  //   async findAllBookingsByBookingStatus(@Param('bookingStatus') bookingStatus: string, @Query() options: IDatabaseFindAllOptions,) {
  //     this.logger.info2("BookingController.findAllBookingsByBookingStatus() started");
  //     try {
  //       const bookings = await this.bookingService.getAllBookingByBookingStatus(bookingStatus, options);
  //       if (!bookings) {
  //         throw new NotFoundException('bookings not found bookingStatus: '+bookingStatus);
  //       }
  //       this.logger.info2("BookingController.findAllBookingsByBookingStatus() ended");
  //       return { data: bookings };
  //     } catch (error) {
  //       throw new BadRequestException('bookings not found ' + error);
  //     }
  //   }


  //   @BookingsByBookingRequestDoc()
  //   @Response('booking.bookingRequest',{
  //     serialization: BookingListGetSerialization,
  // })
  //   @Get('/bookingRequest/:bookingRequest')
  //   async findAllBookingsByBookingRequest(@Param('bookingRequest') bookingRequest: string, @Query() options: IDatabaseFindAllOptions,) {
  //     this.logger.info2("BookingController.findAllBookingsByBookingRequest() started");
  //     try {
  //       const bookings = await this.bookingService.getAllBookingByBookingRequest(bookingRequest, options);
  //       if (!bookings) {
  //         throw new NotFoundException('bookings not found  BookingRequest'+bookingRequest);
  //       }
  //       this.logger.info2("BookingController.findAllBookingsByBookingRequest() ended");
  //       return { data: bookings };
  //     } catch (error) {

  //       console.error(error);
  //       throw new BadRequestException('bookings not found ' + error);
  //     }
  //   }

  //   @BookingsByBookingStatusDoc()
  //   @Response('booking.list',{
  //     serialization: BookingListGetSerialization,
  // })
  //   @Get('/bookingStatusByUserId/:bookingStatus/:userId')
  //   async findAllBookingsByBookingStatusByUserId(@Query() options: IDatabaseFindAllOptions,
  //   @PaginationQueryFilterEqual('bookingStatus') bookingStatus: Record<string, any>,
  //   @PaginationQueryFilterEqual('bookingRequest') bookingRequest: Record<string, any>,
  //   @PaginationQueryFilterEqual('userId') userId: Record<string, any>
  //   ) {
  //    this.logger.info2("BookingController.findAllBookingsByBookingStatusByvehicleDriverId() started");
  //    const find: Record<string, any> = {
  //      ...bookingStatus,
  //      ...bookingRequest,
  //      ...userId,
  //    };
  //     this.logger.info2("BookingController.findAllBookingsByBookingStatusById() started");
  //     try {
  //       const bookings = await this.bookingService.findAll(find, options);
  //       if (!bookings) {
  //         throw new NotFoundException('bookings not found status: '+bookingStatus);
  //       }
  //       this.logger.info2("BookingController.findAllBookingsByBookingStatusById() ended");
  //       return { data: bookings };
  //     } catch (error) {
  //       throw new BadRequestException('bookings not found ' + error);
  //     }
  //   }

  //   @BookingsByBookingRequestDoc()
  //   @Response('booking.list',{
  //     serialization: BookingListGetSerialization,
  // })
  //   @Get('/bookingRequestByUserId/:bookingRequest/:userId')
  //   async findAllBookingsByBookingRequesById(@Param('bookingRequest') bookingRequest: string, @Param('userId') userId: string, @Query() options: IDatabaseFindAllOptions,) {
  //     this.logger.info2("BookingController.findAllBookingsByBookingRequesById() started");
  //     try {
  //       const bookings = await this.bookingService.getAllBookingByBookingRequestByuserId(bookingRequest, userId, options);
  //       if (!bookings) {
  //         throw new NotFoundException('bookings not found bookingRequest: '+bookingRequest+' and userId: '+userId);
  //       }
  //       this.logger.info2("BookingController.findAllBookingsByBookingRequesById() ended");
  //       return { data: bookings };
  //     } catch (error) {

  //       console.error(error);
  //       throw new BadRequestException('bookings not found ' + error);
  //     }
  //   }
  @BookingsByBookingStatusAndRequestByVehicleIdDoc()
  @Response('booking.list', {
    serialization: BookingListGetSerialization,
  })
  @AuthJwtAccessRoleProtected([ENUM_AUTH_ACCESS_FOR.VEHICLE_OWNER, ENUM_AUTH_ACCESS_FOR.DRIVER])
  @Get('/bookingStatusAndRequestByvehicleDriverId')
  async findAllBookingsByBookingStatusAndRequestByvehicleDriverId(
    // @Param('bookingStatus') bookingStatus: string,@Param('bookingStatus') bookingRequest: string,
    //  @Param('vehicleDriverId') vehicleDriverId: string,
    @Query() options: IDatabaseFindAllOptions,
    @PaginationQueryFilterEqual('bookingStatus') bookingStatus: Record<string, any>,
    @PaginationQueryFilterEqual('bookingRequest') bookingRequest: Record<string, any>,
    @PaginationQueryFilterEqual('vehicleDriverId') vehicleDriverId: Record<string, any>
  ) {
    this.logger.info2("BookingController.findAllBookingsByBookingStatusByvehicleDriverId() started");
    const find: Record<string, any> = {
      ...bookingStatus,
      ...bookingRequest,
      ...vehicleDriverId,
    };
    try {
      const bookings = await this.bookingService.findAll(find, { join: { path: "userId" } });
      if (!bookings) {
        throw new NotFoundException('bookings not found bookingStatus: ' + bookingStatus + ' and vehicleDriverId: ' + vehicleDriverId);
      }
      this.logger.info2("BookingController.findAllBookingsByBookingStatusByvehicleDriverId() ended");
      return { data: bookings };
    } catch (error) {

      console.error(error);
      throw new BadRequestException('bookings not found ' + error);
    }
  }

  // @BookingsByBookingRequestDoc()
  //   @Response('booking.list',{
  //     serialization: BookingListGetSerialization,
  // })
  // @Get('/bookingRequestByvehicleDriverId/:bookingRequest/:vehicleDriverId')
  // async findAllBookingsByBookingRequesByVehicleId(@Param('bookingRequest') bookingRequest: string, @Param('vehicleDriverId') vehicleDriverId: string, @Query() options: IDatabaseFindAllOptions,) {
  //   this.logger.info2("BookingController.findAllBookingsByBookingRequesByVehicleId() started");
  //   try {
  //     const bookings = await this.bookingService.getAllBookingByBookingRequestByvehicleDriverId(bookingRequest, vehicleDriverId, options);
  //     if (!bookings) {
  //       throw new NotFoundException('bookings not found bookingRequest: '+bookingRequest +'and vehicleDriverId: '+vehicleDriverId);
  //     }
  //     this.logger.info2("BookingController.findAllBookingsByBookingRequesByVehicleId() ended");
  //     return { data: bookings };
  //   } catch (error) {

  //     console.error(error);
  //     throw new BadRequestException('bookings not found ' + error);
  //   }
  // }




  //    @BookingBystatus()
  //    @Response('booking.list',{
  //     serialization: BookingListGetSerialization,
  // })
  //    @Get('/Booking/get/:status')
  //       async findAllbookingBystatus(@Param('status') status: string) {
  //         this.logger.info2("BookingController.findAllbookingBystatus() started");
  //         try {
  //           const booking: BookingDoc[] = await this.bookingService.getAllBookingByStatus<any>(status);
  //           console.log("booking found in the database for status " + status);
  //           if (!booking) {
  //             throw new NotFoundException(`Bookings not found`);
  //           }
  //           this.logger.info2("BookingController.findAllbookingBystatus() ended");
  //           return { data: booking };
  //         } catch (error) {
  //           console.error(error);
  //           throw new NotFoundException('bookings not found for ' + status);
  //         }
  //        }

  //  @deleteBookingById()
  //  @Response('booking.delete')
  //  @Delete('/Booking/delete/:id')
  //  async deleteBookingById(@Param('id') id: string) {
  //   this.logger.info2("BookingController.findAllbookingBystatus() started");
  //   this.logger.info2("BookingController.findAllbookingBystatus() ended");

  //    const result = await this.bookingService.deleteBookingById(id);
  //    if (!result) {
  //      throw new NotFoundException(`Booking with ID ${id} not found`);
  //    }
  //  }
}
