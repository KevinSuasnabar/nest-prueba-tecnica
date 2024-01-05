import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "../../interfaces/auth.interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto implements AuthBody {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;
}