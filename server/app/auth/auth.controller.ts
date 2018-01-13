import { BadRequestException, Body, Controller, Post, Req } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { compare, genSalt, hash } from 'bcryptjs';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { InjectCustomRepository, InjectEntityManager } from 'nestjs-extensions';
import { EntityManager } from 'typeorm';

import { Profile, Role, User } from '../../entity';
import { UserRepository } from '../../repository';
import { SignInDto, SignUpDto } from './auth.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @InjectEntityManager() private readonly em: EntityManager,
    @InjectCustomRepository(User) private readonly userRepository: UserRepository
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    await this.em.transaction(async em => {
      const userRole = await em.findOne(Role, { where: { name: 'user' } });
      if (!userRole) throw new Error('Role "user" is missing.');

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

  @Post('sign-in')
  async signIn(@Body() body: SignInDto, @Req() req: Request) {
    const user = await this.userRepository.findByEmail(body.email);
    if (!user) throw new BadRequestException('Email address does not exist.');
    const isCorrectPassword = await compare(body.password, user.password);
    if (!isCorrectPassword) throw new BadRequestException('Password is not correct.');
    const accessToken = await sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.SECRET,
      {
        expiresIn: '24 hours',
        issuer: 'API League Team'
      }
    );
    const response = (req.session.authUser = {
      ...user,
      accessToken
    });
    delete response.password;
    delete response.profile.createdDate;
    delete response.profile.updatedDate;
    delete response.role.createdDate;
    delete response.role.updatedDate;
    return response;
  }

  @Post('sign-out')
  async signOut(@Req() req: Request) {
    req.session.authUser = null;
    return { message: 'OK' };
  }
}
