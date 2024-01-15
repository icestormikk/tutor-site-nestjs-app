import { IsNotEmpty, IsString } from 'class-validator';

/**
 * The object for creating an object of the Role class
 * @export
 * @class CreateRoleDto
 */
export class CreateRoleDto {
  /**
   * name of the new role
   * @type {string}
   * @memberof CreateRoleDto
   */
  @IsString()
  @IsNotEmpty()
  title: string;
}
