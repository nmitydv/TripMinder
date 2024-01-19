// roles-auth.guard.ts
import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/modules/user/services/user.service';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-auth') {
  constructor(private reflector: Reflector,
    private readonly userService:UserService,
    private readonly logger : DebuggerService,) {
      super();
    }

    canActivate(context: ExecutionContext) {
      const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (isPublic) {
        return true;
      }
 
      return super.canActivate(context);
    }
}