import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, NotFoundException, Put, InternalServerErrorException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RatingService } from '../services/rating.service';
import { RatingByBookingIdDoc, RatingCreatedDoc } from '../docs/rating.docs';
import { RatingGetSerialization } from '../serialization/rating.get.serialization';
import { Response } from 'src/common/response/decorators/response.decorator';
import { CreateRatingDto } from '../dto/create.rating.dto';
import { IDatabaseCreateOptions } from 'src/common/database/interfaces/database.interface';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { VehicleRepository } from 'src/modules/vehicle/repository/repositories/vehicle.repository';
import { DriverRepository } from 'src/modules/driver/repository/repositories/driver.repository';
import { RatingDoc } from '../repository/entities/rating.entity';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@ApiTags('modules.Rating')
@Controller({
  version: '1',
  path: '/Rating'
})

export class RatingController {
  constructor(private readonly ratingService: RatingService,
    private readonly logger: DebuggerService,
    private readonly vehicleRepository:VehicleRepository,
    private readonly driverRepository:DriverRepository,
    // private readonly paginationService: PaginationService,
    // private readonly firebaseService: FirebaseService,
  ) { }

  @RatingCreatedDoc()
  @Response('rating.create', {
    serialization: RatingGetSerialization,
  })
  // @AuthJwtAdminAccessProtected()
  @Post("/create/Rating")
  async create(@Body() createRatingDto: CreateRatingDto,
    @Query() options: IDatabaseCreateOptions,) {
    try {
      this.logger.info2("RatingController.Create() started");
      const rating = await this.ratingService.createRating(createRatingDto, options);
   const vehicleDriverId = rating.vehicleDriverId
      const averageRating = await this.ratingService.getAverageRating(vehicleDriverId);
       let vehicle = await this.vehicleRepository.findOne({_id:vehicleDriverId});
       if(vehicle !==null){
          vehicle.rating = averageRating;
          console.log(vehicle.rating+" : vehicles rating. -------------------")
          vehicle.save();
       }else{
        let driver = await this.driverRepository.findOne({_id:vehicleDriverId});
        driver.rating = averageRating;
        console.log(driver.rating+" : driver rating. -------------------")
        driver.save();
       }


      this.logger.info2("RatingController.Create() ended");
      return { data: rating };
    } catch (error) {
      throw new BadRequestException('rating creation failed' + error);
    }
  }

  @Get('average/:vehicleId')
  async getAverageRating(@Param('vehicleId') vehicleId: string): Promise<any> {
    this.logger.info2("RatingController.getAverageRating() started");
    const averageRating = await this.ratingService.getAverageRating(vehicleId);
    console.log(averageRating+" : ----- average") 
    this.logger.info2("RatingController.getAverageRating() started");
    return { averageRating };
  }

  @RatingByBookingIdDoc()
  @Response('rating.get', { serialization: RatingGetSerialization })
  // @AuthJwtAccessRoleProtected([ENUM_AUTH_ACCESS_FOR.ADMIN, ENUM_AUTH_ACCESS_FOR.USER, ENUM_AUTH_ACCESS_FOR.VEHICLE_OWNER, ENUM_AUTH_ACCESS_FOR.DRIVER])
  @Get('bookingId/:id')
  async findOne(@Param('id') id: string, @Query() options: IDatabaseCreateOptions) {
    this.logger.info2("RatingController.getAverageRating() started");
    const rating = await this.ratingService.getRatingByBookingId(id);

    if (!rating) {
      throw new NotFoundException('rating not found bookingId: ' + id);
    }
    this.logger.info2("RatingController.getAverageRating() started");
    return { data: rating.toObject() };
  }

}
