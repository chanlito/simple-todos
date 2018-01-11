import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { InjectCustomRepository, InjectEntityManager } from 'nestjs-extensions';
import { EntityManager } from 'typeorm';

import { Profile, Role, User } from '../../entity';
import { UserRepository } from '../../repository';
import { LoginDto, RegisterDto } from './auth.dto';

const { JWT_SECRET = '' } = process.env;

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @InjectEntityManager() private readonly em: EntityManager,
    @InjectCustomRepository(User) private readonly userRepository: UserRepository
  ) {}

  @ApiOperation({ title: 'Register a new user' })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    await this.em.transaction(async em => {
      const userRole = await em.findOne(Role, { where: { name: 'user' } });
      if (!userRole) throw new Error();

      const user = new User();
      user.email = body.email;
      user.password = await genSalt().then(s => hash(body.password, s));
      user.role = userRole;

      const profile = new Profile();
      profile.firstName = body.firstName;
      profile.lastName = body.lastName;
      profile.user = user;

      // persist to db
      await em.save(Profile, profile);
    });
    return { message: 'OK' };
  }

  @ApiOperation({ title: 'Login a user' })
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.userRepository.findByEmail(body.email);
    if (!user) throw new BadRequestException('Email address does not exist.');
    const isCorrectPassword = await compare(body.password, user.password);
    if (!isCorrectPassword) throw new BadRequestException('Password is not correct.');
    const token = await sign(
      {
        id: user.id,
        email: user.email
      },
      JWT_SECRET,
      {
        expiresIn: '1 hour',
        issuer: 'API League Team'
      }
    );
    return { ...user, token };
  }
}
