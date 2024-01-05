import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChangeMoneyRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currencyCodeOrigin: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currencyCodeDestination: string;

}