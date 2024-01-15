import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

/**
 * The logic of protecting the server paths by checking the login and password
 * @export
 * @class LocalStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   * Checking the correctness of the transmitted username (email) and password of the user
   * @param {string} email user's email address
   * @param {string} password the user's password
   * @return {Promise<any>} user data (if the input data is correct)
   * @memberof LocalStrategy
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
