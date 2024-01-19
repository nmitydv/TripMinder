import { Module } from '@nestjs/common';
import { BookingController } from './controller/booking.controller';
import { BookingService } from './services/booking.service';
import { BookingRepositoryModule } from './repositories/booking.repository.module';

@Module({
  imports:[BookingRepositoryModule],
  controllers: [],
  providers: [BookingService],
  exports:[BookingService]

})
export class BookingModule {}
