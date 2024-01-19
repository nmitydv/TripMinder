import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { RatingRepository } from '../repository/repositories/rating.repository';
import { CreateRatingDto } from '../dto/create.rating.dto';
import { IDatabaseCreateOptions } from 'src/common/database/interfaces/database.interface';
import { RatingDoc, RatingEntity } from '../repository/entities/rating.entity';
// import { CreateDriverDto } from '../dto/create.driver.dto';
// import { UpdateDriverDto } from '../dto/update-driver.dto';
// import { IDatabaseCreateOptions, IDatabaseFindAllOptions, IDatabaseFindOneOptions, IDatabaseOptions } from 'src/common/database/interfaces/database.interface';
// import { DriverDoc, DriverEntity } from '../repository/entities/driver.entity';
// import { DriverRepository } from '../repository/repositories/rating.repository';
// import { IdriverService } from '../interfaces/driver.service.interface';
// import { AwsUploadService } from 'src/common/aws/services/aws.s3.serviceUpload';
// import { DebuggerService } from 'src/common/debugger/services/debugger.service';

@Injectable()
export class RatingService {

  constructor(
    private readonly ratingRepository: RatingRepository,

  ) { }

  
  async createRating(
    createRatingDto: CreateRatingDto,
      options?: IDatabaseCreateOptions
    ) {
     
      let rating: any;

  if (createRatingDto.ratingId) {
    // If ratingId is provided, update the existing rating
    console.log(createRatingDto.ratingId+" : enter ratingId block")
    rating = await this.ratingRepository.findOne({ _id : createRatingDto.ratingId});

    if (!rating) {
      console.log(JSON.stringify(rating)+" : enter rating not found block");
      throw new NotFoundException(`Rating with ID ${createRatingDto.ratingId} not found`);
    }

    // Update the rating if Id is hai
    rating.userId = createRatingDto.userId;
    rating.vehicleDriverId = createRatingDto.vehicleDriverId;
    rating.bookingId = createRatingDto.bookingId;
    rating.rating = createRatingDto.rating;
    rating.comment = createRatingDto.comment;
    console.log(JSON.stringify(rating)+" : enter save  block")
    await rating.save();
    console.log(rating+" : exit from save  block")
  } else {
    // If ratingId is nahi hai then , create a new rating
    console.log(" : enter new rating   block")
     let newRating : RatingEntity = new RatingEntity();
     newRating.userId =  createRatingDto.userId,
     newRating.vehicleDriverId = createRatingDto.vehicleDriverId,
     newRating.bookingId = createRatingDto.bookingId,
     newRating.rating = createRatingDto.rating,
     newRating.comment = createRatingDto.comment,
     console.log(JSON.stringify(newRating)+" : enter new rating  block")

   const createdRating =  this.ratingRepository.create<RatingEntity>(newRating, options);
    console.log(createdRating+" : exit new rating  block")
      rating = createdRating;
      console.log(JSON.stringify(createdRating)+" : exit  with rating  block")
  }
  console.log(JSON.stringify(rating)+" : return  with rating  block")
      return rating;
  }

  async getAverageRating(vehicleDriverId: string): Promise<number> {
    const ratings = await this.ratingRepository.findAll({ vehicleDriverId:vehicleDriverId });
    const totalRatings = ratings.length;

    if (totalRatings === 0) {
      return 0; // No ratings yet
    }
    const sumRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = sumRatings / totalRatings;

    // Round the average rating to one decimal place
    return Math.round(averageRating * 10) / 10;
  }

  async getRatingByBookingId(bookingId: string): Promise<RatingDoc> {
  const rating = await this.ratingRepository.findOne<RatingDoc>({bookingId : bookingId});
    return rating;
  }

}
