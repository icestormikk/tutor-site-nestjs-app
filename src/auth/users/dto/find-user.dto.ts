import { IsEmail, IsDateString, IsString, IsOptional } from 'class-validator';

/**
 * An object for searching for a user with parameters corresponding to the passed ones
 * @export
 * @class FindUserDto
 */
export class FindUserDto {
  /**
   * unique user ID
   * @type {string}
   * @memberof FindUserDto
   */
  @IsOptional()
  @IsString()
  id?: string;

  /**
   * user's email address
   * @type {string}
   * @memberof FindUserDto
   */
  @IsOptional()
  @IsEmail()
  email?: string;

  /**
   * the user's birthday
   * @type {Date}
   * @memberof FindUserDto
   */
  @IsOptional()
  @IsDateString()
  birthday?: Date;

  /**
   * the user's real name
   * @type {string}
   * @memberof FindUserDto
   */
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * the user's real last name
   * @type {string}
   * @memberof FindUserDto
   */
  @IsOptional()
  @IsString()
  surname?: string;

  /**
   * the user's real patronymic (if it exists)
   * @type {string}
   * @memberof FindUserDto
   */
  @IsOptional()
  @IsString()
  patronymic?: string;

  /**
   * the unique identifier of the user's role
   * @type {string}
   * @memberof FindUserDto
   */
  @IsOptional()
  @IsString()
  userRoleId?: string;
}
