import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ) { }

    public async validateUser(username: string, password: string) {
        const userByUsername = await this.userService.findBy({ key: 'username', value: username });
        const userByEmail = await this.userService.findBy({ key: 'email', value: username });

        if (userByUsername) {

            const match = await bcrypt.compare(password, userByUsername.password);
            if (match) return userByUsername;
        }

        if (userByEmail) {

            const match = await bcrypt.compare(password, userByEmail.password);
            if (match) return userByEmail;
        }

        return null;
    }

    public signJWT({ payload, secret, expires }: { payload: string, secret: string, expires: number | string }) {
        return jwt.sign(payload, secret, { expiresIn: expires })
    }

    public async generateJWT(user: User): Promise<any> {
        const userFind = await this.userService.findUserById(user.id);
        const payload: any = {
            role: userFind.role,
            sub: userFind.id
        }

        return {
            accessToken: this.signJWT({
                payload,
                secret: process.env.JWT_SECRET,
                expires: '1h',
            }),
            user,
        }
    }


}
