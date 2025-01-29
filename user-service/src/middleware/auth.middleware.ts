import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Access denied');
    }

    try {
      const verified = jwt.verify(token, 'secret-key');
      request.user = verified;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}