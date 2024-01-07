import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PublicAccess } from '../auth/decorators/public.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ChangeMoneyRequestDto } from './dto/request/change-money.dto.request';
import { ExchangeRateService } from './exchange-rate.service';
import { UpdateExchangeRateRequestDto } from './dto/request/update-exchange-rate.dto.request';
import { useToken } from '../utils/use.token';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Funcionalidad de cambio de divisas')
@Controller('exchange-rates')
@UseGuards(AuthGuard)
export class ExchangeRateController {

    constructor(private readonly exchangeRatesService: ExchangeRateService) { }

    @ApiOperation({ summary: 'Execute currency exchange' })
    @ApiResponse({ status: 200, description: 'Change money ok' })
    @Post('change')
    @PublicAccess()
    async changeMoney(@Body() changeMoneyDto: ChangeMoneyRequestDto, @Req() req) {
        //se podria llevar a otro lado usando un interceptor talvez
        const token = req.headers?.simple_token;
        const userId = useToken(token).sub;
        return await this.exchangeRatesService.changeMoneyUseCase(changeMoneyDto, Number(userId));
    }

    @ApiOperation({ summary: 'Execute update exchange rate' })
    @ApiHeader({
        name: 'simple_token'
    })
    @ApiResponse({ status: 200, description: 'Update exchange rate' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Put('update')
    async updateExchangeRate(@Body() updateExchangeRateRequestDto: UpdateExchangeRateRequestDto) {
        return await this.exchangeRatesService.updateExchangeRate(updateExchangeRateRequestDto);
    }


    @Get('change')
    @PublicAccess()
    async helloWord() {
        return "Hola mundo!!!";
    }
}
