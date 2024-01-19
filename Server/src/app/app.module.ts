import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { RouterModule } from 'src/router/router.module';
import { CommonModule } from 'src/common/common.module';


@Module({
    controllers: [AppController],
    providers: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(),
    ],
})
export class AppModule {}