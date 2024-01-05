import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateExchangeRateRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currencyCodeOrigin: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currencyCodeDestination: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    exchangeRate: number;

}