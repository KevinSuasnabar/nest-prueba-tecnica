import { Module } from '@nestjs/common';
import { ExchangeRateController } from './exchange-rate.controller';
import { ExchangeRateService } from './exchange-rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import { ExchangeRate } from './entities/exchange-rate.entity';
import { UserService } from '../users/users.service';
import { UserModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Currency, ExchangeRate]), UserModule],
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService, UserService]
})
export class ExchangeRateModule { }
