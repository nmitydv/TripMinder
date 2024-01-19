import { Module } from '@nestjs/common';

import { RatingRepositoryModule } from './repository/rating.repository.module';
import { RatingService } from './services/rating.service';

@Module({
  imports:[RatingRepositoryModule],
  controllers: [],
  providers: [RatingService,RatingRepositoryModule,],
  exports:[RatingService,RatingRepositoryModule,]
})
export class RatingModule {}
