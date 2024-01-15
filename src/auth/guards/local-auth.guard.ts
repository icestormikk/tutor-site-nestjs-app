import { AuthGuard } from '@nestjs/passport';

/**
 * A decorator for protecting a path or a group of paths using local authorization
 * @export
 * @class LocalAuthGuard
 * @extends {AuthGuard('local')}
 */
export class LocalAuthGuard extends AuthGuard('local') {}
