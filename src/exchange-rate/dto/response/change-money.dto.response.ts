import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChangeMoneyResponseDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amountOrigin: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amountChanged: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currencyOrigin: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currencyDestination: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    exchangeRate: number;

}