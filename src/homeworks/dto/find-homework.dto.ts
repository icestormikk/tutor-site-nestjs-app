import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * An object for searching for a homework with parameters corresponding to the passed ones
 * @export
 * @class FindHomeworkDto
 */
export class FindHomeworkDto {
  /**
   * the title of the homework
   * @type {string}
   * @memberof FindHomeworkDto
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  /**
   * the content of the work (what needs to be done)
   * @type {string}
   * @memberof FindHomeworkDto
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * the unique identifier of the user who made up the homework
   * @type {string}
   * @memberof FindHomeworkDto
   */
  @IsOptional()
  @IsString()
  teacherId?: string;

  /**
   * file extensions that can be sent as a response to homework
   * @type {string[]}
   * @memberof FindHomeworkDto
   */
  @IsOptional()
  @IsString({ each: true })
  supportedFileTypes?: string[];
}
