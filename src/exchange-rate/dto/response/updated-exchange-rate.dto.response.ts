import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateExchangeRateResponseDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    newExchangeRate: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currencyOrigin: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currencyDestination: string;
}