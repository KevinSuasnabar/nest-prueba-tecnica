import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserTrackingExchangeRateRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    originAmount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    destinationAmount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    originCurrencyCode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    destinationCurrencyCode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    exchangeRateValue: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    userId:number;
}