import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { useToken } from '../utils/use.token';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    @ApiOperation({
        summary: 'Get the list of forex trades of a user'
    })
    @ApiHeader({
        name: 'simple_token'
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 200, description: 'tracking list' })
    @Get('/tracking')
    async findExchangeRateTracking(@Req() req) {
        //se podria llevar a otro lado usando un interceptor talvez
        const token = req.headers?.simple_token;
        const userId = useToken(token).sub;
        return await this.userService.findExchangeRateTrackingUseCase(Number(userId));
    }
}
