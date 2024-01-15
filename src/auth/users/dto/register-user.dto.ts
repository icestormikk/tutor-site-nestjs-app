import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

/**
 * An object with parameters for registering a new user
 * @export
 * @class RegisterUserDto
 */
export class RegisterUserDto {
  /**
   * the email address of the registering user
   * @type {string}
   * @memberof RegisterUserDto
   */
  @IsEmail()
  email: string;

  /**
   * the user's password
   * @type {string}
   * @memberof RegisterUserDto
   */
  password: string;

  /**
   * confirmation of the user's password
   * @type {string}
   * @memberof RegisterUserDto
   */
  @Match('password')
  confirmPassword: string;

  /**
   * birthday of a new user
   * @type {Date}
   * @memberof RegisterUserDto
   */
  @IsDateString()
  birthday: Date;

  /**
   * the real name of the new user
   * @type {string}
   * @memberof RegisterUserDto
   */
  @IsString()
  name: string;

  /**
   * the real last name of the new user
   * @type {string}
   * @memberof RegisterUserDto
   */
  @IsString()
  surname: string;

  /**
   * the real patronymic of the new user (if it exists)
   * @type {string}
   * @memberof RegisterUserDto
   */
  @IsOptional()
  @IsString()
  patronymic?: string;

  /**
   * the ID of the new user's role
   * @type {string}
   * @memberof RegisterUserDto
   */
  @IsString()
  userRoleId: string;
}
