import { IsEmail } from 'class-validator';

/**
 * An object with parameters for user authentication
 * @export
 * @class LoginUserDto
 */
export class LoginUserDto {
  /**
   * the email address of the authenticating user
   * @type {string}
   * @memberof LoginUserDto
   */
  @IsEmail()
  email: string;

  /**
   * the user's password
   * @type {string}
   * @memberof LoginUserDto
   */
  password: string;
}
