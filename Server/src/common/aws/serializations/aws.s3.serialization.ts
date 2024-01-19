import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AwsS3Serialization {
    @ApiProperty({
        example: faker.system.directoryPath(),
    })
    @Type(() => String)
    path: string;

  
}
