import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeRate } from './entities/exchange-rate.entity';
import { ChangeMoneyRequestDto } from './dto/request/change-money.dto.request';
import { In, Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { ErrorManager } from '../utils/error.manager';
import { ChangeMoneyResponseDto } from './dto/response/change-money.dto.response';
import { UpdateExchangeRateRequestDto } from './dto/request/update-exchange-rate.dto.request';
import { UpdateExchangeRateResponseDto } from './dto/response/updated-exchange-rate.dto.response';
import { UserService } from '../users/users.service';

@Injectable()
export class ExchangeRateService {

    constructor(
        @InjectRepository(ExchangeRate) private exchangeRateRepository: Repository<ExchangeRate>,
        @InjectRepository(Currency) private currencyRepository: Repository<Currency>,
        private readonly userService: UserService

    ) { }

    public async changeMoneyUseCase(changeMoneyDto: ChangeMoneyRequestDto, userId?: number): Promise<ChangeMoneyResponseDto> {

        if (changeMoneyDto.currencyCodeDestination === changeMoneyDto.currencyCodeOrigin) {
            throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: 'The source and destination currencies must be different.',
            });
        }

        await this.findCurrenciesToChange(changeMoneyDto.currencyCodeOrigin, changeMoneyDto.currencyCodeDestination);
        const exchangeRate = await this.findExchangeRatesToChange(changeMoneyDto.currencyCodeOrigin, changeMoneyDto.currencyCodeDestination);
        const amountChanged = await this.executeChange(exchangeRate, changeMoneyDto);

        if (userId) {
            await this.userService.saveUserTrackingExchangeRateUseCase(
                {
                    originCurrencyCode: amountChanged.currencyOrigin,
                    destinationCurrencyCode: amountChanged.currencyDestination,
                    destinationAmount: amountChanged.amountChanged,
                    originAmount: amountChanged.amountOrigin,
                    exchangeRateValue: amountChanged.exchangeRate,
                    userId: userId

                }
            );
        }

        return amountChanged;

    }

    public async updateExchangeRate(updateExchangeRateRequestDto: UpdateExchangeRateRequestDto): Promise<UpdateExchangeRateResponseDto> {
        const exchangeRate = await this.findExchangeRatesToChange(updateExchangeRateRequestDto.currencyCodeOrigin, updateExchangeRateRequestDto.currencyCodeDestination);


        const exchangeRateUpdated = await this.exchangeRateRepository.save({
            id: exchangeRate.id,
            exchangeRateValue: updateExchangeRateRequestDto.exchangeRate,
            updatedAt: new Date()
        })

        return {
            newExchangeRate: exchangeRateUpdated.exchangeRateValue,
            currencyOrigin: updateExchangeRateRequestDto.currencyCodeOrigin,
            currencyDestination: updateExchangeRateRequestDto.currencyCodeDestination,
        }

    }

    private executeChange(exchangeRates: ExchangeRate, changeMoneyDto: ChangeMoneyRequestDto): ChangeMoneyResponseDto {
        const exchangeRateValue = exchangeRates.exchangeRateValue;
        const changedAmount = exchangeRateValue * changeMoneyDto.amount;

        return {
            amountOrigin: changeMoneyDto.amount,
            amountChanged: parseFloat(changedAmount.toFixed(5)),
            currencyOrigin: changeMoneyDto.currencyCodeOrigin,
            currencyDestination: changeMoneyDto.currencyCodeDestination,
            exchangeRate: exchangeRates.exchangeRateValue
        }
    }

    private async findCurrenciesToChange(currencyCodeOrigin: string, currencyCodeDestination: string): Promise<Currency[]> {
        const currencies = await this.currencyRepository.find({
            where: { code: In([currencyCodeOrigin, currencyCodeDestination]) }
        });

        if (!currencies || currencies.length < 2) {
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: 'Currency not found',
            });
        }

        return currencies;

    }

    private async findExchangeRatesToChange(currencyCodeOrigin: string, currencyCodeDestination: string): Promise<ExchangeRate> {
        const exchangeRate = await this.exchangeRateRepository.findOne({
            where: {
                keyCode: `${currencyCodeOrigin}-${currencyCodeDestination}`,
            }
        })

        if (!exchangeRate) {
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: 'ExchangeCurrency not found',
            });
        }

        return exchangeRate;
    }
}
