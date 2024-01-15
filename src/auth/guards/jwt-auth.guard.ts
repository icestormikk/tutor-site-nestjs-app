import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';

/**
 * A decorator for protecting a path or a group of paths using jwt token authorization
 * @export
 * @class JwtAuthGuard
 * @extends {AuthGuard('jwt')}
 */
export default class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector = new Reflector()) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
