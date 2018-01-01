import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { promisify } from 'util';

import { User } from '../../entity';

const { JWT_SECRET } = process.env as any;

export async function authorizationChecker(req: any, roles: string[] = [], required: boolean = true) {
  const errMissingAuthorization = new UnauthorizedException('Authorization Required');
  const errInvalidBearer = new UnauthorizedException('Invalid Authorization Scheme');
  const errInvalidToken = new UnauthorizedException('Invalid Authorization Token');

  const authorization = req.get('authorization') || '';
  if (required && !authorization) throw errMissingAuthorization;
  const [bearer, token] = authorization.split(' ');

  if (required && bearer.toLowerCase() !== 'bearer') throw errInvalidBearer;
  if (required && !token) throw errInvalidToken;

  const jwtDecoded: any = await promisify(verify)(token, JWT_SECRET).catch(e => {
    if (required) throw new UnauthorizedException(e.message);
  });

  let user;

  if (jwtDecoded && jwtDecoded.id) {
    user = await getRepository(User).findOneById(jwtDecoded.id, { relations: ['profile', 'role'] });
  }

  if (required && !user) throw errInvalidToken;
  (req as any).user = user;

  if (user && roles.length) {
    const isRoleAllowed = !!roles.find(role => user.role.name === role);
    if (!isRoleAllowed) throw new ForbiddenException('Access Denied');
  }

  return true;
}
