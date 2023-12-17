import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, hashedPassword: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.HashedPassword === hashedPassword) {
      const { HashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
