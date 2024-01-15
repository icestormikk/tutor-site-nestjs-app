import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

/**
 * An object with parameters for creating a new homework object
 * @export
 * @class CreateHomeworkDto
 */
export class CreateHomeworkDto {
  /**
   * the title of the new homework
   * @type {string}
   * @memberof CreateHomeworkDto
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * the content of the work (what needs to be done)
   * @type {string}
   * @memberof CreateHomeworkDto
   */
  @IsString()
  description: string;

  /**
   * the unique identifier of the user who made up the homework
   * @type {string}
   * @memberof CreateHomeworkDto
   */
  @IsString()
  teacher: string;

  /**
   * deadline for completing homework
   * @type {Date}
   * @memberof CreateHomeworkDto
   */
  @IsDateString()
  deadline: Date;

  /**
   * file extensions that can be sent as a response to homework
   * @type {string[]}
   * @memberof CreateHomeworkDto
   */
  @IsOptional()
  @IsString({ each: true })
  supportedFileTypes?: string[];

  /**
   * the maximum number of files that can be sent as a response to homework
   * @type {number}
   * @memberof CreateHomeworkDto
   */
  @IsOptional()
  @Transform(() => Number)
  @IsNumber()
  @Min(0)
  maxFilesCount?: number;
}
