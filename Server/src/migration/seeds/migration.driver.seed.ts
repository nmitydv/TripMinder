import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/common/auth/services/auth.service';
import { DriverService } from 'src/modules/driver/services/driver.service';
import { DriverDoc } from 'src/modules/driver/repository/entities/driver.entity';

@Injectable()
export class MigrationDriverSeed {
    constructor(
        private readonly authService: AuthService,
        private readonly driverService: DriverService,
    ) {}

    @Command({
        command: 'seed:driver',
        describe: 'seed drivers',
    })
    async seeds(): Promise<void> {


        const driver1: Promise<DriverDoc> = this.driverService.createDriver(
            {
                experience: '5 years',
                userId: 'user4',
                availability:false,
                drivingLicence: 'DL123456',
                licenseNumber: 'LN123',
                adharNumber: '123456789012',
                vehicleType: [2,4],
                description: 'Experienced driver with good safety record.',
                dayWisePrice: 500,
              }
        );

        const driver2: Promise<DriverDoc> = this.driverService.createDriver(
            {
                experience: '3 years',
                userId: 'user3',
                availability:false,
                drivingLicence: 'DL654321',
                licenseNumber: 'LN456',
                adharNumber: '987654321012',
                vehicleType: [2,4],
                description: 'Safety-conscious driver with clean driving history.',
                dayWisePrice: 700,
              },
        );

        const driver3: Promise<DriverDoc> = this.driverService.createDriver(
            {
                experience: '7 years',
                userId: 'user2',
                availability:false,
                drivingLicence: 'DL789012',
                licenseNumber: 'LN789',
                adharNumber: '345678901234',
                vehicleType: [2,4],
                description: 'Skilled driver with experience in long-haul transportation.',
                dayWisePrice: 800,
              }
        );

          const driver4: Promise<DriverDoc> = this.driverService.createDriver(
            {
                experience: '2 years',
                userId: 'user1',
                availability:false,
                drivingLicence: 'DL345678',
                licenseNumber: 'LN345',
                adharNumber: '567890123456',
                vehicleType: [2,4],
                description: 'Energetic driver with a passion for motorcycles.',
                dayWisePrice: 1000,
              }
        );

        try {
            await Promise.all([driver1, driver2, driver3,driver4]);
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

  
}