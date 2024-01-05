import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/users.service';
import { UserModule } from 'src/users/users.module';

@Global()
@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})
export class AuthModule { }
