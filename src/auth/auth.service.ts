import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, hashedPassword: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(hashedPassword, user.HashedPassword);

    if (isMatch) {
      const { HashedPassword, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Wrong password');
  }

  async login(user: any) {
    const payload = {};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: any) {
    const saltOrRounds = 10;
    console.log(data);

    const { Email, HashedPassword, Username } = data;

    const hashedPassword1 = await bcrypt.hash(HashedPassword, saltOrRounds);

    // const salt = await bcrypt.genSalt();

    const newUser = await this.prisma.users.create({
      data: { Email, HashedPassword: hashedPassword1, Username },
    });

    const payload = { userId: newUser.ID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
