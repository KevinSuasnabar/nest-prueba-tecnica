import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRequestDto } from './dto/request/user.dto.request';
import { ErrorManager } from '../utils/error.manager';
import { UserTrackingExchangeRates } from './entities/user-tracking-exchange-rates.entity';
import { UserTrackingExchangeRateRequestDto } from './dto/request/user-tracking-exchange-rate.dto.request';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(UserTrackingExchangeRates) private readonly userTrackingExchangeRatesRepository: Repository<UserTrackingExchangeRates>,
    ) { }

    public async findBy({ key, value }: {
        key: keyof UserRequestDto,
        value: any
    }) {
        try {
            const user: User = await this.userRepository.createQueryBuilder('user')
                .addSelect('user.password')
                .where({ [key]: value })
                .getOne();

            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async findUserById(id: number): Promise<User> {
        try {
            const user: User = await this.userRepository
                .createQueryBuilder('user')
                .where({ id })
                .getOne();
            if (!user) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'User not found',
                });
            }
            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async saveUserTrackingExchangeRateUseCase(userTrackingExchangeRateRequestDto: UserTrackingExchangeRateRequestDto) {
        this.userTrackingExchangeRatesRepository.save({ ...userTrackingExchangeRateRequestDto })
    }

    public async findExchangeRateTrackingUseCase(userId: number) {
        const tracking = await this.userTrackingExchangeRatesRepository.find({
            where: {
                userId
            }
        })

        return tracking;
    }

}
