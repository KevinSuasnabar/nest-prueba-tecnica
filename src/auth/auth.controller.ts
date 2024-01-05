import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/request/auth.dto.request';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticacion')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @ApiOperation({
        summary: 'Login user with username o email'
    })
    @Post('login')
    async login(@Body() { password, username }: AuthDto) {
        const userValidated = await this.authService.validateUser(username, password);

        if (!userValidated) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const jwt = await this.authService.generateJWT(userValidated);
        return jwt;
    }

}
