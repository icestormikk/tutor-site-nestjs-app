import { IsNotEmpty, IsString } from 'class-validator';

/**
 * An object for searching for a role with parameters corresponding to the passed ones
 * @export
 * @class FindRoleDto
 */
export class FindRoleDto {
  /**
   * the name of the role you are looking for
   * @type {string}
   * @memberof FindRoleDto
   */
  @IsString()
  @IsNotEmpty()
  title: string;
}
