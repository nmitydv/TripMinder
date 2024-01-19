import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/common/auth/services/auth.service';

import { BookingDoc } from 'src/modules/booking/repositories/entities/booking.entity';
import { BookingService } from 'src/modules/booking/services/booking.service';


@Injectable()
export class MigrationBookingSeed {
    constructor(
        private readonly authService: AuthService,
        private readonly bookingService: BookingService,
    ) {}

    @Command({
        command: 'seed:booking',
        describe: 'seed bookings',
    })
    async seeds(): Promise<void> {


        const booking1: Promise<BookingDoc> = this.bookingService.createBooking(
            {
            userId: 'user1',
            vehicleDriverId: 'driver1',
            pickupLocation: 'indore',
            dropLocation: 'khategaon',
            startDate: new Date('2023-01-01T08:00:00Z'),
            endDate: new Date('2023-01-02T12:00:00Z'),
          
    }
        );

        const booking2: Promise<BookingDoc> = this.bookingService.createBooking(
            {
                userId: 'user2',
                vehicleDriverId: 'driver2',
                pickupLocation: 'indore',
                dropLocation: 'bhopal',
                startDate: new Date('2023-01-05T10:00:00Z'),
                endDate: new Date('2023-01-06T15:00:00Z'),
               
              },
        );

        const booking3: Promise<BookingDoc> = this.bookingService.createBooking(
            {
                userId: 'user3',
                vehicleDriverId: 'vehicle2',
                pickupLocation: 'indore',
                dropLocation: 'dewas',
                startDate: new Date('2023-01-10T14:00:00Z'),
                endDate: new Date('2023-01-12T18:00:00Z'),

              }
        );

          const booking4: Promise<BookingDoc> = this.bookingService.createBooking(
            {
                userId: 'user4',
                vehicleDriverId: 'vehicle1',
                pickupLocation: 'khategaon',
                dropLocation: 'harda',
                startDate: new Date('2023-01-15T16:00:00Z'),
                endDate: new Date('2023-01-16T20:00:00Z'),

              }
        );

        try {
            await Promise.all([booking1, booking2, booking3,booking4]);
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

  
}