import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/common/auth/services/auth.service';
import { UserService } from 'src/modules/user/services/user.service';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';

@Injectable()
export class MigrationUserSeed {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Command({
        command: 'seed:user',
        describe: 'seed users',
    })
    async seeds(): Promise<void> {

        const user1: Promise<UserDoc> = this.userService.create(
            {
                name: 'John Doe',
                mobileNumber: '1122433456',
                email: 'john.doe@example.com',
                location: 'indore',
                gender: 'male',
                role: "User",
                age: 25,
                profilePicture: 'john_doe.jpg',
              }
        );

        const user2: Promise<UserDoc> = this.userService.create(
           {
        name: 'Admin Smith',
        mobileNumber: '9876543210',
        email: 'Admin.smith@example.com',
        location: 'khategaon',
        gender: 'male',
        role: "Admin",
        age: 30,
        profilePicture: 'Admin_smith.jpg',
      }
        );

        const user3: Promise<UserDoc> = this.userService.create(
            {
                name: 'robert Tone',
                mobileNumber: '9534543520',
                email: 'robert.Tone@example.com',
                location: 'nemawar',
                gender: 'female',
                role: "VehicleOwner",
                age: 23,
                profilePicture: 'jane_smith.jpg',
              }
        );

          const user4: Promise<UserDoc> = this.userService.create(
            {
        name: 'james Kolen',
        mobileNumber: '2276547650',
        email: 'james.Kolen@example.com',
        location: 'harda',
        gender: 'female',
        role: "Driver",
        age: 28,
        profilePicture: 'jane_smith.jpg',
      }
        );

        try {
            await Promise.all([user1, user2, user3,user4]);
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

}
