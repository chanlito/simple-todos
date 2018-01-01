import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Guard()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authorizationChecker: AuthorizationCheckerFn,
    private readonly reflector: Reflector = new Reflector()
  ) {}

  async canActivate(req: Request, context: ExecutionContext) {
    const roles = this.reflector.get<any[]>('auth/ROLES_META_KEY', context.handler);
    if (roles && roles.length) return this.authorizationChecker(req, roles);
    return true;
  }
}

export type AuthorizationCheckerFn = (req: Request, roles: string[], required?: boolean) => Promise<boolean>;
