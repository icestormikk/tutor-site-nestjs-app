import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

/**
 * An object for searching for a response with parameters corresponding to the passed ones
 * @export
 * @class FindResponseDto
 */
export class FindResponseDto {
  /**
   * the unique identifier of the teacher who provided the response to the task
   * @type {string}
   * @memberof FindResponseDto
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  teacherId?: string;

  /**
   * the unique identifier of the solution that has been answered
   * @type {string}
   * @memberof FindResponseDto
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  solutionId?: string;

  /**
   * the content of the response to the solution
   * @type {string}
   * @memberof FindResponseDto
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  text?: string;

  /**
   * evaluation of the solution
   * @type {number}
   * @memberof FindResponseDto
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  score?: number;
}
