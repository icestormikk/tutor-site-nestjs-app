import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../auth.service';
import { UsersService } from '../users/users.service';

/**
 * The logic of protecting server paths using jwt tokens
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.cookies.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /**
   * Verifying the correctness of the user's data presented in the token
   * @param {TokenPayload} payload information about the user, with which it can be uniquely identified
   * @return {*} user data (if the input data is correct)
   * @memberof JwtStrategy
   */
  async validate(payload: TokenPayload) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = await this.usersService.findUser({
        id: payload.id,
      });

      return rest;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }
}
