import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IDatabaseCreateOptions, IDatabaseFindAllOptions, IDatabaseFindOneOptions } from 'src/common/database/interfaces/database.interface';
import { IbookingService } from '../Interfaces/booking.service.interface';


import { BookingDoc, BookingEntity } from '../repositories/entities/booking.entity';
import { Bookingcreatedto } from '../dto/booking.create.dto';
import { BookingRepository } from '../repositories/repository/booking.repository';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { isString } from 'lodash';
// import { bookingRepository } from '../repositories/repository/booking.repository';


@Injectable()
export class BookingService implements IbookingService {

  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly logger: DebuggerService
  ) {

  }
  findBookingbystatus<bookingDoc>(status: string, options?: IDatabaseFindAllOptions<any>): Promise<bookingDoc[]> {
    throw new Error('Method not implemented.');
  }


  createBooking
    (createbookingDto: Bookingcreatedto,
      options?: IDatabaseCreateOptions
    ): Promise<BookingDoc> {
    this.logger.info2("BookingService.createBooking() started");

    const booking: BookingEntity = new BookingEntity();
    booking.userId = createbookingDto.userId;
    booking.vehicleDriverId = createbookingDto.vehicleDriverId;
    booking.pickupLocation = createbookingDto.pickupLocation;
    booking.droplocation = createbookingDto.dropLocation;
    booking.startDate = createbookingDto.startDate;
    booking.endDate = createbookingDto.endDate;
    booking.price = 0;
    booking.bookingStatus = "Pending";
    booking.bookingRequest = "Pending";
    booking.totalKmDays = 0;

    this.logger.info2("BookingService.createBooking() ended");
    return this.bookingRepository.create<BookingEntity>(booking, options);
  }

  findByUserId<T>(userId: string,bookingStatus: string,bookingRequest: string, options?: IDatabaseFindOneOptions): Promise<T[]> {
    this.logger.info2("BookingService.createBooking() started");
    this.logger.info2("Booking---"+bookingRequest+bookingStatus+userId);

    const pipeLine = [
   
      {
        $lookup: {
          from: 'vehicle', // The collection to join
          localField: 'vehicleDriverId',
          foreignField: '_id',
          as: 'vehicleData',
        },
      },
      {
        $lookup: {
          from: 'driver', // The collection to join
          localField: 'vehicleDriverId',
          foreignField: '_id',
          as: 'driverData',
        },
      },
      {
        $addFields: {
          driverData: {
            $cond: {
              if: { $gt: [{ $size: '$driverData' }, 0] }, // Check if driverData array is not empty
              then: { $arrayElemAt: ['$driverData', 0] }, // Include the first element if not empty
              else: null, // If driverData is empty, set to null
            },
          },
          vehicleData: {
            $cond: {
              if: { $gt: [{ $size: '$vehicleData' }, 0] }, // Check if driverData array is not empty
              then: { $arrayElemAt: ['$vehicleData', 0] }, // Include the first element if not empty
              else: null, // If driverData is empty, set to null
            },
          },
        },
      },
      {
        $lookup: {
          from: 'users', // Another collection to join
          localField: 'driverData.userId',
          foreignField: '_id',
          as: 'userData',
        },
      },
      {
        $match: {
          // userId: { $eq: userId },
          // bookingStatus: { $eq: bookingStatus },
          // bookingRequest: { $eq: bookingRequest },
        },
      },
    
    ]

    if (userId) {
     
      if (isString(userId)) {
       
        // const vehicleTypesArray: string[] = bookingStatus.split(',');
       
        const matchStage = {
          $match: {
            userId: { $eq: userId }
          },
        };
  
        pipeLine.push(matchStage as any);
      } else {
        console.error('Invalid userId values. vehicleType must be string.');
      }}

    if (bookingStatus) {
     
      if (isString(bookingStatus)) {
       
        // const vehicleTypesArray: string[] = bookingStatus.split(',');
       
        const matchStage = {
          $match: {
            bookingStatus: { $eq: bookingStatus }
          },
        };
  
        pipeLine.push(matchStage as any);
      } else {
        console.error('Invalid bookingStatus values. vehicleType must be string.');
      }
    }

    if (bookingRequest) {
     
      if (isString(bookingRequest)) {
       
        // const vehicleTypesArray: string[] = bookingStatus.split(',');
       
        const matchStage = {
          $match: {
            bookingRequest: { $eq: bookingRequest }
          },
        };
  
        pipeLine.push(matchStage as any);
      } else {
        console.error('Invalid bookingRequest values. vehicleType must be string.');
      }
    }

    this.logger.info2("BookingService.findByUserId() ended");
    return this.bookingRepository.raw<T>(pipeLine, options);
  }

  findByVehicleDriverId<T>(vehicleDriverId: string, options?: IDatabaseFindOneOptions): Promise<T[]> {
    this.logger.info2("BookingService.findByVehicleDriverId() started");
    this.logger.info2("BookingService.findByVehicleDriverId() ended");
    return this.bookingRepository.findAll<T>({ vehicleDriverId: vehicleDriverId }, options);
  }

  findOne<T>(bookingId: string, options?: IDatabaseFindOneOptions): Promise<T> {
    this.logger.info2("BookingService.findOne() started");
    this.logger.info2("BookingService.findOne() ended");
    return this.bookingRepository.findOne<T>({ _id: bookingId }, options);
  }

  //   update(id: number, updateDriverDto: UpdateDriverDto) {
  //     return `This action updates a #${id} driver`;
  //   }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }


  async updateBooking(driverId: string, driverUpdateDto: UpdateBookingDto): Promise<any> {
    this.logger.info2("BookingService.updateBooking() started");
    try {
      const booking = await this.bookingRepository.findOne({ _id: driverId });

      if (!booking) {
        throw new Error('user not found');
      }

      booking.pickupLocation = driverUpdateDto.pickupLocation;
      booking.droplocation = driverUpdateDto.droplocation;
      booking.startDate = driverUpdateDto.startDate;
      booking.endDate = driverUpdateDto.endDate;
      booking.price = driverUpdateDto.price;
      booking.bookingStatus = driverUpdateDto.bookingStatus;
      booking.bookingRequest = driverUpdateDto.bookingRequest;
      booking.totalKmDays = driverUpdateDto.totalKmDays;

      await booking.save();
      this.logger.info2("BookingService.updateBooking() ended");
      return booking;
    } catch (error) {
      throw new Error('Failed to update booking');
    }
  }


  getAllBookingByBookingStatus<T>(bookingStatus: string, options?: IDatabaseFindOneOptions): Promise<T[]> {
    this.logger.info2("BookingService.getAllBookingByBookingStatus() started");
    this.logger.info2("BookingService.getAllBookingByBookingStatus() ended");
    return this.bookingRepository.findAll<T>({ bookingStatus: bookingStatus }, options);
  }

  getAllBookingByBookingRequest<T>(bookingRequest: string, options?: IDatabaseFindOneOptions): Promise<T[]> {
    this.logger.info2("BookingService.getAllBookingByBookingRequest() started");
    this.logger.info2("BookingService.getAllBookingByBookingRequest() ended");
    return this.bookingRepository.findAll<T>({ bookingRequest: bookingRequest }, options);
  }
  getAllBookingByBookingStatusById<T>(bookingStatus: string, userId: string, options?: IDatabaseFindOneOptions): Promise<T[]> {
    this.logger.info2("BookingService.getAllBookingByBookingStatusById() started");
    this.logger.info2("BookingService.getAllBookingByBookingStatusById() ended");
    return this.bookingRepository.findAll<T>({ bookingRequest: bookingStatus, userId: userId }, options);
  }
  getAllBookingByBookingRequestByuserId<T>(bookingRequest: string, userId: string, options?: IDatabaseFindOneOptions): Promise<T[]> {
    this.logger.info2("BookingService.getAllBookingByBookingRequestByuserId() started");
    this.logger.info2("BookingService.getAllBookingByBookingRequestByuserId() ended");
    return this.bookingRepository.findAll<T>({ bookingRequest: bookingRequest, userId: userId }, options);
  }
  getAllBookingByBookingStatusByVehicleId<T>(bookingStatus: string,bookingRequest: string, vehicleDriverId: string, options?: IDatabaseFindOneOptions): Promise<T[]> {
    this.logger.info2("BookingService.getAllBookingByBookingStatusByVehicleId() started");
    this.logger.info2("BookingService.getAllBookingByBookingStatusByVehicleId() ended");
    return this.bookingRepository.findAll<T>({ bookingStatus: bookingStatus,bookingRequest:bookingRequest, vehicleDriverId: vehicleDriverId }, options);
  }
  getAllBookingByBookingRequestByvehicleDriverId<T>(bookingRequest: string, vehicleDriverId: string, options?: IDatabaseFindOneOptions): Promise<T[]> {
    this.logger.info2("BookingService.getAllBookingByBookingRequestByvehicleDriverId() started");
    this.logger.info2("BookingService.getAllBookingByBookingRequestByvehicleDriverId() ended");
    return this.bookingRepository.findAll<T>({ bookingRequest: bookingRequest, vehicleDriverId: vehicleDriverId }, options);
  }


  async getAllBookingByStatus<bookingDoc>(
    bookingStatus: string,
    options?: IDatabaseFindAllOptions
  ): Promise<any> {
    this.logger.info2("BookingService.getAllBookingByStatus() started");

    try {
      const booking = await this.bookingRepository.findAll({ bookingStatus: bookingStatus }, options);
      console.log(booking)

      if (!booking) {
        throw new NotFoundException(`No bookings with status ${bookingStatus} were found`);
      }
      this.logger.info2("BookingService.getAllBookingByStatus() started");
      return booking;
    } catch (error) {
      // Handle database errors, e.g., connection issues or query problems
      throw new InternalServerErrorException(`Failed to retrieve booking: ${error.message}`);
    }
  }



  async deleteBookingById(
    bookingId: string
  ): Promise<any> {
    this.logger.info2("BookingService.deleteBookingById() started");
    try {
      const booking = await this.bookingRepository.findOne({ _id: bookingId });

      if (!booking) {
        throw new NotFoundException(`Booking with ID ${bookingId} not found`);
      }
      await this.bookingRepository.delete(booking);
      this.logger.info2("BookingService.deleteBookingById() ended");
      return { message: `Booking with ID ${bookingId} has been deleted` };
    } catch (error) {

      throw new InternalServerErrorException(`Failed to delete the booking: ${error.message}`);
    }
  }

  async findAll(find?: Record<string, any>,
    options?: IDatabaseFindAllOptions
  ): Promise<BookingEntity[]> {
    return await this.bookingRepository.findAll<BookingEntity>(find, {
      ...options
    });

  }


  async findUserIdByBookingId<T>(bookingId: string, options?: IDatabaseFindOneOptions): Promise<T[]> {
    this.logger.info2("BookingService.findUserIdByVehicleDriverId() started");
    // this.logger.info2("Booking---"+bookingRequest+bookingStatus+userId);

    const pipeLine = [
 
        {
               $match: {
                 _id: bookingId,
               
               },
             },
             {
               $lookup: {
                 from: "driver",
                 localField: "vehicleDriverId",
                 foreignField: "_id",
                 as: "driverInfo"
               },
             },
       //       {
       //         $unwind: "$driverInfo" // If there's a one-to-one relationship
       //       },
             {
               $lookup: {
                 from: "vehicle",
                 localField: "vehicleDriverId",
                 foreignField: "_id",
                 as: "vehicleInfo"
               },
             },
              {
               $addFields: {
                 driverInfo: {
                   $cond: {
                     if: { $gt: [{ $size: '$driverInfo' }, 0] }, // Check if driverData array is not empty
                     then: { $arrayElemAt: ['$driverInfo', 0] }, // Include the first element if not empty
                     else: null, // If driverData is empty, set to null
                   },
                 },
                 vehicleInfo: {
                   $cond: {
                     if: { $gt: [{ $size: '$vehicleInfo' }, 0] }, // Check if driverData array is not empty
                     then: { $arrayElemAt: ['$vehicleInfo', 0] }, // Include the first element if not empty
                     else: null, // If driverData is empty, set to null
                   },
                 },
               },
             },
       //       {
       //         $unwind: "$vehicleInfo" // If there's a one-to-one relationship
       //       },
             {
               $replaceRoot: {
                 newRoot: {
                   $mergeObjects: [
                     "$$ROOT",
                     "$driverInfo",
                     "$vehicleInfo"
                   ]
                 }
               }
             },
             {
               $project: {
                 driverInfo: 0, // Exclude the nested driverInfo array
                 vehicleInfo: 0 // Exclude the nested vehicleInfo array
               }
             }
    ]

  

    this.logger.info2("BookingService.findUserIdByVehicleDriverId() ended");
    return await this.bookingRepository.raw<T>(pipeLine, options);
  }



}
