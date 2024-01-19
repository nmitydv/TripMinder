import { Module } from '@nestjs/common'
import { FirebaseService } from './services/firebase.service'
import { UserModule } from 'src/modules/user/user.module'
import { UserRepository } from 'src/modules/user/repository/repositories/user.repository'

@Module({
  imports: [UserModule],
  providers: [FirebaseService,],
  exports: [FirebaseService], 
})
export class FirebaseModule {}