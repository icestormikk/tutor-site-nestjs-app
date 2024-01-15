import { IsNotEmpty, IsString } from 'class-validator';

/**
 * An object for searching for a file with parameters corresponding to the passed ones
 * @export
 * @class FindFileDto
 */
export class FindFileDto {
  /**
   * the unique identifier of the user who owns the file
   * @type {string}
   * @memberof FindFileDto
   */
  @IsString()
  @IsNotEmpty()
  userId: string;
}
