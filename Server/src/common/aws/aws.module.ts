import { Module } from '@nestjs/common';
import { AwsS3Service } from './services/aws.s3.service';
import { AwsUploadService } from './services/aws.s3.serviceUpload';

@Module({
    exports: [AwsS3Service,AwsUploadService],
    providers: [AwsS3Service,AwsUploadService],
    imports: [],
    controllers: [],
})
export class AwsModule {}
