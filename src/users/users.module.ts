import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';
import { UserTrackingExchangeRates } from './entities/user-tracking-exchange-rates.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserTrackingExchangeRates])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, TypeOrmModule]
})
export class UserModule { }
